import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNotices, Notice } from "@/lib/notice-data";
import { Bell } from "lucide-react";
import Link from "next/link";

const NoticeItem = ({ notice }: { notice: Notice }) => (
    <li className="p-4 flex items-start gap-4 border-b last:border-b-0">
        <div className="flex-shrink-0 bg-primary/10 text-primary p-2 rounded-full mt-1">
            <Bell className="h-5 w-5" />
        </div>
        <div className="flex-grow">
            <Link href={`/notice/${notice.id}`} className="font-semibold text-foreground hover:text-primary transition-colors block" target="_blank" rel="noopener noreferrer">
                {notice.title}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{notice.date}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{notice.description}</p>
        </div>
    </li>
);


export default async function NotificationsPage() {
  const marqueeNotices = await getNotices({ is_marquee: true });

  return (
    <Card>
      <CardHeader>
        <CardTitle>জরুরী ঘোষণা</CardTitle>
      </CardHeader>
      <CardContent>
        {marqueeNotices.length > 0 ? (
            <ul className="divide-y divide-border -m-6">
                {marqueeNotices.map((notice) => (
                    <NoticeItem key={notice.id} notice={notice} />
                ))}
            </ul>
        ) : (
            <p className="text-muted-foreground text-center py-8">কোনো নতুন ঘোষণা নেই।</p>
        )}
      </CardContent>
    </Card>
  );
}
