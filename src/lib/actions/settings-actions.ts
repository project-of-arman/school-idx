
'use server';

import { revalidatePath } from 'next/cache';
import pool from '../db';
import type { SiteSettings } from '../settings-data';

type SaveResult = { success: boolean; error?: string };

export async function saveSiteSettings(data: Omit<SiteSettings, 'id'>): Promise<SaveResult> {
  if (!pool) return { success: false, error: 'Database not connected' };
  try {
    // There's only one row in this table, with id=1
    await pool.query('UPDATE site_settings SET ? WHERE id = 1', [data]);
    
    // Revalidate the root layout to apply new meta tags
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to save site settings:', error);
    return { success: false, error: 'Failed to save settings' };
  }
}
