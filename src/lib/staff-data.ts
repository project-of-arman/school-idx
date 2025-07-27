
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
        console.error(`Failed to fetch staff by id ${id}:`, error);
        return mockStaff.find(t => t.id === id) || null;
    }
}

type SaveResult = { success: boolean; error?: string };

export async function saveStaff(formData: FormData, id?: string): Promise<SaveResult> {
    if (!pool) {
        return { success: false, error: "Database not connected." };
    }

    try {
        const data = {
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            email: (formData.get('email') as string) || null,
            phone: (formData.get('phone') as string) || null,
            address: (formData.get('address') as string) || null,
            dataAiHint: (formData.get('dataAiHint') as string) || 'staff portrait',
            image: formData.get('image') as string | null,
        };

        if (id) {
            // Update operation
            const fieldsToUpdate: { [key: string]: any } = {
                name: data.name,
                role: data.role,
                email: data.email,
                phone: data.phone,
                address: data.address,
                dataAiHint: data.dataAiHint,
            };

            // Only include the image field if a new one was uploaded
            if (data.image) {
                fieldsToUpdate.image = data.image;
            }

            const query = 'UPDATE staff SET ? WHERE id = ?';
            await pool.query(query, [fieldsToUpdate, id]);

        } else {
            // Insert operation
            const query = `
                INSERT INTO staff (name, role, email, phone, address, image, dataAiHint)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const params = [data.name, data.role, data.email, data.phone, data.address, data.image, data.dataAiHint];
            await pool.query(query, params);
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
