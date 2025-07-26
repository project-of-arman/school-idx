
'use server';

import pool from './db';
import { revalidatePath } from 'next/cache';

export interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  dataAiHint: string;
}

const mockTeachers: Teacher[] = [
    {
      id: "1",
      name: "মোঃ আব্দুল্লাহ আল-আমিন",
      role: "প্রধান শিক্ষক",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01700000000",
      email: "abdullah@example.com",
      dataAiHint: "male teacher portrait"
    },
    {
      id: "2",
      name: "ফাতেমা আক্তার",
      role: "সহকারী প্রধান শিক্ষক",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01800000000",
      email: "fatema@example.com",
      dataAiHint: "female teacher portrait"
    },
    {
      id: "3",
      name: "রহিম উদ্দিন আহমেদ",
      role: "সিনিয়র শিক্ষক (গণিত)",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01900000000",
      email: "rahim@example.com",
      dataAiHint: "male teacher portrait"
    },
    {
      id: "4",
      name: "সালমা চৌধুরী",
      role: "সিনিয়র শিক্ষক (বিজ্ঞান)",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01500000000",
      email: "salma@example.com",
      dataAiHint: "female teacher portrait"
    },
    {
      id: "5",
      name: "কামরুল হাসান",
      role: "সহকারী শিক্ষক (ইংরেজি)",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01600000000",
      email: "kamrul@example.com",
      dataAiHint: "male teacher portrait"
    },
    {
      id: "6",
      name: "আয়েশা সিদ্দিকা",
      role: "সহকারী শিক্ষক (বাংলা)",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01300000000",
      email: "ayesha@example.com",
      dataAiHint: "female teacher portrait"
    },
    {
      id: "7",
      name: "আরিফুল ইসলাম",
      role: "সহকারী শিক্ষক (শরীরচর্চা)",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01400000000",
      email: "ariful@example.com",
      dataAiHint: "male teacher portrait"
    }
  ];

export async function getTeachers(): Promise<Teacher[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data.");
        return mockTeachers;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM teachers');
        return rows as Teacher[];
    } catch (error) {
        console.error('Failed to fetch teachers, returning mock data:', error);
        return mockTeachers;
    }
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data.");
        return mockTeachers.find(t => t.id === id) || null;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM teachers WHERE id = ?', [id]);
        const teachers = rows as Teacher[];
        return teachers[0] || null;
    } catch (error) {
        console.error(`Failed to fetch teacher by id ${id}, returning mock data:`, error);
        return mockTeachers.find(t => t.id === id) || null;
    }
}

type SaveResult = { success: boolean; error?: string };

export async function saveTeacher(formData: FormData, id?: string): Promise<SaveResult> {
    if (!pool) {
        return { success: false, error: "Database not connected." };
    }

    const teacherData: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        teacherData[key] = value || null;
    });

    try {
        const { name, role, email, phone, address, image, dataAiHint } = teacherData;
        
        let query;
        let params;
        
        if (id) {
            // Update
            const fieldsToUpdate: { [key: string]: any } = { name, role, email, phone, address, dataAiHint };
            if (image) {
                fieldsToUpdate.image = image;
            }
            query = 'UPDATE teachers SET ? WHERE id = ?';
            params = [fieldsToUpdate, id];
        } else {
            // Insert
            query = 'INSERT INTO teachers (name, role, email, phone, address, image, dataAiHint) VALUES (?, ?, ?, ?, ?, ?, ?)';
            params = [name, role, email, phone, address, image, dataAiHint];
        }

        await pool.query(query, params);

        revalidatePath('/admin/teachers');
        revalidatePath('/(site)/staff');
        revalidatePath('/(site)/teachers');

        return { success: true };
    } catch (error: any) {
        console.error("Failed to save teacher:", error);
        return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
    }
}

export async function deleteTeacher(id: string): Promise<SaveResult> {
    if (!pool) {
        return { success: false, error: "Database not connected." };
    }
    try {
        await pool.query('DELETE FROM teachers WHERE id = ?', [id]);
        
        revalidatePath('/admin/teachers');
        revalidatePath('/(site)/staff');
        revalidatePath('/(site)/teachers');

        return { success: true };
    } catch (error) {
        console.error("Failed to delete teacher:", error);
        return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
    }
}
