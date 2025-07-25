
'use server';

import pool from './db';

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
    {
        id: 4,
        icon: "Users",
        title: "অভিজ্ঞ শিক্ষক মণ্ডলী",
        description: "আমাদের প্রতিষ্ঠানে রয়েছেন একদল অভিজ্ঞ, প্রশিক্ষণপ্রাপ্ত এবং নিবেদিতপ্রাণ শিক্ষক। তারা শিক্ষার্থীদের সঠিক পথপ্রদর্শক হিসেবে কাজ করেন।"
    },
    {
        id: 5,
        icon: "Building",
        title: "অবকাঠামো",
        description: "আমাদের রয়েছে একটি সুবিশাল ক্যাম্পাস, আধুনিক শ্রেণীকক্ষ, সমৃদ্ধ লাইব্রেরি, বিজ্ঞানাগার এবং খেলার মাঠ। শিক্ষার্থীদের জন্য সকল সুযোগ-সুবিধা নিশ্চিত করা হয়েছে।"
    },
    {
        id: 6,
        icon: "Award",
        title: "অর্জনসমূহ",
        description: "বিগত বছরগুলোতে আমাদের শিক্ষার্থীরা বিভিন্ন জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণ করে অসংখ্য পুরস্কার অর্জন করেছে, যা আমাদের জন্য অত্যন্ত গৌরবের।"
    }
];

const mockAboutSchool: AboutSchoolInfo = {
    id: 1,
    title: "আমাদের সম্পর্কে",
    description: "মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা।",
    image_url: "https://placehold.co/400x500.png"
};

export async function getSchoolFeatures(): Promise<SchoolFeature[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for school features.");
        return mockFeatures;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM school_features ORDER BY id ASC');
        return rows as SchoolFeature[];
    } catch (error) {
        console.error('Failed to fetch school features, returning mock data:', error);
        return mockFeatures;
    }
}

export async function getAboutSchool(): Promise<AboutSchoolInfo> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for about school.");
        return mockAboutSchool;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM about_school LIMIT 1');
        const results = rows as AboutSchoolInfo[];
        return results[0] || mockAboutSchool;
    } catch (error) {
        console.error('Failed to fetch about school info, returning mock data:', error);
        return mockAboutSchool;
    }
}
