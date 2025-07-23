import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChairmanMessage() {
  return (
    <Card className="w-full shadow-lg border-primary/20 overflow-hidden">
      <CardHeader className="p-0">
        <div className="bg-primary text-primary-foreground p-3">
            <h2 className="text-lg font-bold">চেয়ারম্যান মহোদয়</h2>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <div className="flex justify-center">
            <Image
                src="https://placehold.co/300x400.png"
                alt="চেয়ারম্যান মহোদয়"
                width={300}
                height={400}
                className="object-cover rounded"
                data-ai-hint="male portrait"
            />
        </div>
        <p className="mt-4 font-semibold text-primary">প্রফেসর মোঃ তৌহিদুল ইসলাম</p>
      </CardContent>
    </Card>
  );
}
