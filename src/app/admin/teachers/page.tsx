
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTeachers } from "@/lib/teacher-data";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import TeacherTable from "@/components/admin/teachers/teacher-table";

export default async function AdminTeachersPage() {
  const teachers = await getTeachers();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>শিক্ষক ব্যবস্থাপনা</CardTitle>
        <Button asChild>
          <Link href="/admin/teachers/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            নতুন শিক্ষক যোগ করুন
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <TeacherTable teachers={teachers} />
      </CardContent>
    </Card>
  );
}
