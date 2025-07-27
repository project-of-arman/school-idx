
'use server';

import pool from '../db';
import { revalidatePath } from 'next/cache';
import { RowDataPacket } from 'mysql2';

/*
SQL for creating the results and subject_grades tables:

CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `exam_name` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `final_gpa` decimal(4,2) NOT NULL,
  `status` enum('Promoted','Failed') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_exam_year` (`student_id`,`exam_name`,`year`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
);

CREATE TABLE `subject_grades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `result_id` int NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `marks` int DEFAULT NULL,
  `grade` varchar(10) NOT NULL,
  `gpa` decimal(3,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `result_id` (`result_id`),
  CONSTRAINT `subject_grades_ibfk_1` FOREIGN KEY (`result_id`) REFERENCES `results` (`id`) ON DELETE CASCADE
);

*/


// ========= TYPES =========

export interface ResultForAdmin extends RowDataPacket {
    id: number;
    student_name: string;
    roll: string;
    class_name: string;
    exam_name: string;
    year: number;
    final_gpa: number;
}

export interface StudentForResultForm extends RowDataPacket {
    id: number;
    name_bn: string;
    roll: string;
}

export interface SubjectGrade extends RowDataPacket {
    id?: number;
    subject_name: string;
    marks: number | null;
    grade: string;
    gpa: number;
}

export interface ResultWithSubjects {
    id: number;
    student_id: number;
    exam_name: string;
    year: number;
    final_gpa: number;
    status: string;
    subjects: SubjectGrade[];
}

// ========= DATA FETCHING =========

export async function getAllResultsForAdmin(): Promise<ResultForAdmin[]> {
    if (!pool) return [];
    try {
        const [rows] = await pool.query<ResultForAdmin[]>(`
            SELECT r.id, s.name_bn as student_name, s.roll, s.class_name, r.exam_name, r.year, r.final_gpa
            FROM results r
            JOIN students s ON r.student_id = s.id
            ORDER BY r.year DESC, s.class_name, s.roll ASC
        `);
        return rows;
    } catch (e: any) {
        console.error('Failed to fetch results for admin:', e.message);
        return [];
    }
}

export async function getResultByIdForAdmin(id: string | number): Promise<ResultWithSubjects | null> {
    if (!pool) return null;
    try {
        const [resultRows] = await pool.query<any[]>('SELECT * FROM results WHERE id = ?', [id]);
        if (resultRows.length === 0) return null;
        
        const resultData = resultRows[0];
        
        const [subjectRows] = await pool.query<SubjectGrade[]>('SELECT id, subject_name, marks, grade, gpa FROM subject_grades WHERE result_id = ? ORDER BY id ASC', [id]);

        return {
            ...resultData,
            subjects: subjectRows
        };
    } catch (e: any) {
        console.error('Failed to fetch result by ID for admin:', e.message);
        return null;
    }
}

export async function getStudentsForResults(): Promise<StudentForResultForm[]> {
     if (!pool) return [];
    try {
        const [rows] = await pool.query<StudentForResultForm[]>('SELECT id, name_bn, roll FROM students ORDER BY name_bn ASC');
        return rows;
    } catch (e: any) {
        console.error('Failed to fetch students for results form:', e.message);
        return [];
    }
}


// ========= DATA MUTATION =========

type SaveResultType = { success: boolean; error?: string };

export async function saveResult(data: Omit<ResultWithSubjects, 'id' | 'subjects'> & {subjects: Omit<SubjectGrade, 'result_id'>[]}, id?: number): Promise<SaveResultType> {
    if (!pool) return { success: false, error: "Database not connected" };
    
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const resultData = {
            student_id: data.student_id,
            exam_name: data.exam_name,
            year: data.year,
            final_gpa: data.final_gpa,
            status: data.status,
        };

        let resultId = id;
        
        if (id) {
            // Update existing result
            await connection.query('UPDATE results SET ? WHERE id = ?', [resultData, id]);
            // Delete old subjects to re-insert them, simplifying logic
            await connection.query('DELETE FROM subject_grades WHERE result_id = ?', [id]);
        } else {
            // Insert new result
            const [insertResult] = await connection.query<any>('INSERT INTO results SET ?', [resultData]);
            resultId = insertResult.insertId;
        }

        if (!resultId) {
            throw new Error("Failed to get result ID.");
        }
        
        // Batch insert new subjects
        if (data.subjects && data.subjects.length > 0) {
            const subjectValues = data.subjects.map(subject => [
                resultId,
                subject.subject_name,
                subject.marks,
                subject.grade,
                subject.gpa
            ]);
            await connection.query('INSERT INTO subject_grades (result_id, subject_name, marks, grade, gpa) VALUES ?', [subjectValues]);
        }
        
        await connection.commit();
        
        revalidatePath('/admin/results');
        revalidatePath('/(site)/results');

        return { success: true };
    } catch (e: any) {
        await connection.rollback();
        console.error("Failed to save result:", e.message);
        if (e.code === 'ER_DUP_ENTRY') {
            return { success: false, error: "এই শিক্ষার্থীর জন্য এই পরীক্ষা এবং বছরের ফলাফল ইতিমধ্যে তৈরি করা আছে।" };
        }
        return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
    } finally {
        connection.release();
    }
}


export async function deleteResult(id: number): Promise<SaveResultType> {
    if (!pool) return { success: false, error: "Database not connected" };
    
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // Deleting from results will cascade and delete subject_grades due to FOREIGN KEY constraint
        await connection.query('DELETE FROM results WHERE id = ?', [id]);
        await connection.commit();
        
        revalidatePath('/admin/results');
        revalidatePath('/(site)/results');

        return { success: true };
    } catch (e: any) {
        await connection.rollback();
        console.error("Failed to delete result:", e.message);
        return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
    } finally {
        connection.release();
    }
}
