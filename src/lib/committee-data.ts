
'use server';

import pool from './db';

export interface CommitteeMember {
    id: number;
    name: string;
    role: string;
    image: string;
    dataAiHint: string;
    sort_order: number;
}

const mockCommitteeMembers: CommitteeMember[] = [
  {
    id: 1,
    name: "প্রফেসর ড. মোঃ আখতারুজ্জামান",
    role: "সভাপতি",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male portrait",
    sort_order: 1,
  },
  {
    id: 2,
    name: "অধ্যক্ষ মোসাঃ হাসিনা পারভীন",
    role: "সদস্য সচিব",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "female portrait",
    sort_order: 2,
  },
  {
    id: 3,
    name: "জনাব মোঃ আব্দুল্লাহ",
    role: "অভিভাবক সদস্য",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male portrait",
    sort_order: 3,
  },
  {
    id: 4,
    name: "মিসেস ফরিদা ইয়াসমিন",
    role: "অভিভাবক সদস্য",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "female portrait",
    sort_order: 4,
  },
  {
    id: 5,
    name: "জনাব মোঃ কামরুল হাসান",
    role: "শিক্ষক প্রতিনিধি",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male teacher portrait",
    sort_order: 5,
  },
  {
    id: 6,
    name: "মিসেস সালমা চৌধুরী",
    role: "শিক্ষক প্রতিনিধি",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "female teacher portrait",
    sort_order: 6,
  },
  {
    id: 7,
    name: "জেলা প্রশাসক, ঢাকা",
    role: "সদস্য",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "official portrait",
    sort_order: 7,
  },
   {
    id: 8,
    name: "প্রধান শিক্ষক",
    role: "সদস্য",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male teacher portrait",
    sort_order: 8,
  },
];

export async function getCommitteeMembers(): Promise<CommitteeMember[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for committee members.");
        return mockCommitteeMembers;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM committee_members ORDER BY sort_order ASC');
        return rows as CommitteeMember[];
    } catch (error) {
        console.error('Failed to fetch committee members, returning mock data:', error);
        return mockCommitteeMembers;
    }
}
