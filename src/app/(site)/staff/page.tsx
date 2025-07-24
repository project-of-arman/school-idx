import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

const staff = [
  {
    name: "মোঃ আব্দুল্লাহ আল-আমিন",
    role: "প্রধান শিক্ষক",
    image: "https://placehold.co/300x400.png",
    address: "ঢাকা, বাংলাদেশ",
    phone: "01700000000",
    email: "headmaster@shikkhaangan.edu",
    dataAiHint: "male teacher portrait"
  },
  {
    name: "ফাতেমা আক্তার",
    role: "সহকারী প্রধান শিক্ষক",
    image: "https://placehold.co/300x400.png",
    address: "ঢাকা, বাংলাদেশ",
    phone: "01800000000",
    email: "asst.head@shikkhaangan.edu",
    dataAiHint: "female teacher portrait"
  },
  {
    name: "রহিম উদ্দিন আহমেদ",
    role: "সিনিয়র শিক্ষক (গণিত)",
    image: "https://placehold.co/300x400.png",
    address: "ঢাকা, বাংলাদেশ",
    phone: "01900000000",
    email: "rahim.math@shikkhaangan.edu",
    dataAiHint: "male teacher portrait"
  },
  {
    name: "সালমা চৌধুরী",
    role: "সিনিয়র শিক্ষক (বিজ্ঞান)",
    image: "https://placehold.co/300x400.png",
    address: "ঢাকা, বাংলাদেশ",
    phone: "01600000000",
    email: "salma.sci@shikkhaangan.edu",
    dataAiHint: "female teacher portrait"
  },
  {
    name: "কামরুল হাসান",
    role: "সহকারী শিক্ষক (ইংরেজি)",
    image: "https://placehold.co/300x400.png",
    address: "ঢাকা, বাংলাদেশ",
    phone: "01500000000",
    email: "kamrul.eng@shikkhaangan.edu",
    dataAiHint: "male teacher portrait"
  },
  {
    name: "আয়েশা সিদ্দিকা",
    role: "সহকারী শিক্ষক (বাংলা)",
    image: "https://placehold.co/300x400.png",
    address: "ঢাকা, বাংলাদেশ",
    phone: "01300000000",
    email: "ayesha.ban@shikkhaangan.edu",
    dataAiHint: "female teacher portrait"
  },
  {
    name: "আরিফুল ইসলাম",
    role: "অফিস সহকারী",
    image: "https://placehold.co/300x400.png",
    address: "ঢাকা, বাংলাদেশ",
    phone: "01400000000",
    email: "arif.office@shikkhaangan.edu",
    dataAiHint: "male staff portrait"
  },
];

export default function StaffPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">শিক্ষক ও কর্মচারী</h1>
          <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠানের নিবেদিতপ্রাণ শিক্ষক এবং কর্মচারীবৃন্দ</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staff.map((person, index) => (
            <Card key={index} className="overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    data-ai-hint={person.dataAiHint}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary">{person.name}</h3>
                  <p className="text-sm text-accent-foreground font-medium mb-4">{person.role}</p>
                  <div className="space-y-2 text-left text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{person.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0" />
                        <a href={`tel:${person.phone}`} className="hover:text-primary">{person.phone}</a>
                    </div>
                     <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 shrink-0" />
                        <a href={`mailto:${person.email}`} className="hover:text-primary truncate">{person.email}</a>
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
