
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Phone, Calendar, ListChecks, Pencil, FileSignature, Banknote, UserCheck } from 'lucide-react';

const admissionGuidelines = [
    {
        title: "ভর্তির যোগ্যতা",
        icon: UserCheck,
        content: "ষষ্ঠ থেকে নবম শ্রেণীতে ভর্তির জন্য আবেদন করা যাবে। আবেদনকারীকে অবশ্যই পূর্ববর্তী শ্রেণীর বার্ষিক পরীক্ষায় উত্তীর্ণ হতে হবে।"
    },
    {
        title: "আবেদন প্রক্রিয়া",
        icon: FileSignature,
        content: "অফিস থেকে আবেদন ফরম সংগ্রহ করে অথবা ওয়েবসাইট থেকে ডাউনলোড করে পূরণকৃত ফরম প্রয়োজনীয় কাগজপত্রসহ অফিসে জমা দিতে হবে। অনলাইনেও আবেদন করার সুযোগ রয়েছে।"
    },
    {
        title: "প্রয়োজনীয় কাগজপত্র",
        icon: ListChecks,
        content: "<ul><li>পূর্ববর্তী শ্রেণীর পরীক্ষার মার্কশিট/প্রশংসাপত্রের সত্যায়িত কপি।</li><li>শিক্ষার্থীর জন্ম নিবন্ধনের সত্যায়িত কপি।</li><li>পিতা-মাতার জাতীয় পরিচয়পত্রের সত্যায়িত কপি।</li><li>২ কপি পাসপোর্ট সাইজের রঙিন ছবি।</li></ul>"
    },
    {
        title: "ভর্তি পরীক্ষা",
        icon: Pencil,
        content: "ভর্তি পরীক্ষা বাংলা, ইংরেজি, গণিত এবং সাধারণ জ্ঞান বিষয়ের উপর অনুষ্ঠিত হবে। পরীক্ষার পূর্ণমান ১০০ এবং সময় ২ ঘণ্টা।"
    },
    {
        title: "ভর্তি ফি ও বেতন",
        icon: Banknote,
        content: "ভর্তি সংক্রান্ত সকল ফি অফিসে সরাসরি অথবা指定 ব্যাংক একাউন্টের মাধ্যমে জমা দেওয়া যাবে। বিস্তারিত তথ্যের জন্য অফিসিয়াল নোটিশ দেখুন।"
    }
]

export default function AdmissionGuidelinesPage() {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">ভর্তি নির্দেশিকা</h1>
          <p className="text-muted-foreground mt-2">২০২৪-২০২৫ শিক্ষাবর্ষে ভর্তির জন্য বিস্তারিত তথ্য</p>
        </div>

        <Card className="shadow-lg border-primary/20 mb-12">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                        <Calendar className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl text-primary font-headline">গুরুত্বপূর্ণ তারিখ ও সময়</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3"><span className="font-semibold text-foreground w-40">আবেদন ফরম বিতরণ শুরু:</span><span>০১ নভেম্বর, ২০২৪</span></li>
                    <li className="flex items-center gap-3"><span className="font-semibold text-foreground w-40">আবেদন ফরম জমার শেষ তারিখ:</span><span>৩০ নভেম্বর, ২০২৪</span></li>
                    <li className="flex items-center gap-3"><span className="font-semibold text-foreground w-40">ভর্তি পরীক্ষার তারিখ:</span><span>১০ ডিসেম্বর, ২০২৪ (সকাল ১০টা)</span></li>
                    <li className="flex items-center gap-3"><span className="font-semibold text-foreground w-40">ফলাফল প্রকাশ:</span><span>১৫ ডিসেম্বর, ২০২৪</span></li>
                    <li className="flex items-center gap-3"><span className="font-semibold text-foreground w-40">ভর্তির তারিখ:</span><span>২০ থেকে ৩০ ডিসেম্বর, ২০২৪</span></li>
                </ul>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-2xl font-bold text-primary mb-6 text-center font-headline">আবেদন প্রক্রিয়া ও নিয়মাবলী</h2>
            <Accordion type="single" collapsible className="w-full">
                {admissionGuidelines.map((item, index) => (
                    <AccordionItem value={`item-${index+1}`} key={index}>
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                            <div className="flex items-center gap-3">
                                <item.icon className="h-6 w-6 text-primary" />
                                <span>{item.title}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-12 text-base text-muted-foreground leading-relaxed">
                            {
                                item.title === "প্রয়োজনীয় কাগজপত্র" ? 
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>পূর্ববর্তী শ্রেণীর পরীক্ষার মার্কশিট/প্রশংসাপত্রের সত্যায়িত কপি।</li>
                                    <li>শিক্ষার্থীর জন্ম নিবন্ধনের সত্যায়িত কপি।</li>
                                    <li>পিতা-মাতার জাতীয় পরিচয়পত্রের সত্যায়িত কপি।</li>
                                    <li>২ কপি পাসপোর্ট সাইজের রঙিন ছবি।</li>
                                </ul>
                                : <p>{item.content}</p>
                            }
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

        <div className="mt-12 text-center space-y-6">
            <div>
                 <Button size="lg" asChild>
                    <a href="#" download>
                        <Download className="mr-2 h-5 w-5" />
                        ভর্তি ফরম ডাউনলোড করুন
                    </a>
                </Button>
            </div>
            <Card className="max-w-md mx-auto bg-primary/5 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">সাহায্যের জন্য যোগাযোগ করুন</h3>
                <p className="text-muted-foreground">ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য যোগাযোগ করুন:</p>
                <div className="flex items-center justify-center gap-2 mt-4 text-foreground font-semibold">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
