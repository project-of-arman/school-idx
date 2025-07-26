
'use server';

import pool from './db';

/*
SQL for creating the students table:

CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roll` varchar(50) NOT NULL UNIQUE,
  `name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `year` int NOT NULL,
  `image` text,
  `data_ai_hint` varchar(255) DEFAULT NULL,
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

const mockStudents: Student[] = [
  { id: 1, roll: '101', name: "আরিফ হোসেন", class_name: "১০ম", gender: "ছেলে", year: 2024, image: "https://placehold.co/300x400.png", data_ai_hint: "male student portrait" },
  { id: 2, roll: '102', name: "সুমি আক্তার", class_name: "১০ম", gender: "মেয়ে", year: 2024, image: "https://placehold.co/300x400.png", data_ai_hint: "female student portrait" },
  { id: 3, roll: '201', name: "জাহিদ হাসান", class_name: "৯ম", gender: "ছেলে", year: 2024, image: "https://placehold.co/300x400.png", data_ai_hint: "male student portrait" },
  { id: 4, roll: '202', name: "রিয়া চৌধুরী", class_name: "৯ম", gender: "মেয়ে", year: 2024, image: "https://placehold.co/300x400.png", data_ai_hint: "female student portrait" },
  { id: 5, roll: '301', name: "সাইফুল ইসলাম", class_name: "৮ম", gender: "ছেলে", year: 2023, image: "https://placehold.co/300x400.png", data_ai_hint: "male student portrait" },
  { id: 6, roll: '302', name: "নাবিলা রহমান", class_name: "৮ম", gender: "মেয়ে", year: 2023, image: "https://placehold.co/300x400.png", data_ai_hint: "female student portrait" },
];

export async function getStudents(): Promise<Student[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for students.");
        return mockStudents;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM students ORDER BY year DESC, class_name, roll ASC');
        return rows as Student[];
    } catch (error) {
        console.error('Failed to fetch students, returning mock data:', error);
        return mockStudents;
    }
}

export async function getStudentByRoll(roll: string): Promise<Student | null> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for a student.");
        return mockStudents.find(s => s.roll === roll) || null;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM students WHERE roll = ?', [roll]);
        const students = rows as Student[];
        return students[0] || null;
    } catch (error) {
        console.error(`Failed to fetch student by roll ${roll}, returning mock data:`, error);
        return mockStudents.find(s => s.roll === roll) || null;
    }
}
