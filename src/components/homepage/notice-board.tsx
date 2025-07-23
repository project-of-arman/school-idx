import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Bell } from "lucide-react";
import Link from "next/link";

const notices = [
  {
    id: 1,
    title: "ভর্তি পরীক্ষার ফলাফল প্রকাশ",
    date: "২০ জুলাই, ২০২৪",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতার সময়সূচী",
    date: "১৮ জুলাই, ২০২৪",
    fileUrl: "#",
  },
  {
    id: 3,
    title: "অভিভাবক সমাবেশ সংক্রান্ত বিজ্ঞপ্তি",
    date: "১৫ জুলাই, ২০২৪",
    fileUrl: "#",
  },
  {
    id: 4,
    title: "গ্রীষ্মকালীন ছুটির নোটিশ",
    date: "১০ জুলাই, ২০২৪",
    fileUrl: "#",
  },
    {
    id: 5,
    title: "বিজ্ঞান মেলার আয়োজন",
    date: "০৫ জুলাই, ২০২৪",
    fileUrl: "#",
  },
];

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

export default function NoticeBoard() {
  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Bell className="h-6 w-6" />
          <span>নোটিশ বোর্ড</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {notices.map((notice) => (
            <li key={notice.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
              <NoticeDate date={notice.date} />
              <div className="flex-grow">
                <p className="font-medium text-foreground leading-snug">{notice.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{notice.date}</p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <a href={notice.fileUrl} download>
                  <Download className="h-5 w-5 text-primary/80" />
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
       <div className="p-4 border-t">
          <Button variant="link" className="w-full" asChild>
            <Link href="#">সকল নোটিশ দেখুন</Link>
          </Button>
        </div>
    </Card>
  );
}
