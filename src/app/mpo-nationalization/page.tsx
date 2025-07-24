
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download, BadgeCheck, Info, Gift, FileText, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mpoData = [
  { name: "এমপিও নীতিমালা-২০২১", fileUrl: "#" },
  { name: "বেসরকারি শিক্ষা প্রতিষ্ঠানের জনবল কাঠামো ও এমপিও নীতিমালা-২০১৮", fileUrl: "#" },
  { name: "এমপিও আবেদন ফরম", fileUrl: "#" },
  { name: "জাতীয়করণকৃত কলেজ শিক্ষকদের বদলির আবেদন", fileUrl: "#" },
  { name: "জাতীয়করণকৃত শিক্ষকদের টাইমস্কেল সংক্রান্ত আবেদন", fileUrl: "#" },
];

const mpoInfoSections = [
    {
        title: "এমপিও সংক্রান্ত সাধারণ তথ্য",
        icon: Info,
        content: "এখানে শিক্ষক-কর্মচারীর নাম, পদবি, প্রতিষ্ঠানের নাম, এমপিও আইডি, এমপিওভুক্তির স্তর (যেমন: প্রভাষক, সহকারী শিক্ষক), এমপিও ভুক্তির তারিখ ও সর্বশেষ অবস্থা সম্পর্কিত তথ্য থাকবে। ইএফটি (EFT) এর মাধ্যমে বেতন প্রাপ্তির তথ্যও এখানে অন্তর্ভুক্ত করা যেতে পারে।"
    },
    {
        title: "শিক্ষক-কর্মচারীদের সুযোগ-সুবিধা",
        icon: Gift,
        content: "এমপিওভুক্ত শিক্ষক-কর্মচারীদের বিভিন্ন সুযোগ-সুবিধা যেমন উৎসব ভাতা, বাড়িভাড়া, চিকিৎসা ভাতা, এবং পেনশন সংক্রান্ত বিস্তারিত তথ্য এখানে পাওয়া যাবে।"
    },
    {
        title: "জাতীয়করণ সংক্রান্ত তথ্য",
        icon: BadgeCheck,
        content: "জাতীয়করণের জন্য নির্বাচিত শিক্ষা প্রতিষ্ঠানের তালিকা, জাতীয়করণের সর্বশেষ অবস্থা (যেমন: প্রক্রিয়াধীন, অনুমোদিত), এবং জাতীয়করণ প্রক্রিয়ার বিস্তারিত দিকনির্দেশনা এখানে অন্তর্ভুক্ত থাকবে।"
    },
    {
        title: "প্রয়োজনীয় ফরম ও নির্দেশিকা",
        icon: FileText,
        content: "শিক্ষক-কর্মচারীদের জন্য প্রয়োজনীয় বিভিন্ন ফরম, আবেদনপত্র এবং সরকারের বিভিন্ন সময়ের ঘোষণা ও পরিপত্র এখানে পাওয়া যাবে।"
    }
]

export default function MpoNationalizationPage() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">এমপিও ও জাতীয়করণের তথ্য</h1>
          <p className="text-muted-foreground mt-2">এমপিও এবং জাতীয়করণ সংক্রান্ত প্রয়োজনীয় তথ্য ও ফরমসমূহ</p>
        </div>

        <Card className="shadow-lg border-primary/20 mb-12">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                        <BadgeCheck className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl text-primary font-headline">প্রতিষ্ঠানের এমপিওভুক্তি</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 text-muted-foreground">
                    <p className="text-lg">
                        আমাদের প্রতিষ্ঠানটি <span className="font-bold text-foreground">০১ জানুয়ারি, ১৯৯৫</span> তারিখে এমপিওভুক্ত হয়।
                    </p>
                </div>
            </CardContent>
        </Card>

        <div className="mb-12">
             <h2 className="text-2xl font-bold text-primary mb-6 text-center font-headline">বিস্তারিত তথ্যসমূহ</h2>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {mpoInfoSections.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                            <div className="flex items-center gap-3">
                                <item.icon className="h-6 w-6 text-primary" />
                                <span>{item.title}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-12 text-base text-muted-foreground leading-relaxed">
                           <p>{item.content}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>


        <Card className="shadow-lg border-primary/20">
            <CardHeader>
                <CardTitle className="text-2xl text-primary font-headline text-center">প্রয়োজনীয় ডকুমেন্ট ও ফরম</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table className="border">
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[100px] font-bold">ক্রমিক নং</TableHead>
                                <TableHead className="font-bold">বিষয়ের নাম</TableHead>
                                <TableHead className="text-right font-bold">ডাউনলোড</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mpoData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <a href={item.fileUrl} download>
                                                <Download className="mr-2 h-4 w-4" />
                                                ডাউনলোড
                                            </a>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
