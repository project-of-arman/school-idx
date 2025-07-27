
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StaffForm } from "@/components/admin/staff/staff-form";
import { getStaffById } from "@/lib/staff-data";
import { notFound } from "next/navigation";

export default async function EditStaffPage({ params }: { params: { id: string } }) {
  const staffMember = await getStaffById(params.id);

  if (!staffMember) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>কর্মচারীর তথ্য সম্পাদনা করুন</CardTitle>
      </CardHeader>
      <CardContent>
        <StaffForm staff={staffMember} />
      </CardContent>
    </Card>
  );
}
