
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStaff } from "@/lib/staff-data";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import StaffTable from "@/components/admin/staff/staff-table";

export default async function AdminStaffPage() {
  const staff = await getStaff();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>কর্মচারী ব্যবস্থাপনা</CardTitle>
        <Button asChild>
          <Link href="/admin/staff/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            নতুন কর্মচারী যোগ করুন
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <StaffTable staff={staff} />
      </CardContent>
    </Card>
  );
}
