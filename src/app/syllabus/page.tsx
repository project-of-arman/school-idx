
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const syllabusData = {
  "১০ম শ্রেণী": [
    { subject: "বাংলা ১ম পত্র", fileUrl: "#" },
    { subject: "বাংলা ২য় পত্র", fileUrl: "#" },
    { subject: "ইংরেজি ১ম পত্র", fileUrl: "#" },
    { subject: "ইংরেজি ২য় পত্র", fileUrl: "#" },
    { subject: "গণিত", fileUrl: "#" },
    { subject: "উচ্চতর গণিত", fileUrl: "#" },
    { subject: "পদার্থবিজ্ঞান", fileUrl: "#" },
    { subject: "রসায়ন", fileUrl: "#" },
    { subject: "জীববিজ্ঞান", fileUrl: "#" },
    { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", fileUrl: "#" },
    { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", fileUrl: "#" },
    { subject: "ধর্ম ও নৈতিক শিক্ষা", fileUrl: "#" },
  ],
  "৯ম শ্রেণী": [
    { subject: "বাংলা ১ম পত্র", fileUrl: "#" },
    { subject: "বাংলা ২য় পত্র", fileUrl: "#" },
    { subject: "ইংরেজি ১ম পত্র", fileUrl: "#" },
    { subject: "ইংরেজি ২য় পত্র", fileUrl: "#" },
    { subject: "গণিত", fileUrl: "#" },
    { subject: "উচ্চতর গণিত", fileUrl: "#" },
    { subject: "পদার্থবিজ্ঞান", fileUrl: "#" },
    { subject: "রসায়ন", fileUrl: "#" },
    { subject: "জীববিজ্ঞান", fileUrl: "#" },
    { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", fileUrl: "#" },
    { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", fileUrl: "#" },
    { subject: "ধর্ম ও নৈতিক শিক্ষা", fileUrl: "#" },
  ],
  "৮ম শ্রেণী": [
    { subject: "বাংলা ১ম পত্র", fileUrl: "#" },
    { subject: "বাংলা ২য় পত্র", fileUrl: "#" },
    { subject: "ইংরেজি ১ম পত্র", fileUrl: "#" },
    { subject: "ইংরেজি ২য় পত্র", fileUrl: "#" },
    { subject: "গণিত", fileUrl: "#" },
    { subject: "বিজ্ঞান", fileUrl: "#" },
    { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", fileUrl: "#" },
    { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", fileUrl: "#" },
    { subject: "ধর্ম ও নৈতিক শিক্ষা", fileUrl: "#" },
    { subject: "কৃষি শিক্ষা", fileUrl: "#" },
  ],
  "৭ম শ্রেণী": [
    { subject: "বাংলা ১ম পত্র", fileUrl: "#" },
    { subject: "বাংলা ২য় পত্র", fileUrl: "#" },
    { subject: "ইংরেজি ১ম পত্র", fileUrl: "#" },
    { subject: "ইংরেজি ২য় পত্র", fileUrl: "#" },
    { subject: "গণিত", fileUrl: "#" },
    { subject: "বিজ্ঞান", fileUrl: "#" },
    { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", fileUrl: "#" },
    { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", fileUrl: "#" },
    { subject: "ধর্ম ও নৈতিক শিক্ষা", fileUrl: "#" },
  ],
  "৬ষ্ঠ শ্রেণী": [
    { subject: "বাংলা", fileUrl: "#" },
    { subject: "ইংরেজি", fileUrl: "#" },
    { subject: "গণিত", fileUrl: "#" },
    { subject: "বিজ্ঞান", fileUrl: "#" },
    { subject: "ইতিহাস ও সামাজিক বিজ্ঞান", fileUrl: "#" },
    { subject: "ডিজিটাল প্রযুক্তি", fileUrl: "#" },
    { subject: "স্বাস্থ্য সুরক্ষা", fileUrl: "#" },
    { subject: "জীবন ও জীবিকা", fileUrl: "#" },
    { subject: "শিল্প ও সংস্কৃতি", fileUrl: "#" },
    { subject: "ইসলাম শিক্ষা", fileUrl: "#" },
  ],
};

const classes = Object.keys(syllabusData);

export default function SyllabusPage() {
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">সিলেবাস</h1>
          <p className="text-muted-foreground mt-2">আপনার শ্রেণীর সিলেবাস ডাউনলোড করুন</p>
        </div>

        <Card className="shadow-lg border-primary/20">
            <CardHeader>
                 <Tabs defaultValue={selectedClass} onValueChange={setSelectedClass} className="w-full">
                    <div className="flex justify-center mb-4">
                        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                        {classes.map((c) => (
                            <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
                        ))}
                        </TabsList>
                    </div>
                </Tabs>
                <CardTitle className="text-2xl text-primary font-headline text-center">{selectedClass} সিলেবাস</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table className="border">
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[100px] font-bold">ক্রমিক নং</TableHead>
                                <TableHead className="font-bold">বিষয়</TableHead>
                                <TableHead className="text-right font-bold">ডাউনলোড</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(syllabusData[selectedClass as keyof typeof syllabusData] || []).map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{item.subject}</TableCell>
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
