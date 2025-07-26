
'use server';

import pool from './db';

export interface DashboardStats {
    noticeCount: number;
    studentCount: number;
    teacherCount: number;
    admissionApplicationsCount: number;
}

export interface ApplicationCount {
    name: string;
    total: number;
}


async function getTableCount(tableName: string): Promise<number> {
    if (!pool) {
        // Return 0 if DB is not connected, prevents breaking the dashboard
        return 0;
    }
    try {
        const [rows] = await pool.query<{ 'COUNT(*)': number }[]>(`SELECT COUNT(*) FROM ${tableName}`);
        return rows[0]['COUNT(*)'] || 0;
    } catch (error) {
        console.error(`Failed to get count for table ${tableName}:`, error);
        // If table doesn't exist or other error, return 0
        return 0;
    }
}

export async function getDashboardStats(): Promise<DashboardStats> {
    // Using Promise.all to fetch counts in parallel for better performance
    const [noticeCount, studentCount, teacherCount, admissionApplicationsCount] = await Promise.all([
        getTableCount('notices'),
        getTableCount('students'),
        getTableCount('teachers'),
        getTableCount('admission_applications'),
    ]);

    return {
        noticeCount,
        studentCount,
        teacherCount,
        admissionApplicationsCount,
    };
}


const applicationTables = [
    { dbTable: 'admission_applications', displayName: 'ভর্তি' },
    { dbTable: 'transfer_certificate_applications', displayName: 'ছাড়পত্র' },
    { dbTable: 'testimonial_applications', displayName: 'প্রশংসাপত্র' },
    { dbTable: 'certificate_applications', displayName: 'সনদপত্র' },
    { dbTable: 'admit_card_applications', displayName: 'প্রবেশপত্র' },
    { dbTable: 'marksheet_applications', displayName: 'মার্কশিট' },
    { dbTable: 'leave_applications', displayName: 'ছুটি' },
    { dbTable: 'library_card_applications', displayName: 'লাইব্রেরী কার্ড' },
    { dbTable: 'guardian_consent_applications', displayName: 'অভিভাবক সম্মতি' },
    { dbTable: 'subject_change_applications', displayName: 'বিষয় পরিবর্তন' },
    { dbTable: 'stipend_applications', displayName: 'উপবৃত্তি' },
];

export async function getApplicationCounts(): Promise<ApplicationCount[]> {
     if (!pool) {
        return applicationTables.map(table => ({ name: table.displayName, total: 0 }));
    }

    const countPromises = applicationTables.map(table =>
        getTableCount(table.dbTable).then(count => ({
            name: table.displayName,
            total: count
        }))
    );

    const results = await Promise.all(countPromises);
    
    // Filter out items with 0 count if you only want to show forms with applications
    // For this dashboard, we will show all, even with 0.
    return results;
}
