
'use server';

import pool from './db';

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

const mockSchoolInfo: SchoolInfo = {
    id: 1,
    name: "মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়",
    address: "কাফ্রিখাল, মিঠাপুকুর, রংপুর।",
    logo_url: "https://placehold.co/80x80.png"
};

export async function getCarouselItems(): Promise<CarouselItem[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for carousel items.");
        return mockCarouselItems;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM carousel_items ORDER BY sort_order ASC');
        return rows as CarouselItem[];
    } catch (error) {
        console.error('Failed to fetch carousel items, returning mock data:', error);
        return mockCarouselItems;
    }
}

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

export async function getSchoolInfo(): Promise<SchoolInfo> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for school info.");
        return mockSchoolInfo;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM school_info LIMIT 1');
        const results = rows as SchoolInfo[];
        return results[0] || mockSchoolInfo;
    } catch (error) {
        console.error('Failed to fetch school info, returning mock data:', error);
        return mockSchoolInfo;
    }
}
