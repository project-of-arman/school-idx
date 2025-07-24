import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { User, Shield, Briefcase } from "lucide-react";

const committeeMembers = [
  {
    name: "প্রফেসর ড. মোঃ আখতারুজ্জামান",
    role: "সভাপতি",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male portrait"
  },
  {
    name: "অধ্যক্ষ মোসাঃ হাসিনা পারভীন",
    role: "সদস্য সচিব",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "female portrait"
  },
  {
    name: "জনাব মোঃ আব্দুল্লাহ",
    role: "অভিভাবক সদস্য",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male portrait"
  },
  {
    name: "মিসেস ফরিদা ইয়াসমিন",
    role: "অভিভাবক সদস্য",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "female portrait"
  },
  {
    name: "জনাব মোঃ কামরুল হাসান",
    role: "শিক্ষক প্রতিনিধি",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male teacher portrait"
  },
  {
    name: "মিসেস সালমা চৌধুরী",
    role: "শিক্ষক প্রতিনিধি",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "female teacher portrait"
  },
  {
    name: "জেলা প্রশাসক, ঢাকা",
    role: "সদস্য",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "official portrait"
  },
   {
    name: "প্রধান শিক্ষক",
    role: "সদস্য",
    image: "https://placehold.co/300x400.png",
    dataAiHint: "male teacher portrait"
  },
];

export default function CommitteePage() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">পরিচালনা পর্ষদ</h1>
          <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠানের সম্মানিত পরিচালনা পর্ষদের সদস্যবৃন্দ</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {committeeMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    data-ai-hint={member.dataAiHint}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                  <p className="text-sm text-accent-foreground font-medium">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}