
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { getTeachers, Teacher } from "@/lib/teacher-data";
import { useEffect, useState } from "react";

export default function StaffPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function fetchTeachers() {
      const fetchedTeachers = await getTeachers();
      setTeachers(fetchedTeachers);
    }
    fetchTeachers();
  }, []);


  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">শিক্ষক ও কর্মচারী</h1>
          <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠানের নিবেদিতপ্রাণ শিক্ষক এবং কর্মচারীবৃন্দ</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teachers.map((person) => (
            <Card key={person.id} className="overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 text-center h-full flex flex-col">
              <CardContent className="p-0 flex flex-col flex-grow">
                <Link href={`/teachers/${person.id}`} className="block relative aspect-[3/4]">
                  <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                      data-ai-hint={person.dataAiHint}
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-primary">
                    <Link href={`/teachers/${person.id}`}>{person.name}</Link>
                  </h3>
                  <p className="text-sm text-accent-foreground font-medium mb-4">{person.role}</p>
                  <div className="space-y-2 text-left text-sm text-muted-foreground mt-auto">
                      <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                          <span>{person.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 shrink-0" />
                           <a 
                              href={`tel:${person.phone}`} 
                              className="hover:text-primary z-10 relative"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {person.phone}
                            </a>
                      </div>
                      <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 shrink-0" />
                          <a 
                            href={`mailto:${person.email}`} 
                            className="hover:text-primary truncate z-10 relative"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {person.email}
                          </a>
                      </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
