import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Users, History, Award, Building } from "lucide-react";
import ImageGallery from "@/components/school-details/image-gallery";
import TeachersSection from "@/components/school-details/teachers-section";
import VideoGallery from "@/components/homepage/video-gallery";

const features = [
    {
        icon: History,
        title: "আমাদের ইতিহাস",
        description: "মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় প্রতিষ্ঠিত হয়েছিল ১৯৯০ সালে। প্রতিষ্ঠার পর থেকে আমরা জ্ঞানের আলো ছড়িয়ে যাচ্ছি এবং হাজারো শিক্ষার্থীর भविष्य গড়ে তুলেছি। আমাদের রয়েছে দীর্ঘদিনের গৌরবময় ইতিহাস।"
    },
    {
        icon: Target,
        title: "আমাদের লক্ষ্য ও উদ্দেশ্য",
        description: "আমাদের মূল লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধে উদ্বুদ্ধ করে একজন আদর্শ নাগরিক হিসেবে গড়ে তোলা। আমরা সৃজনশীলতা ও মননশীলতার বিকাশে বিশ্বাসী।"
    },
    {
        icon: BookOpen,
        title: "একাডেমিক কার্যক্রম",
        description: "আমরা জাতীয় শিক্ষাক্রম অনুসরণ করে থাকি। প্রাথমিক থেকে উচ্চ মাধ্যমিক পর্যন্ত আমাদের শিক্ষা কার্যক্রম পরিচালিত হয়। সহশিক্ষা কার্যক্রমের অংশ হিসেবে রয়েছে বিতর্ক, খেলাধুলা, এবং সাংস্কৃতিক চর্চা।"
    },
    {
        icon: Users,
        title: "অভিজ্ঞ শিক্ষক মণ্ডলী",
        description: "আমাদের প্রতিষ্ঠানে রয়েছেন একদল অভিজ্ঞ, প্রশিক্ষণপ্রাপ্ত এবং নিবেদিতপ্রাণ শিক্ষক। তারা শিক্ষার্থীদের সঠিক পথপ্রদর্শক হিসেবে কাজ করেন।"
    },
    {
        icon: Building,
        title: "অবকাঠামো",
        description: "আমাদের রয়েছে একটি সুবিশাল ক্যাম্পাস, আধুনিক শ্রেণীকক্ষ, সমৃদ্ধ লাইব্রেরি, বিজ্ঞানাগার এবং খেলার মাঠ। শিক্ষার্থীদের জন্য সকল সুযোগ-সুবিধা নিশ্চিত করা হয়েছে।"
    },
    {
        icon: Award,
        title: "অর্জনসমূহ",
        description: "বিগত বছরগুলোতে আমাদের শিক্ষার্থীরা বিভিন্ন জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণ করে অসংখ্য পুরস্কার অর্জন করেছে, যা আমাদের জন্য অত্যন্ত গৌরবের।"
    }
]

export default function SchoolDetailsPage() {
  return (
    <div className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 space-y-24">
             <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary font-headline">স্কুল সম্পর্কিত বিস্তারিত</h1>
              <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠান সম্পর্কে আরো জানুন</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-5/12 relative">
                    <div className="absolute -top-4 -left-4 w-full h-full border-4 border-accent rounded-lg transform -rotate-2"></div>
                    <Card className="overflow-hidden shadow-lg relative rounded-lg">
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
                <div className="w-full md:w-7/12">
                    <h2 className="text-3xl font-bold text-primary mb-4 font-headline">মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়: একটি আদর্শ বিদ্যাপীঠ</h2>
                    <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                    মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা। একটি অভিজ্ঞ শিক্ষক মণ্ডলী, আধুনিক শ্রেণীকক্ষ এবং সমৃদ্ধ লাইব্রেরি নিয়ে আমাদের পথচলা। আমরা বিশ্বাস করি, সঠিক পরিচর্যা এবং অনুকূল পরিবেশ পেলে প্রতিটি শিক্ষার্থীই তার সুপ্ত প্রতিভা বিকশিত করতে পারে।
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="p-6 text-center shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                            <div className="flex-shrink-0 bg-primary/10 text-primary p-4 rounded-full">
                                <feature.icon className="h-8 w-8" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </Card>
                ))}
            </div>

            <ImageGallery />
            <TeachersSection />
            <VideoGallery />

        </div>
    </div>
  );
}
