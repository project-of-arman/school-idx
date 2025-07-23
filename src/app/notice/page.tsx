"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bell } from 'lucide-react';

const allNotices = [
    {
    id: 1,
    title: "ভর্তি পরীক্ষার ফলাফল প্রকাশ",
    date: "২০ জুলাই, ২০২৪",
    fileUrl: "#",
    description: "২০২৪-২৫ শিক্ষাবর্ষের ভর্তি পরীক্ষার ফলাফল প্রকাশিত হয়েছে। উত্তীর্ণ শিক্ষার্থীদের তালিকা এবং ভর্তির পরবর্তী নির্দেশনা জানতে পারবেন συνημμένο ফাইল থেকে।"
  },
  {
    id: 2,
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতার সময়সূচী",
    date: "১৮ জুলাই, ২০২৪",
    fileUrl: "#",
    description: "প্রতিষ্ঠানের বার্ষিক ক্রীড়া প্রতিযোগিতা আগামী ২৫শে জুলাই অনুষ্ঠিত হবে। বিস্তারিত সময়সূচী জানতে পারবেন συνημμένο ফাইল থেকে।"
  },
  {
    id: 3,
    title: "অভিভাবক সমাবেশ সংক্রান্ত বিজ্ঞপ্তি",
    date: "১৫ জুলাই, ২০২৪",
    fileUrl: "#",
    description: "সকল শ্রেণীর শিক্ষার্থীদের অভিভাবকদের নিয়ে একটি গুরুত্বপূর্ণ সভা আগামী ২২শে জুলাই অনুষ্ঠিত হবে। আপনাদের উপস্থিতি একান্ত কাম্য।"
  },
  {
    id: 4,
    title: "গ্রীষ্মকালীন ছুটির নোটিশ",
    date: "১০ জুলাই, ২০২৪",
    fileUrl: "#",
    description: "আগামী ১লা আগস্ট থেকে ১৫ই আগস্ট পর্যন্ত গ্রীষ্মকালীন ছুটি উপলক্ষে প্রতিষ্ঠান বন্ধ থাকবে। ১৬ই আগস্ট থেকে যথারীতি ক্লাস চলবে।"
  },
    {
    id: 5,
    title: "বিজ্ঞান মেলার আয়োজন",
    date: "০৫ জুলাই, ২০২৪",
    fileUrl: "#",
    description: "আগামী ১০ই আগস্ট তারিখে বিদ্যালয়ে একটি বিজ্ঞান মেলার আয়োজন করা হয়েছে। আগ্রহী শিক্ষার্থীদের প্রকল্প জমা দেওয়ার জন্য অনুরোধ করা হলো।"
  },
];

const NOTICES_PER_PAGE = 5;

const NoticeDate = ({ date }: { date: string }) => {
    const parts = date.split(' ');
    if (parts.length < 2) return null;

    const day = parts[0].replace(',', '');
    const month = parts[1].replace(',', '');

    return (
        <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-md p-2 w-16 h-16 shrink-0 text-center">
            <span className="text-2xl font-bold leading-tight">{day}</span>
            <span className="text-xs font-medium uppercase tracking-wide">{month}</span>
        </div>
    )
}

export default function NoticeListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allNotices.length / NOTICES_PER_PAGE);

  const paginatedNotices = allNotices.slice(
    (currentPage - 1) * NOTICES_PER_PAGE,
    currentPage * NOTICES_PER_PAGE
  );

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white py-16">
        <div className="container mx-auto px-4">
             <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary font-headline">নোটিশ বোর্ড</h1>
              <p className="text-muted-foreground mt-2">প্রতিষ্ঠানের সকল নোটিশসমূহ</p>
            </div>
            <Card className="shadow-lg border-primary/20">
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {paginatedNotices.map((notice) => (
                    <li key={notice.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                      <NoticeDate date={notice.date} />
                      <div className="flex-grow">
                        <Link href={`/notice/${notice.id}`} className="font-medium text-foreground leading-snug hover:text-primary transition-colors block">{notice.title}</Link>
                        <p className="text-xs text-muted-foreground mt-1">{notice.date}</p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/notice/${notice.id}`}>
                          <ArrowRight className="h-5 w-5 text-primary/80" />
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
               {totalPages > 1 && (
                <CardFooter className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    পৃষ্ঠা {currentPage} এর {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      পূর্ববর্তী
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      পরবর্তী
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
        </div>
    </div>
  );
}
