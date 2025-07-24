
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const mpoData = [
  { name: "এমপিও নীতিমালা-২০২১", fileUrl: "#" },
  { name: "বেসরকারি শিক্ষা প্রতিষ্ঠানের জনবল কাঠামো ও এমপিও নীতিমালা-২০১৮", fileUrl: "#" },
  { name: "এমপিও আবেদন ফরম", fileUrl: "#" },
  { name: "জাতীয়করণকৃত কলেজ শিক্ষকদের বদলির আবেদন", fileUrl: "#" },
  { name: "জাতীয়করণকৃত শিক্ষকদের টাইমস্কেল সংক্রান্ত আবেদন", fileUrl: "#" },
];

export default function MpoNationalizationPage() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">এমপিও ও জাতীয়করণের তথ্য</h1>
          <p className="text-muted-foreground mt-2">এমপিও এবং জাতীয়করণ সংক্রান্ত প্রয়োজনীয় তথ্য ও ফরমসমূহ</p>
        </div>

        <Card className="shadow-lg border-primary/20">
            <CardHeader>
                <CardTitle className="text-2xl text-primary font-headline text-center">প্রয়োজনীয় তথ্য ও ফরম</CardTitle>
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
