import HeroCarousel from '@/components/homepage/hero-carousel';
import NoticeBoard from '@/components/homepage/notice-board';
import AboutSchool from '@/components/homepage/about-school';
import TeachersCarousel from '@/components/homepage/teachers-carousel';
import VideoGallery from '@/components/homepage/video-gallery';
import ImportantLinks from '@/components/homepage/important-links';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          <div className="lg:w-1/3">
             <NoticeBoard />
          </div>
          <div className="lg:w-2/3">
            <AboutSchool />
          </div>
        </div>
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
