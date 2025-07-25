
import { getTeachers } from "@/lib/teacher-data";
import StaffList from "./staff-list";

export default async function StaffPage() {
  const teachers = await getTeachers();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">শিক্ষক ও কর্মচারী</h1>
          <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠানের নিবেদিতপ্রাণ শিক্ষক এবং কর্মচারীবৃন্দ</p>
        </div>
        <StaffList teachers={teachers} />
      </div>
    </div>
  );
}
