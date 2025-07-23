import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSchool() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="w-full md:w-1/3">
        <Card className="overflow-hidden shadow-lg">
          <Image
            src="https://placehold.co/400x500.png"
            alt="School Building"
            width={400}
            height={500}
            className="object-cover w-full h-full"
            data-ai-hint="school building"
          />
        </Card>
      </div>
      <div className="w-full md:w-2/3">
        <h2 className="text-3xl font-bold text-primary mb-4 font-headline">আমাদের সম্পর্কে</h2>
        <p className="text-muted-foreground mb-4">
          শিক্ষা অঙ্গন একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা।
        </p>
        <p className="text-muted-foreground">
          একটি অভিজ্ঞ শিক্ষক মণ্ডলী, আধুনিক শ্রেণীকক্ষ এবং সমৃদ্ধ লাইব্রেরি নিয়ে আমাদের পথচলা। আমরা বিশ্বাস করি, সঠিক পরিচর্যা এবং অনুকূল পরিবেশ পেলে প্রতিটি শিক্ষার্থীই তার সুপ্ত প্রতিভা বিকশিত করতে পারে।
        </p>
      </div>
    </div>
  );
}
