
'use server';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  dataAiHint: string;
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "বার্ষিক সাংস্কৃতিক অনুষ্ঠান",
    thumbnail: "https://placehold.co/600x400.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "আমাদের প্রতিষ্ঠানের বার্ষিক সাংস্কৃতিক অনুষ্ঠানের মনোমুগ্ধকর কিছু মুহূর্ত।",
    dataAiHint: "school event"
  },
  {
    id: "2",
    title: "স্বাধীনতা দিবস উদযাপন",
    thumbnail: "https://placehold.co/600x400.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "মহান স্বাধীনতা দিবস উপলক্ষে আয়োজিত বিশেষ অনুষ্ঠানের কিছু অংশ।",
    dataAiHint: "independence day"
  },
  {
    id: "3",
    title: "বৃক্ষরোপণ কর্মসূচি",
    thumbnail: "https://placehold.co/600x400.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "পরিবেশ রক্ষায় আমাদের শিক্ষার্থীদের স্বতঃস্ফূর্ত অংশগ্রহণ।",
    dataAiHint: "tree plantation"
  },
  {
    id: "4",
    title: "বিজ্ঞান মেলা",
    thumbnail: "https://placehold.co/600x400.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "শিক্ষার্থীদের উদ্ভাবনী প্রকল্পের প্রদর্শনী।",
    dataAiHint: "science fair"
  },
  {
    id: "5",
    title: "ক্রীড়া প্রতিযোগিতা",
    thumbnail: "https://placehold.co/600x400.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "বার্ষিক ক্রীড়া প্রতিযোগিতার উত্তেজনাপূর্ণ মুহূর্ত।",
    dataAiHint: "sports day"
  },
  {
    id: "6",
    title: "নবীন বরণ",
    thumbnail: "https://placehold.co/600x400.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "নতুন শিক্ষার্থীদের বরণ করে নেওয়ার আনন্দঘন মুহূর্ত।",
    dataAiHint: "student reception"
  },
];


export async function getVideos(): Promise<Video[]> {
    // In a real app, you would fetch this from a database
    return Promise.resolve(mockVideos);
}

export async function getVideoById(id: string): Promise<Video | null> {
    // In a real app, you would fetch this from a database
    const video = mockVideos.find(v => v.id === id) || null;
    return Promise.resolve(video);
}
