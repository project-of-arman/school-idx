
'use server';

import pool from './db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface CarouselItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  dataAiHint: string;
  sort_order: number;
}

export interface SchoolFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface AboutSchoolInfo {
    id: number;
    title: string;
    description: string;
    image_url: string;
}

export interface SchoolInfo {
    id: number;
    name: string;
    address: string;
    logo_url: string;
}

const mockCarouselItems: CarouselItem[] = [
  {
    id: 1,
    src: "https://jrgbp.edu.bd/wp-content/uploads/2023/09/2022-12-09.jpg",
    alt: "School campus",
    title: "স্বাগতম মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়ে",
    description: "একটি আদর্শ ও আধুনিক শিক্ষা প্রতিষ্ঠান",
    dataAiHint: "school campus",
    sort_order: 1
  },
  {
    id: 2,
    src: "https://narayanganjpreparatoryschool.edu.bd/wp-content/uploads/2024/01/IMG-20230714-WA0003.jpg",
    alt: "Annual sports day",
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    description: "শিক্ষার্থীদের শারীরিক ও মানসিক বিকাশে খেলাধুলার গুরুত্ব",
    dataAiHint: "sports day",
    sort_order: 2
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npEppKeyl0u8huo4z74e9lsi3VkjV1r6IvhRzM80FtS3C4i0O8EleFmwOKE3qt3e-el8V7cO9mG5j4OKEZIm9OPc_lwM-m9wLWl6aliRYfFE8alPOzE5JIliGedNvM6cSKzTS9Brw=s680-w680-h510-rw",
    alt: "Science fair",
    title: "বিজ্ঞান মেলা",
    description: "নতুন প্রজন্মের উদ্ভাবনী শক্তির প্রকাশ",
    dataAiHint: "science fair",
    sort_order: 3
  },
];


const mockFeatures: SchoolFeature[] = [
    {
        id: 1,
        icon: "History",
        title: "আমাদের ইতিহাস",
        description: "মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় প্রতিষ্ঠিত হয়েছিল ১৯৯০ সালে। প্রতিষ্ঠার পর থেকে আমরা জ্ঞানের আলো ছড়িয়ে যাচ্ছি এবং হাজারো শিক্ষার্থীর भविष्य গড়ে তুলেছি। আমাদের রয়েছে দীর্ঘদিনের গৌরবময় ইতিহাস।"
    },
    {
        id: 2,
        icon: "Target",
        title: "আমাদের লক্ষ্য ও উদ্দেশ্য",
        description: "আমাদের মূল লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধে উদ্বুদ্ধ করে একজন আদর্শ নাগরিক হিসেবে গড়ে তোলা। আমরা সৃজনশীলতা ও মননশীলতার বিকাশে বিশ্বাসী।"
    },
    {
        id: 3,
        icon: "BookOpen",
        title: "একাডেমিক কার্যক্রম",
        description: "আমরা জাতীয় শিক্ষাক্রম অনুসরণ করে থাকি। প্রাথমিক থেকে উচ্চ মাধ্যমিক পর্যন্ত আমাদের শিক্ষা কার্যক্রম পরিচালিত হয়। সহশিক্ষা কার্যক্রমের অংশ হিসেবে রয়েছে বিতর্ক, খেলাধুলা, এবং সাংস্কৃতিক চর্চা।"
    },
];

const mockAboutSchool: AboutSchoolInfo = {
    id: 1,
    title: "আমাদের সম্পর্কে",
    description: "মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা।",
    image_url: "https://placehold.co/400x500.png"
};

const mockSchoolInfo: SchoolInfo = {
    id: 1,
    name: "মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়",
    address: "কাফ্রিখাল, মিঠাপুকুর, রংপুর।",
    logo_url: "https://placehold.co/80x80.png"
};

type SaveResult = { success: boolean; error?: string };

// ========= CAROUSEL ACTIONS =========
export async function getCarouselItems(): Promise<CarouselItem[]> {
    if (!pool) return mockCarouselItems;
    try {
        const [rows] = await pool.query('SELECT * FROM carousel_items ORDER BY sort_order ASC');
        return rows as CarouselItem[];
    } catch (error) {
        console.error('Failed to fetch carousel items:', error);
        return mockCarouselItems;
    }
}

