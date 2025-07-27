
'use server';

import pool from '../db';
import { revalidatePath } from 'next/cache';
import type { FormSubmission } from '../config/forms-config';
import { formConfigs } from '../config/forms-config';


/*
This file centralizes actions for all form submissions across the application.
It provides functions to:
- Fetch all submissions for a specific form type.
- Fetch a single submission by its ID and type.
- Update the status of a submission (e.g., to 'approved' or 'rejected').
- Delete a submission.
*/

// ========= DATA FETCHING =========

export async function getFormSubmissions(formType: string): Promise<FormSubmission[]> {
  const config = formConfigs[formType];
  if (!config || !pool) return [];

  try {
    const columnKeys = config.columns.map(c => c.key).join(', ');
    const query = `SELECT id, ${columnKeys} FROM ${config.tableName} ORDER BY created_at DESC`;
    const [rows] = await pool.query<FormSubmission[]>(query);
    return rows;
  } catch (error) {
    console.error(`Failed to fetch submissions for ${formType}:`, (error as Error).message);
    // Return empty array if table doesn't exist or another error occurs
    return [];
  }
}

export async function getSubmissionDetails(formType: string, id: number): Promise<FormSubmission | null> {
  const config = formConfigs[formType];
  if (!config || !pool) return null;

  try {
    const query = `SELECT * FROM ${config.tableName} WHERE id = ?`;
    const [rows] = await pool.query<FormSubmission[]>(query, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Failed to fetch submission details for ${formType} with id ${id}:`, (error as Error).message);
    return null;
  }
}


// ========= DATA MUTATION =========

type MutationResult = { success: boolean; error?: string };

export async function updateSubmissionStatus(formType: string, id: number, status: 'approved' | 'rejected'): Promise<MutationResult> {
  const config = formConfigs[formType];
  if (!config || !pool) return { success: false, error: 'Invalid request' };

  try {
    const query = `UPDATE ${config.tableName} SET status = ? WHERE id = ?`;
    await pool.query(query, [status, id]);
    revalidatePath('/admin/forms');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update status for ${formType} with id ${id}:`, (error as Error).message);
    return { success: false, error: 'Database error' };
  }
}

export async function deleteSubmission(formType: string, id: number): Promise<MutationResult> {
  const config = formConfigs[formType];
  if (!config || !pool) return { success: false, error: 'Invalid request' };

  try {
    const query = `DELETE FROM ${config.tableName} WHERE id = ?`;
    await pool.query(query, [id]);
    revalidatePath('/admin/forms');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete submission for ${formType} with id ${id}:`, (error as Error).message);
    return { success: false, error: 'Database error' };
  }
}
