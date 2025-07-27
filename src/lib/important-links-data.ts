
'use server';

import pool from './db';
import { revalidatePath } from 'next/cache';

export interface Link {
    id: number;
    group_id: number;
    text: string;
    href: string | null;
    sort_order: number;
}

export interface ImportantLinkGroup {
  id: number;
  title: string;
  image: string;
  data_ai_hint: string;
  sort_order: number;
  links: Link[];
}

const mockLinkCards: ImportantLinkGroup[] = [
    {
        id: 1,
        title: "শিক্ষা বোর্ড",
        image: "https://placehold.co/110x110.png",
        data_ai_hint: "education board",
        sort_order: 1,
        links: [
            { id: 1, group_id: 1, text: "ঢাকা শিক্ষা বোর্ড", href: "#", sort_order: 1 },
            { id: 2, group_id: 1, text: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর", href: "#", sort_order: 2 },
            { id: 3, group_id: 1, text: "বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো", href: "#", sort_order: 3 },
            { id: 4, group_id: 1, text: "পাঠদান ও স্বীকৃতি", href: "/recognition", sort_order: 4 },
        ]
    },
    {
        id: 2,
        title: "অন্যান্য",
        image: "https://placehold.co/110x110.png",
        data_ai_hint: "books library",
        sort_order: 2,
        links: [
            { id: 5, group_id: 2, text: "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড", href: "#", sort_order: 1 },
            { id: 6, group_id: 2, text: "শিক্ষক বাতায়ন", href: "#", sort_order: 2 },
            { id: 7, group_id: 2, text: "মুক্তপাঠ", href: "#", sort_order: 3 },
        ]
    }
];

export async function getImportantLinkGroups(): Promise<ImportantLinkGroup[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for important links.");
        return mockLinkCards;
    }
    try {
        const [groups] = await pool.query('SELECT * FROM important_link_groups ORDER BY sort_order ASC');
        const linkGroups = groups as ImportantLinkGroup[];

        for (const group of linkGroups) {
            const [links] = await pool.query('SELECT * FROM important_links WHERE group_id = ? ORDER BY sort_order ASC', [group.id]);
            group.links = links as Link[];
        }

        return linkGroups;
    } catch (error) {
        console.error('Failed to fetch important link groups, returning mock data:', error);
        return mockLinkCards;
    }
}

type SaveResult = { success: boolean; error?: string };

export async function getLinkGroupById(id: number | string): Promise<ImportantLinkGroup | null> {
    if (!pool) return null;
    try {
        const [rows] = await pool.query<ImportantLinkGroup[]>('SELECT * FROM important_link_groups WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (error) {
        console.error('Failed to fetch link group:', error);
        return null;
    }
}

export async function saveLinkGroup(formData: FormData, id?: number): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    
    try {
        const data = {
            title: formData.get('title') as string,
            sort_order: parseInt(formData.get('sort_order') as string, 10),
            data_ai_hint: formData.get('data_ai_hint') as string,
            image: formData.get('image') as string | null
        };
        
        if (id) {
            const fieldsToUpdate: any = { title: data.title, sort_order: data.sort_order, data_ai_hint: data.data_ai_hint };
            if (data.image) {
                fieldsToUpdate.image = data.image;
            }
            await pool.query('UPDATE important_link_groups SET ? WHERE id = ?', [fieldsToUpdate, id]);
        } else {
            if (!data.image) return { success: false, error: 'Image is required for new groups' };
            await pool.query('INSERT INTO important_link_groups (title, sort_order, data_ai_hint, image) VALUES (?, ?, ?, ?)', [data.title, data.sort_order, data.data_ai_hint, data.image]);
        }
        
        revalidatePath('/admin/important-links');
        revalidatePath('/(site)/');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function deleteLinkGroup(id: number): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    
    try {
        await pool.query('DELETE FROM important_links WHERE group_id = ?', [id]);
        await pool.query('DELETE FROM important_link_groups WHERE id = ?', [id]);
        revalidatePath('/admin/important-links');
        revalidatePath('/(site)/');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function getLinkById(id: number | string): Promise<Link | null> {
    if (!pool) return null;
    try {
        const [rows] = await pool.query<Link[]>('SELECT * FROM important_links WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (error) {
        console.error('Failed to fetch link:', error);
        return null;
    }
}


export async function saveLink(formData: FormData, id?: number): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    
    try {
        const data = {
            text: formData.get('text') as string,
            href: (formData.get('href') as string) || null,
            sort_order: parseInt(formData.get('sort_order') as string, 10),
            group_id: parseInt(formData.get('group_id') as string, 10),
        };

        if (id) {
            await pool.query('UPDATE important_links SET ? WHERE id = ?', [data, id]);
        } else {
            await pool.query('INSERT INTO important_links (text, href, sort_order, group_id) VALUES (?, ?, ?, ?)', [data.text, data.href, data.sort_order, data.group_id]);
        }
        
        revalidatePath('/admin/important-links');
        revalidatePath('/(site)/');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function deleteLink(id: number): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    
    try {
        await pool.query('DELETE FROM important_links WHERE id = ?', [id]);
        revalidatePath('/admin/important-links');
        revalidatePath('/(site)/');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
