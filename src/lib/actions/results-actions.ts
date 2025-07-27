
'use server';

import pool from '../db';
import { revalidatePath } from 'next/cache';

// ========= TYPES =========

export interface ResultForAdmin {
    id: number;
    student_name: string;
    roll: string;
    class_name: string;
    exam_name: string;
    year: number;
    final_gpa: number;
}

export interface StudentForResultForm {
    id: number;
    name_bn: string;
    roll: string;
}

export interface SubjectGrade {
    id?: number;
    subject_name: string;
    grade: string;
    gpa: number;
}

export interface ResultWithSubjects {
    id: number;
    student_id: number;
    exam_name: string;
    year: number;
    final_gpa: number;
    status: 'Promoted' | 'Failed';
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
        
        const [subjectRows] = await pool.query<SubjectGrade[]>('SELECT id, subject_name, grade, gpa FROM subject_grades WHERE result_id = ? ORDER BY id ASC', [id]);

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

export async function saveResult(data: Omit<ResultWithSubjects, 'id'>, id?: number): Promise<SaveResultType> {
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
        } else {
            // Insert new result
            const [insertResult] = await connection.query<any>('INSERT INTO results SET ?', [resultData]);
            resultId = insertResult.insertId;
        }

        if (!resultId) {
            throw new Error("Failed to get result ID.");
        }

        // Handle subjects
        const existingSubjectIds = (await connection.query<any[]>('SELECT id FROM subject_grades WHERE result_id = ?', [resultId]))[0].map(s => s.id);
        const newSubjectIds = data.subjects.map(s => s.id).filter(id => id !== undefined);

        // Delete subjects that were removed
        const subjectsToDelete = existingSubjectIds.filter(id => !newSubjectIds.includes(id));
        if(subjectsToDelete.length > 0) {
            await connection.query('DELETE FROM subject_grades WHERE id IN (?)', [subjectsToDelete]);
        }
        
        // Update or Insert subjects
        for (const subject of data.subjects) {
            const subjectData = {
                result_id: resultId,
                subject_name: subject.subject_name,
                grade: subject.grade,
                gpa: subject.gpa
            };
            if (subject.id) {
                // Update
                await connection.query('UPDATE subject_grades SET ? WHERE id = ?', [subjectData, subject.id]);
            } else {
                // Insert
                await connection.query('INSERT INTO subject_grades SET ?', [subjectData]);
            }
        }

        await connection.commit();
        
        revalidatePath('/admin/results');
        revalidatePath('/(site)/results');

        return { success: true };
    } catch (e: any) {
        await connection.rollback();
        console.error("Failed to save result:", e.message);
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
        await connection.query('DELETE FROM subject_grades WHERE result_id = ?', [id]);
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
