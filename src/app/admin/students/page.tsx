
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllStudentsForAdmin } from "@/lib/student-data";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import StudentTable from "@/components/admin/students/student-table";

export default async function AdminStudentsPage() {
  const students = await getAllStudentsForAdmin();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>শিক্ষার্থী ব্যবস্থাপনা</CardTitle>
        <Button asChild>
          <Link href="/admin/students/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            নতুন শিক্ষার্থী যোগ করুন
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <StudentTable students={students} />
      </CardContent>
    </Card>
  );
}
