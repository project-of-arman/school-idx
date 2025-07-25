
'use server';

import pool from './db';

interface SubjectGrade {
    name: string;
    grade: string;
    gpa: number;
}

export interface StudentResult {
    id: number;
    roll: string;
    class_name: string;
    name: string;
    exam_name: string;
    group_name: string;
    father_name: string;
    mother_name: string;
    image: string | null;
    data_ai_hint: string | null;
    final_gpa: number;
    status: string;
    subjects: SubjectGrade[];
}

const mockResults: StudentResult[] = [
  { 
    id: 1,
    roll: '101', 
    class_name: '১০ম', 
    name: 'আরিফ হোসেন',
    exam_name: 'বার্ষিক পরীক্ষা - ২০২৪',
    group_name: 'বিজ্ঞান',
    father_name: 'মোঃ আব্দুল্লাহ',
    mother_name: 'ফাতেমা বেগম',
    image: 'https://placehold.co/300x400.png',
    data_ai_hint: 'male student portrait',
    final_gpa: 4.44,
    status: 'Promoted',
    subjects: [
        { name: 'বাংলা ১ম পত্র', grade: 'A+', gpa: 5.00 },
        { name: 'বাংলা ২য় পত্র', grade: 'A', gpa: 4.00 },
        { name: 'ইংরেজি ১ম পত্র', grade: 'A', gpa: 4.00 },
        { name: 'ইংরেজি ২য় পত্র', grade: 'A', gpa: 4.00 },
        { name: 'গণিত', grade: 'A+', gpa: 5.00 },
        { name: 'পদার্থবিজ্ঞান', grade: 'A', gpa: 4.00 },
        { name: 'রসায়ন', grade: 'A-', gpa: 3.50 },
        { name: 'জীববিজ্ঞান', grade: 'A+', gpa: 5.00 },
    ],
  },
  { 
    id: 2,
    roll: '201', 
    class_name: '৯ম', 
    name: 'জাহিদ হাসান',
    exam_name: 'বার্ষিক পরীক্ষা - ২০২৪',
    group_name: 'ব্যবসায় শিক্ষা',
    father_name: 'মোঃ হাসান',
    mother_name: 'জোহরা বেগম',
    image: 'https://placehold.co/300x400.png',
    data_ai_hint: 'male student portrait',
    final_gpa: 3.88,
    status: 'Promoted',
    subjects: [
        { name: 'বাংলা ১ম পত্র', grade: 'A', gpa: 4.00 },
        { name: 'বাংলা ২য় পত্র', grade: 'A-', gpa: 3.50 },
        { name: 'ইংরেজি ১ম পত্র', grade: 'A', gpa: 4.00 },
        { name: 'ইংরেজি ২য় পত্র', grade: 'B', gpa: 3.00 },
        { name: 'গণিত', grade: 'A', gpa: 4.00 },
        { name: 'বিজ্ঞান', grade: 'A-', gpa: 3.50 },
        { name: 'হিসাববিজ্ঞান', grade: 'A', gpa: 4.00 },
        { name: 'ব্যবসায় উদ্যোগ', grade: 'A+', gpa: 5.00 },
    ],
  },
];


export async function getResultByRollAndClass(roll: string, className: string): Promise<StudentResult | null> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for result.");
        const result = mockResults.find(r => r.roll === roll && r.class_name === className) || null;
        return result;
    }

    try {
        const [resultRows] = await pool.query<any[]>(
            'SELECT * FROM results WHERE roll = ? AND class_name = ?',
            [roll, className]
        );

        if (resultRows.length === 0) {
            return null;
        }

        const studentResultData = resultRows[0];

        const [subjectRows] = await pool.query<any[]>(
            'SELECT * FROM subject_grades WHERE result_id = ?',
            [studentResultData.id]
        );

        const subjects: SubjectGrade[] = subjectRows.map(row => ({
            name: row.subject_name,
            grade: row.grade,
            gpa: parseFloat(row.gpa)
        }));

        return {
            ...studentResultData,
            final_gpa: parseFloat(studentResultData.final_gpa),
            subjects: subjects
        };

    } catch (error) {
        console.error(`Failed to fetch result for roll ${roll}, returning mock data:`, error);
        const result = mockResults.find(r => r.roll === roll && r.class_name === className) || null;
        return result;
    }
}
