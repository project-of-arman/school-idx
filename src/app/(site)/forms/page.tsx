
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download, FilePenLine } from 'lucide-react';
import Link from "next/link";

const formsData = [
  { name: "ভর্তি ফরম (অফলাইন)", fileUrl: "#", isDownload: true },
  { name: "অনলাইন ভর্তি আবেদন", href: "/forms/admission-apply", isDownload: false },
  { name: "ছাড়পত্র আবেদন", href: "/forms/transfer-certificate-apply", isDownload: false },
  { name: "প্রশংসাপত্র আবেদন ফরম", fileUrl: "#", isDownload: true },
  { name: "অনুপস্থিতির ছুটির আবেদন ফরম", fileUrl: "#", isDownload: true },
  { name: "লাইব্রেরী কার্ড আবেদন ফরম", fileUrl: "#", isDownload: true },
  { name: "অভিভাবকের সম্মতিপত্র ফরম", fileUrl: "#", isDownload: true },
  { name: "বিষয় পরিবর্তনের আবেদন ফরম", fileUrl: "#", isDownload: true },
  { name: "উপবৃত্তি আবেদন ফরম", fileUrl: "#", isDownload: true },
];

export default function FormsPage() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">সকল ফরমস</h1>
          <p className="text-muted-foreground mt-2">প্রয়োজনীয় ফরমসমূহ এখান থেকে ডাউনলোড করুন অথবা অনলাইনে আবেদন করুন</p>
        </div>

        <Card className="shadow-lg border-primary/20">
            <CardHeader>
                <CardTitle className="text-2xl text-primary font-headline text-center">ফরম তালিকা</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table className="border">
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[100px] font-bold">ক্রমিক নং</TableHead>
                                <TableHead className="font-bold">ফরমের নাম</TableHead>
                                <TableHead className="text-right font-bold">অ্যাকশন</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formsData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-right">
                                        {item.isDownload ? (
                                            <Button asChild variant="outline" size="sm">
                                                <a href={item.fileUrl} download>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    ডাউনলোড
                                                </a>
                                            </Button>
                                        ) : (
                                            <Button asChild variant="default" size="sm">
                                                <Link href={item.href!}>
                                                    <FilePenLine className="mr-2 h-4 w-4" />
                                                    আবেদন করুন
                                                </Link>
                                            </Button>
                                        )}
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
