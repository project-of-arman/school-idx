
"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash, Edit, Eye } from "lucide-react";
import { StudentForAdmin, deleteStudent } from "@/lib/student-data";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const STUDENTS_PER_PAGE = 10;

export default function StudentTable({ students }: { students: StudentForAdmin[] }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentForAdmin | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);

  const paginatedStudents = useMemo(() => {
    return filteredStudents.slice(
        (currentPage - 1) * STUDENTS_PER_PAGE,
        currentPage * STUDENTS_PER_PAGE
    );
  }, [filteredStudents, currentPage]);


  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDeleteClick = (student: StudentForAdmin) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedStudent) {
      const result = await deleteStudent(selectedStudent.id);
      if (result.success) {
        toast({
          title: "শিক্ষার্থী মোছা হয়েছে",
          description: `"${selectedStudent.name}" সফলভাবে মুছে ফেলা হয়েছে।`,
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: result.error,
          variant: "destructive",
        });
      }
      setIsDeleteDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Input 
            placeholder="নাম বা রোল দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
        />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ছবি</TableHead>
              <TableHead>নাম</TableHead>
              <TableHead>রোল</TableHead>
              <TableHead>শ্রেণী</TableHead>
              <TableHead>বছর</TableHead>
              <TableHead className="w-[100px] text-right">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.length > 0 ? paginatedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                    <Image 
                        src={student.image || "https://placehold.co/40x40.png"}
                        alt={student.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.roll}</TableCell>
                <TableCell>{student.class_name}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">মেনু খুলুন</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/students/${student.roll}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          দেখুন
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/students/edit/${student.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          সম্পাদনা
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => handleDeleteClick(student)}
                        className="text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        মুছুন
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  কোনো শিক্ষার্থী পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <CardFooter className="flex items-center justify-between pt-4 px-0">
          <span className="text-sm text-muted-foreground">
            পৃষ্ঠা {currentPage} এর {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              পূর্ববর্তী
            </Button>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              পরবর্তী
            </Button>
          </div>
        </CardFooter>
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
            <AlertDialogDescription>
              এই শিক্ষার্থীর তথ্য স্থায়ীভাবে মুছে ফেলা হবে। এই কাজটি আর ফেরানো
              যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
