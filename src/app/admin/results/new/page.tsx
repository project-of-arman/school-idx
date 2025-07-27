
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function MovedPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>পেজটি সরানো হয়েছে</CardTitle>
      </CardHeader>
      <CardContent>
        <p>এই পেজটি <Link href="/admin/results/create" className="text-primary underline">/admin/results/create</Link> এ সরানো হয়েছে।</p>
      </CardContent>
    </Card>
  );
}
