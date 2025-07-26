
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkForm } from "@/components/admin/important-links/link-form";

export default function NewLinkPage({ searchParams }: { searchParams: { groupId: string }}) {
  const groupId = parseInt(searchParams.groupId, 10);
  
  if (isNaN(groupId)) {
      return <p>Invalid Group ID</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>নতুন লিংক যোগ করুন</CardTitle>
      </CardHeader>
      <CardContent>
        <LinkForm groupId={groupId} />
      </CardContent>
    </Card>
  );
}
