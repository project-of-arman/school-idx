
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultForm } from "@/components/admin/results/result-form";
import { getStudentsForResults } from "@/lib/actions/results-actions";

export default async function CreateResultPage() {
  const students = await getStudentsForResults();
  return (
    <Card>
      <CardHeader>
        <CardTitle>নতুন ফলাফল যোগ করুন</CardTitle>
      </CardHeader>
      <CardContent>
        <ResultForm students={students} />
      </CardContent>
    </Card>
  );
}
