
import pool from './db';

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

export async function getTeachers(): Promise<Teacher[]> {
    const [rows] = await pool.query('SELECT * FROM teachers');
    return rows as Teacher[];
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
    const [rows] = await pool.query('SELECT * FROM teachers WHERE id = ?', [id]);
    const teachers = rows as Teacher[];
    return teachers[0] || null;
}
