import HeroCarousel from '@/components/homepage/hero-carousel';
import NoticeBoard from '@/components/homepage/notice-board';
import AboutSchool from '@/components/homepage/about-school';
import TeachersCarousel from '@/components/homepage/teachers-carousel';
import VideoGallery from '@/components/homepage/video-gallery';
import ImportantLinks from '@/components/homepage/important-links';
import ChairmanMessage from '@/components/homepage/chairman-message';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function SecretaryMessage() {
  return (
    <Card className="w-full shadow-lg border-primary/20 overflow-hidden">
      <CardHeader className="p-0">
        <div className="bg-primary text-primary-foreground p-3">
          <h2 className="text-lg font-bold">সচিব</h2>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <div className="flex justify-center">
          <Image
            src="https://dinajpureducationboard.portal.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/npfblock//Prof.%20Noor%20Md.%20Abdur%20Razzaque..jpeg"
            alt="সচিব"
            width={300}
            height={400}
            className="object-cover rounded"
            data-ai-hint="male portrait"
          />
        </div>
        <p className="mt-4 font-semibold text-primary">প্রফেসর নূর মোঃ আব্দুর রাজ্জাক</p>
      </CardContent>
    </Card>
  );
}


export default function Home() {
  return (
    <>
      <div className="relative">
        <HeroCarousel />
        <div className="absolute bottom-0 left-0 right-0 py-8 z-10">
            <div className="container mx-auto px-4">
            <div className="flex items-center justify-start gap-4 text-left">
                <Image
                src="https://placehold.co/80x80.png"
                alt="School Logo"
                width={80}
                height={80}
                data-ai-hint="school logo"
                className="rounded-full"
                />
                <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-headline">মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়</h1>
                <p className="text-white/80 mt-1 text-base md:text-lg">একটি আদর্শ ও আধুনিক শিক্ষা প্রতিষ্ঠান</p>
                </div>
            </div>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-10 gap-8">
          <div className="col-span-10 md:col-span-7">
            <div className="space-y-12">
              <NoticeBoard />
              <AboutSchool />
              <div className="bg-white py-12 sm:py-16 lg:py-20 -mx-4 sm:-mx-6 md:-mx-8">
                <div className="container mx-auto px-4">
                  <ImportantLinks />
                </div>
              </div>
              <div className="bg-white py-12 sm:py-16 lg:py-20 -mx-4 sm:-mx-6 md:-mx-8">
                <div className="container mx-auto px-4">
                  <TeachersCarousel />
                </div>
              </div>
              <VideoGallery />
            </div>
          </div>
          <div className="col-span-10 md:col-span-3 space-y-8">
            <ChairmanMessage />
            <SecretaryMessage />
          </div>
        </div>
      </div>
    </>
  );
}
