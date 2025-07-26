
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeacherForm } from "@/components/admin/teachers/teacher-form";
import { getTeacherById } from "@/lib/teacher-data";
import { notFound } from "next/navigation";

export default async function EditTeacherPage({ params }: { params: { id: string } }) {
  const teacher = await getTeacherById(params.id);

  if (!teacher) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>শিক্ষকের তথ্য সম্পাদনা করুন</CardTitle>
      </CardHeader>
      <CardContent>
        <TeacherForm teacher={teacher} />
      </CardContent>
    </Card>
  );
}
