import HeroCarousel from '@/components/homepage/hero-carousel';
import NoticeBoard from '@/components/homepage/notice-board';
import AboutSchool from '@/components/homepage/about-school';
import TeachersCarousel from '@/components/homepage/teachers-carousel';
import VideoGallery from '@/components/homepage/video-gallery';
import ImportantLinks from '@/components/homepage/important-links';
import ChairmanMessage from '@/components/homepage/chairman-message';
import Image from 'next/image';

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
                alt="Shikkha Angan Logo"
                width={80}
                height={80}
                data-ai-hint="school logo"
                className="rounded-full"
                />
                <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-headline">শিক্ষা অঙ্গন</h1>
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
          <div className="col-span-10 md:col-span-3">
            <ChairmanMessage />
          </div>
        </div>
      </div>
    </>
  );
}
