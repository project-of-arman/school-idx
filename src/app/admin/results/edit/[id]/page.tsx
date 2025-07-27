
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultForm } from "@/components/admin/results/result-form";
import { getResultByIdForAdmin, getStudentsForResults } from "@/lib/actions/results-actions";
import { notFound } from "next/navigation";

export default async function EditResultPage({ params }: { params: { id: string } }) {
  const [result, students] = await Promise.all([
    getResultByIdForAdmin(params.id),
    getStudentsForResults(),
  ]);

  if (!result) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ফলাফল সম্পাদনা করুন</CardTitle>
      </CardHeader>
      <CardContent>
        <ResultForm result={result} students={students} />
      </CardContent>
    </Card>
  );
}
