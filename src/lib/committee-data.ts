
'use server';

import pool from './db';
import { revalidatePath } from 'next/cache';

export interface CommitteeMember {
    id: number;
    name: string;
    role: string;
    image: string;
    dataAiHint: string;
    sort_order: number;
}

const mockCommitteeMembers: CommitteeMember[] = [
  {
    id: 1,
    name: "প্রফেসর ড. মোঃ আখতারুজ্জামান",
    role: "সভাপতি",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male portrait",
    sort_order: 1,
  },
  // ... other mock members
];

export async function getCommitteeMembers(): Promise<CommitteeMember[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for committee members.");
        return mockCommitteeMembers;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM committee_members ORDER BY sort_order ASC');
        return rows as CommitteeMember[];
    } catch (error) {
        console.error('Failed to fetch committee members, returning mock data:', error);
        return mockCommitteeMembers;
    }
}

export async function getCommitteeMemberById(id: string | number): Promise<CommitteeMember | null> {
    if (!pool) {
        return null;
    }
    try {
        const [rows] = await pool.query<CommitteeMember[]>('SELECT * FROM committee_members WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (error) {
        console.error(`Failed to fetch committee member by id ${id}:`, error);
        return null;
    }
}

type SaveResult = { success: boolean; error?: string };

export async function saveCommitteeMember(formData: FormData, id?: number): Promise<SaveResult> {
    if (!pool) {
        return { success: false, error: "Database not connected." };
    }

    try {
        const data = {
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            sort_order: parseInt(formData.get('sort_order') as string, 10),
            dataAiHint: formData.get('dataAiHint') as string,
            image: formData.get('image') as string | null,
        };

        if (id) {
            // Update
            const query = 'UPDATE committee_members SET name = ?, role = ?, sort_order = ?, dataAiHint = ?, image = ? WHERE id = ?';
            await pool.query(query, [data.name, data.role, data.sort_order, data.dataAiHint, data.image, id]);
        } else {
            // Insert
            const query = 'INSERT INTO committee_members (name, role, sort_order, dataAiHint, image) VALUES (?, ?, ?, ?, ?)';
            await pool.query(query, [data.name, data.role, data.sort_order, data.dataAiHint, data.image]);
        }

        revalidatePath('/admin/committee');
        revalidatePath('/(site)/committee');

        return { success: true };
    } catch (error: any) {
        console.error("Failed to save committee member:", error);
        return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
    }
}

export async function deleteCommitteeMember(id: number): Promise<SaveResult> {
    if (!pool) {
        return { success: false, error: "Database not connected." };
    }
    try {
        await pool.query('DELETE FROM committee_members WHERE id = ?', [id]);
        
        revalidatePath('/admin/committee');
        revalidatePath('/(site)/committee');

        return { success: true };
    } catch (error) {
        console.error("Failed to delete committee member:", error);
        return { success: false, error: "একটি সার্ভার ত্রুটি হয়েছে।" };
    }
}
