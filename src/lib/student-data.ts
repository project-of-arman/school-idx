
'use server';

import pool from './db';
import { revalidatePath } from 'next/cache';

/*
SQL for creating the students table:

CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roll` varchar(50) NOT NULL UNIQUE,
  `name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `year` int NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `father_name` varchar(255) NOT NULL,
  `father_mobile` varchar(50) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `present_address` text NOT NULL,
  `permanent_address` text NOT NULL,
  `image` longtext,
  `data_ai_hint` varchar(255) DEFAULT 'student portrait',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

*/

export interface Student {
    id: number;
    roll: string;
    name: string;
    class_name: string;
    gender: string;
    year: number;
    image: string | null;
    data_ai_hint: string | null;
}

export interface StudentForAdmin extends Student {
    dob: string;
    religion: string;
    blood_group: string | null;
    father_name: string;
    father_mobile: string;
    mother_name: string;
    present_address: string;
    permanent_address: string;
}

const mockStudents: Student[] = [
  { id: 1, roll: '101', name: "আরিফ হোসেন", class_name: "১০ম", gender: "ছেলে", year: 2024, image: "https://placehold.co/300x400.png", data_ai_hint: "male student portrait" },
  { id: 2, roll: '102', name: "সুমি আক্তার", class_name: "১০ম", gender: "মেয়ে", year: 2024, image: "https://placehold.co/300x400.png", data_ai_hint: "female student portrait" },
  { id: 3, roll: '201', name: "জাহিদ হাসান", class_name: "৯ম", gender: "ছেলে", year: 2024, image: "https://placehold.co/300x400.png", data_ai_hint: "male student portrait" },
];

export async function getStudents(): Promise<Student[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for students.");
        return mockStudents;
    }
    try {
        const [rows] = await pool.query('SELECT id, roll, name, class_name, gender, year, image, data_ai_hint FROM students ORDER BY year DESC, class_name, roll ASC');
        return rows as Student[];
    } catch (error) {
        console.error('Failed to fetch students, returning mock data:', error);
        return mockStudents;
    }
}

export async function getAllStudentsForAdmin(): Promise<StudentForAdmin[]> {
    if (!pool) {
        console.warn("Database not connected. Cannot fetch full student data.");
        return [];
    }
     try {
        const [rows] = await pool.query('SELECT * FROM students ORDER BY year DESC, class_name, roll ASC');
        return rows as StudentForAdmin[];
    } catch (error) {
        console.error('Failed to fetch students for admin:', error);
        return [];
    }
}

export async function getStudentForAdmin(id: string | number): Promise<StudentForAdmin | null> {
     if (!pool) {
        return null;
    }
    try {
        const [rows] = await pool.query<StudentForAdmin[]>('SELECT * FROM students WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (error) {
        console.error(`Failed to fetch student for admin by id ${id}:`, error);
        return null;
    }
}

export async function getStudentByRoll(roll: string): Promise<Student | null> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for a student.");
        return mockStudents.find(s => s.roll === roll) || null;
    }
    try {
        const [rows] = await pool.query('SELECT id, roll, name, class_name, gender, year, image, data_ai_hint FROM students WHERE roll = ?', [roll]);
        const students = rows as Student[];
        return students[0] || null;
    } catch (error) {
        console.error(`Failed to fetch student by roll ${roll}, returning mock data:`, error);
        return mockStudents.find(s => s.roll === roll) || null;
    }
}


type SaveResult = { success: boolean; error?: string };

export async function saveStudent(formData: FormData, id?: number): Promise<SaveResult> {
  if (!pool) {
    return { success: false, error: "Database not connected." };
  }
  
  const studentData: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    studentData[key] = value;
  });

  try {
    const { name, roll, class_name, year, dob, gender, religion, blood_group, father_name, father_mobile, mother_name, present_address, permanent_address, image } = studentData;

    const fields = [name, roll, class_name, year, dob, gender, religion, blood_group, father_name, father_mobile, mother_name, present_address, permanent_address];
    let query;

    if (id) {
      // Update
      if (image) {
        fields.push(image);
        query = 'UPDATE students SET name = ?, roll = ?, class_name = ?, year = ?, dob = ?, gender = ?, religion = ?, blood_group = ?, father_name = ?, father_mobile = ?, mother_name = ?, present_address = ?, permanent_address = ?, image = ? WHERE id = ?';
      } else {
        query = 'UPDATE students SET name = ?, roll = ?, class_name = ?, year = ?, dob = ?, gender = ?, religion = ?, blood_group = ?, father_name = ?, father_mobile = ?, mother_name = ?, present_address = ?, permanent_address = ? WHERE id = ?';
      }
      fields.push(id);
    } else {
      // Insert
      fields.push(image || null);
      query = 'INSERT INTO students (name, roll, class_name, year, dob, gender, religion, blood_group, father_name, father_mobile, mother_name, present_address, permanent_address, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    }

    await pool.query(query, fields);

    revalidatePath('/admin/students');
    revalidatePath('/(site)/students');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save student:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, error: "এই রোল নম্বরটি ইতিমধ্যে ব্যবহার করা হয়েছে।" };
    }
    return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
  }
}

export async function deleteStudent(id: number): Promise<SaveResult> {
  if (!pool) {
    return { success: false, error: "Database not connected." };
  }
  try {
    await pool.query('DELETE FROM students WHERE id = ?', [id]);
    revalidatePath('/admin/students');
    revalidatePath('/(site)/students');
    return { success: true };
  } catch (error) {
    console.error("Failed to delete student:", error);
    return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
  }
}
