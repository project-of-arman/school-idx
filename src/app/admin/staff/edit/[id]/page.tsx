
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StaffForm } from "@/components/admin/staff/staff-form";
import { getStaffById } from "@/lib/staff-data";
import { notFound } from "next/navigation";

export default async function EditStaffPage({ params }: { params: { id: string } }) {
  const staff = await getStaffById(params.id);

  if (!staff) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>কর্মচারীর তথ্য সম্পাদনা করুন</CardTitle>
      </CardHeader>
      <CardContent>
        <StaffForm staff={staff} />
      </CardContent>
    </Card>
  );
}
