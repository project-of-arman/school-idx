import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAboutSchool, getSchoolFeatures } from "@/lib/school-data";
import AboutSchoolForm from "@/components/admin/school-details/about-school-form";
import SchoolFeatures from "@/components/admin/school-details/school-features";

export default async function AdminSchoolDetailsPage() {
  const aboutInfo = await getAboutSchool();
  const features = await getSchoolFeatures();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>স্কুল সম্পর্কে তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <AboutSchoolForm content={aboutInfo} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>স্কুলের বৈশিষ্ট্য কার্ড</CardTitle>
        </CardHeader>
        <CardContent>
          <SchoolFeatures features={features} />
        </CardContent>
      </Card>
    </div>
  );
}
