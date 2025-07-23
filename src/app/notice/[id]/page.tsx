import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft, Download, Calendar } from "lucide-react";

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


export default function NoticeDetailsPage({ params }: { params: { id: string } }) {
  const notice = allNotices.find(n => n.id.toString() === params.id);

  if (!notice) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">নোটিশ পাওয়া যায়নি।</h1>
        <Button asChild className="mt-4">
          <Link href="/notice">
            <ArrowLeft className="mr-2 h-4 w-4" />
            সকল নোটিশ দেখুন
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-8">
                <Button asChild variant="outline">
                  <Link href="/notice">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    তালিকায় ফিরে যান
                  </Link>
                </Button>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary font-headline">{notice.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground pt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{notice.date}</span>
                    </div>
                </CardHeader>
                <CardContent className="text-muted-foreground text-base leading-relaxed">
                   <p>{notice.description}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <a href={notice.fileUrl} download>
                            <Download className="mr-2 h-4 w-4" />
                            ডাউনলোড করুন
                        </a>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