export async function getCarouselItemById(id: string | number): Promise<CarouselItem | null> {
    if (!pool) return null;
    try {
        const [rows] = await pool.query<CarouselItem[]>('SELECT * FROM carousel_items WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (error) {
        return null;
    }
}

export async function saveCarouselItem(formData: FormData, id?: number): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    
    try {
        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            alt: formData.get('alt') as string,
            dataAiHint: formData.get('dataAiHint') as string,
            sort_order: parseInt(formData.get('sort_order') as string, 10),
            src: formData.get('src') as string | null
        };
        
        if (id) {
            const fieldsToUpdate: any = { 
                title: data.title, 
                description: data.description,
                alt: data.alt,
                dataAiHint: data.dataAiHint,
                sort_order: data.sort_order 
            };
            if (data.src) fieldsToUpdate.src = data.src;
            await pool.query('UPDATE carousel_items SET ? WHERE id = ?', [fieldsToUpdate, id]);
        } else {
            if (!data.src) return { success: false, error: 'Image is required for new carousel items' };
            await pool.query('INSERT INTO carousel_items (title, description, alt, dataAiHint, sort_order, src) VALUES (?, ?, ?, ?, ?, ?)', 
                [data.title, data.description, data.alt, data.dataAiHint, data.sort_order, data.src]);
        }
        
        revalidatePath('/admin/gallery/carousel');
        revalidatePath('/(site)/');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function deleteCarouselItem(id: number): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    try {
        await pool.query('DELETE FROM carousel_items WHERE id = ?', [id]);
        revalidatePath('/admin/gallery/carousel');
        revalidatePath('/(site)/');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

// ========= SCHOOL INFO ACTIONS =========
export async function getSchoolInfo(): Promise<SchoolInfo> {
    if (!pool) return mockSchoolInfo;
    try {
        const [rows] = await pool.query('SELECT * FROM school_info LIMIT 1');
        return (rows as SchoolInfo[])[0] || mockSchoolInfo;
    } catch (error) {
        return mockSchoolInfo;
    }
}

// ========= ABOUT SCHOOL ACTIONS =========
export async function getAboutSchool(): Promise<AboutSchoolInfo> {
    if (!pool) return mockAboutSchool;
    try {
        const [rows] = await pool.query('SELECT * FROM about_school LIMIT 1');
        return (rows as AboutSchoolInfo[])[0] || mockAboutSchool;
    } catch (error) {
        return mockAboutSchool;
    }
}

export async function saveAboutSchool(formData: FormData): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    try {
        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            image_url: formData.get('image_url') as string | null
        };
        const fieldsToUpdate: any = { title: data.title, description: data.description };
        if (data.image_url) fieldsToUpdate.image_url = data.image_url;
        await pool.query('UPDATE about_school SET ? WHERE id = 1', [fieldsToUpdate]);
        revalidatePath('/admin/school-details');
        revalidatePath('/(site)/');
        revalidatePath('/(site)/school-details');
        return { success: true };
    } catch(e: any) {
        return { success: false, error: e.message };
    }
}

// ========= SCHOOL FEATURES ACTIONS =========
const featureSchema = z.object({
  title: z.string().min(1, "শিরোনাম আবশ্যক"),
  icon: z.string().min(1, "আইকন আবশ্যক"),
  description: z.string().min(1, "বিবরণ আবশ্যক"),
});

export async function getSchoolFeatures(): Promise<SchoolFeature[]> {
    if (!pool) return mockFeatures;
    try {
        const [rows] = await pool.query('SELECT * FROM school_features ORDER BY id ASC');
        return rows as SchoolFeature[];
    } catch (error) {
        return mockFeatures;
    }
}

export async function saveSchoolFeature(data: unknown, id?: number): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    
    const parsed = featureSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: "Invalid data" };

    try {
        if (id) {
            await pool.query('UPDATE school_features SET ? WHERE id = ?', [parsed.data, id]);
        } else {
            await pool.query('INSERT INTO school_features SET ?', [parsed.data]);
        }
        revalidatePath('/admin/school-details');
        revalidatePath('/(site)/');
        revalidatePath('/(site)/school-details');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function deleteSchoolFeature(id: number): Promise<SaveResult> {
    if (!pool) return { success: false, error: "Database not connected" };
    try {
        await pool.query('DELETE FROM school_features WHERE id = ?', [id]);
        revalidatePath('/admin/school-details');
        revalidatePath('/(site)/');
        revalidatePath('/(site)/school-details');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
