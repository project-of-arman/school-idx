
'use server';

import pool from './db';
import { revalidatePath } from 'next/cache';

export interface Staff {
  id: string;
  name: string;
  role: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  dataAiHint: string;
}

const mockStaff: Staff[] = [
    {
      id: "1",
      name: "মোঃ রফিকুল ইসলাম",
      role: "হিসাবরক্ষক",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01712345678",
      email: "rafiqul@example.com",
      dataAiHint: "male staff portrait"
    },
    {
      id: "2",
      name: "আকলিমা খাতুন",
      role: "অফিস সহকারী",
      image: "https://placehold.co/300x400.png",
      address: "ঢাকা, বাংলাদেশ",
      phone: "01812345678",
      email: "aklima@example.com",
      dataAiHint: "female staff portrait"
    }
  ];

export async function getStaff(): Promise<Staff[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data.");
        return mockStaff;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM staff');
        return rows as Staff[];
    } catch (error) {
        console.error('Failed to fetch staff, returning mock data:', error);
        return mockStaff;
    }
}

export async function getStaffById(id: string): Promise<Staff | null> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data.");
        return mockStaff.find(t => t.id === id) || null;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM staff WHERE id = ?', [id]);
        const staff = rows as Staff[];
        return staff[0] || null;
    } catch (error) {
        console.error(`Failed to fetch staff by id ${id}, returning mock data:`, error);
        return mockStaff.find(t => t.id === id) || null;
    }
}

type SaveResult = { success: boolean; error?: string };

export async function saveStaff(formData: FormData, id?: string): Promise<SaveResult> {
    if (!pool) {
        return { success: false, error: "Database not connected." };
    }

    const staffData: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        staffData[key] = value || null;
    });

    try {
        const { name, role, email, phone, address, image, dataAiHint } = staffData;
        
        if (id) {
            // Update
            const updateFields: { [key: string]: any } = {};
            if (name) updateFields.name = name;
            if (role) updateFields.role = role;
            if (email) updateFields.email = email;
            if (phone) updateFields.phone = phone;
            if (address) updateFields.address = address;
            if (dataAiHint) updateFields.dataAiHint = dataAiHint;
            if (image) updateFields.image = image;

            if (Object.keys(updateFields).length > 0) {
                const query = 'UPDATE staff SET ? WHERE id = ?';
                const params = [updateFields, id];
                await pool.query(query, params);
            }

        } else {
            // Insert
            const columns = ['name', 'role', 'email', 'phone', 'address', 'image', 'dataAiHint'];
            const insertParams = columns.map(col => staffData[col] || null);

            const query = `INSERT INTO staff (${columns.join(', ')}) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            await pool.query(query, insertParams);
        }

        revalidatePath('/admin/staff');
        revalidatePath('/(site)/staff');

        return { success: true };
    } catch (error: any) {
        console.error("Failed to save staff:", error);
        return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
    }
}

export async function deleteStaff(id: string): Promise<SaveResult> {
    if (!pool) {
        return { success: false, error: "Database not connected." };
    }
    try {
        await pool.query('DELETE FROM staff WHERE id = ?', [id]);
        
        revalidatePath('/admin/staff');
        revalidatePath('/(site)/staff');

        return { success: true };
    } catch (error) {
        console.error("Failed to delete staff:", error);
        return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
    }
}
