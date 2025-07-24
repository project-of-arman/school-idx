
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const formsData = [
  { name: "ভর্তি ফরম", fileUrl: "#" },
  { name: "ছাড়পত্র আবেদন ফরম", fileUrl: "#" },
  { name: "প্রশংসাপত্র আবেদন ফরম", fileUrl: "#" },
  { name: "অনুপস্থিতির ছুটির আবেদন ফরম", fileUrl: "#" },
  { name: "লাইব্রেরী কার্ড আবেদন ফরম", fileUrl: "#" },
  { name: "অভিভাবকের সম্মতিপত্র ফরম", fileUrl: "#" },
  { name: "বিষয় পরিবর্তনের আবেদন ফরম", fileUrl: "#" },
  { name: "উপবৃত্তি আবেদন ফরম", fileUrl: "#" },
];

export default function FormsPage() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">সকল ফরমস</h1>
          <p className="text-muted-foreground mt-2">প্রয়োজনীয় ফরমসমূহ এখান থেকে ডাউনলোড করুন</p>
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
                                <TableHead className="text-right font-bold">ডাউনলোড</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formsData.map((item, index) => (
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
