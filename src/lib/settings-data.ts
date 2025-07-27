
'use server';

import pool from './db';
import { RowDataPacket } from 'mysql2';

// ========= TYPES =========
export interface SiteSettings extends RowDataPacket {
  id: number;
  site_title: string;
  meta_description: string;
  meta_keywords: string | null;
  favicon_url: string | null;
}

// ========= MOCK DATA (for fallback) =========
const mockSiteSettings: SiteSettings = {
  id: 1,
  site_title: 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়',
  meta_description: 'Official website for মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়',
  meta_keywords: 'school, education, bangladesh',
  favicon_url: '/favicon.ico',
};

// ========= DATABASE ACTIONS =========
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!pool) return mockSiteSettings;
  try {
    const [rows] = await pool.query<SiteSettings[]>('SELECT * FROM site_settings LIMIT 1');
    return rows[0] || mockSiteSettings;
  } catch (error: any) {
    if (error.code === 'ER_NO_SUCH_TABLE') {
        console.warn('`site_settings` table not found. Returning mock data.');
        return mockSiteSettings;
    }
    console.error('Failed to fetch site settings:', error);
    return mockSiteSettings;
  }
}
