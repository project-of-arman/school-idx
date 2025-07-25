import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Users } from "lucide-react";
import Link from "next/link";
import { getAboutSchool, AboutSchoolInfo } from "@/lib/school-data";

async function AboutSchoolContent({ aboutInfo }: { aboutInfo: AboutSchoolInfo }) {
  return (
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="w-full md:w-5/12 relative">
        <div className="absolute -top-4 -left-4 w-full h-full border-4 border-accent rounded-lg transform -rotate-2"></div>
        <Card className="overflow-hidden shadow-lg relative rounded-lg">
          <Image
            src={aboutInfo.image_url}
            alt="School Building"
            width={400}
            height={500}
            className="object-cover w-full h-full"
            data-ai-hint="school building"
          />
        </Card>
      </div>
      <div className="w-full md:w-7/12">
        <h2 className="text-3xl font-bold text-primary mb-4 font-headline">{aboutInfo.title}</h2>
        <p className="text-muted-foreground mb-6 text-base leading-relaxed">
          {aboutInfo.description}
        </p>
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary/10 text-primary p-2 rounded-full">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">আধুনিক শিক্ষা</h3>
              <p className="text-muted-foreground text-sm">আমরা মানসম্মত এবং যুগোপযোগী শিক্ষা প্রদান করি।</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary/10 text-primary p-2 rounded-full">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">অভিজ্ঞ শিক্ষক</h3>
              <p className="text-muted-foreground text-sm">আমাদের রয়েছে একদল অভিজ্ঞ এবং নিবেদিতপ্রাণ শিক্ষক।</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary/10 text-primary p-2 rounded-full">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">মূল্যবোধ গঠন</h3>
              <p className="text-muted-foreground text-sm">শিক্ষার্থীদের মাঝে নৈতিক ও সামাজিক মূল্যবোধ তৈরিতে আমরা সচেষ্ট।</p>
            </div>
          </div>
        </div>
        <Button asChild>
          <Link href="/school-details">আরো জানুন</Link>
        </Button>
      </div>
    </div>
  );
}


export default async function AboutSchool() {
  const aboutInfo = await getAboutSchool();
  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <AboutSchoolContent aboutInfo={aboutInfo} />
      </div>
    </div>
  );
}
