import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";

const notices = [
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
  {
    id: 6,
    title: "ডিবেটিং ক্লাব সদস্য আহ্বান",
    date: "০২ জুলাই, ২০২৪",
    fileUrl: "#",
    description: "আমাদের স্কুলের ডিবেটিং ক্লাবের নতুন সদস্য আহ্বান করা হচ্ছে। আগ্রহী শিক্ষার্থীদের যোগাযোগ করার জন্য বলা হলো।"
  },
  {
    id: 7,
    title: "ঈদুল আযহা উপলক্ষে ছুটি",
    date: "২৮ জুন, ২০২৪",
    fileUrl: "#",
    description: "পবিত্র ঈদুল আযহা উপলক্ষে আগামী ৩০শে জুন থেকে ৫ই জুলাই পর্যন্ত স্কুল বন্ধ থাকবে।"
  },
  {
    id: 8,
    title: "কলেজ ইউনিফর্ম সংক্রান্ত বিজ্ঞপ্তি",
    date: "২৫ জুন, ২০২৪",
    fileUrl: "#",
    description: "সকল শিক্ষার্থীদের নতুন শিক্ষাবর্ষ থেকে নির্ধারিত ইউনিফর্ম পরিধান করার জন্য নির্দেশ দেওয়া হচ্ছে।"
  },
  {
    id: 9,
    title: "শিক্ষক-অভিভাবক সভা",
    date: "২০ জুন, ২০২৪",
    fileUrl: "#",
    description: "শিক্ষার্থীদের সার্বিক অবস্থা পর্যালোচনার জন্য একটি শিক্ষক-অভিভাবক সভা অনুষ্ঠিত হবে।"
  },
  {
    id: 10,
    title: "আন্তঃস্কুল ফুটবল টুর্নামেন্ট",
    date: "১৫ জুন, ২০২৪",
    fileUrl: "#",
    description: "আন্তঃস্কুল ফুটবল টুর্নামেন্টে অংশগ্রহণের জন্য আগ্রহী খেলোয়াড়দের নাম জমা দেওয়ার অনুরোধ করা হচ্ছে।"
  }
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
          {notices.slice(0, 5).map((notice) => (
            <li key={notice.id} className="p-2 flex items-center gap-4 hover:bg-muted/50 transition-colors">
              <NoticeDate date={notice.date} />
              <div className="flex-grow overflow-hidden">
                <Link href={`/notice/${notice.id}`} className="font-medium text-foreground  leading-snug hover:text-primary transition-colors block">{notice.title}
                <p className="text-xs whitespace-nowrap text-muted-foreground  mt-1">{notice.description}</p>
                </Link>
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
       <div className="p-4 border-t">
          <Button variant="link" className="w-full" asChild>
            <Link href="/notice">সকল নোটিশ দেখুন</Link>
          </Button>
        </div>
    </Card>
  );
}
