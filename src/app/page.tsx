import HeroCarousel from '@/components/homepage/hero-carousel';
import NoticeBoard from '@/components/homepage/notice-board';
import AboutSchool from '@/components/homepage/about-school';
import TeachersCarousel from '@/components/homepage/teachers-carousel';
import VideoGallery from '@/components/homepage/video-gallery';
import ImportantLinks from '@/components/homepage/important-links';
import ChairmanMessage from '@/components/homepage/chairman-message';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
             <NoticeBoard />
          </div>
          <div className="lg:col-span-4">
            <ChairmanMessage />
          </div>
          <div className="lg:col-span-4">
            {/* placeholder for another component */}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-12 sm:pb-16 lg:pb-20">
        <AboutSchool />
      </div>
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <TeachersCarousel />
      </div>
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <VideoGallery />
      </div>
       <div className="bg-white py-12 sm:py-16 lg:py-20">
        <ImportantLinks />
      </div>
    </div>
  );
}
