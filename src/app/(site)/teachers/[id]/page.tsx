
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { teachers } from "@/lib/teacher-data";


export default function TeacherDetailsPage({ params }: { params: { id: string } }) {
  const teacher = teachers.find(s => s.id === params.id);

  if (!teacher) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">শিক্ষক পাওয়া যায়নি।</h1>
        <Button asChild className="mt-4">
          <Link href="/staff">
            <ArrowLeft className="mr-2 h-4 w-4" />
            সকল শিক্ষক দেখুন
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
        <div className="container mx-auto px-4">
            <div className="mb-8">
                <Button asChild variant="outline">
                  <Link href="/staff">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    তালিকায় ফিরে যান
                  </Link>
                </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <Card className="overflow-hidden shadow-lg">
                        <div className="relative aspect-[3/4]">
                            <Image src={teacher.image} alt={teacher.name} fill className="object-cover" data-ai-hint={teacher.dataAiHint} />
                        </div>
                    </Card>
                </div>
                <div className="w-full md:w-2/3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-primary font-headline">{teacher.name}</CardTitle>
                            <p className="text-muted-foreground">{teacher.role}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <a href={`mailto:${teacher.email}`} className="text-muted-foreground hover:text-primary">{teacher.email}</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <a href={`tel:${teacher.phone}`} className="text-muted-foreground hover:text-primary">{teacher.phone}</a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                                <span className="text-muted-foreground">{teacher.address}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
