
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommitteeForm } from "@/components/admin/committee/committee-form";
import { getCommitteeMemberById } from "@/lib/committee-data";
import { notFound } from "next/navigation";

export default async function EditCommitteeMemberPage({ params }: { params: { id: string } }) {
  const member = await getCommitteeMemberById(params.id);

  if (!member) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>সদস্যের তথ্য সম্পাদনা করুন</CardTitle>
      </CardHeader>
      <CardContent>
        <CommitteeForm member={member} />
      </CardContent>
    </Card>
  );
}
