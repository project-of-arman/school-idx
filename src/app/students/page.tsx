"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const allStudents = [
  { roll: 101, name: "আরিফ হোসেন", class: "১০ম", gender: "ছেলে" },
  { roll: 102, name: "সুমি আক্তার", class: "১০ম", gender: "মেয়ে" },
  { roll: 201, name: "জাহিদ হাসান", class: "৯ম", gender: "ছেলে" },
  { roll: 202, name: "রিয়া চৌধুরী", class: "৯ম", gender: "মেয়ে" },
  { roll: 301, name: "সাইফুল ইসলাম", class: "৮ম", gender: "ছেলে" },
  { roll: 302, name: "নাবিলা রহমান", class: "৮ম", gender: "মেয়ে" },
  { roll: 103, name: "করিম শেখ", class: "১০ম", gender: "ছেলে" },
  { roll: 203, name: "সানিয়া কবির", class: "৯ম", gender: "মেয়ে" },
  { roll: 303, name: "ইমরান খান", class: "৮ম", gender: "ছেলে" },
];

export default function StudentsPage() {
  const [classFilter, setClassFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = useMemo(() => {
    return allStudents.filter(student => 
      (classFilter === "all" || student.class === classFilter) &&
      (genderFilter === "all" || student.gender === genderFilter) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [classFilter, genderFilter, searchTerm]);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">আমাদের শিক্ষার্থী</h1>
          <p className="text-muted-foreground mt-2">প্রতিষ্ঠানের সকল শিক্ষার্থীদের তালিকা</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ফিল্টার</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              <Input 
                placeholder="নাম দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সকল শ্রেণী</SelectItem>
                  <SelectItem value="১০ম">১০ম শ্রেণী</SelectItem>
                  <SelectItem value="৯ম">৯ম শ্রেণী</SelectItem>
                  <SelectItem value="৮ম">৮ম শ্রেণী</SelectItem>
                </SelectContent>
              </Select>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="লিঙ্গ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সকল</SelectItem>
                  <SelectItem value="ছেলে">ছেলে</SelectItem>
                  <SelectItem value="মেয়ে">মেয়ে</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>রোল নং</TableHead>
                  <TableHead>নাম</TableHead>
                  <TableHead>শ্রেণী</TableHead>
                  <TableHead>লিঙ্গ</TableHead>
                  <TableHead>অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.roll}>
                      <TableCell>{student.roll}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>
                        <Button asChild variant="link">
                            <Link href={`/students/${student.roll}`}>বিস্তারিত</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      কোনো শিক্ষার্থী পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
