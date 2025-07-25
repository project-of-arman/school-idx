
'use server';

import pool from './db';

interface Link {
    id: number;
    group_id: number;
    text: string;
    href: string;
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
