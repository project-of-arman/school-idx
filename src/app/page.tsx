import HeroCarousel from '@/components/homepage/hero-carousel';
import NoticeBoard from '@/components/homepage/notice-board';
import AboutSchool from '@/components/homepage/about-school';
import TeachersCarousel from '@/components/homepage/teachers-carousel';
import VideoGallery from '@/components/homepage/video-gallery';
import ImportantLinks from '@/components/homepage/important-links';
import ChairmanMessage from '@/components/homepage/chairman-message';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-10 gap-8">
          <div className="col-span-10 md:col-span-7">
            <div className="space-y-12">
              <NoticeBoard />
              <AboutSchool />
              <div className="bg-white py-12 sm:py-16 lg:py-20 -mx-4 sm:-mx-6 md:-mx-8">
                <div className="container mx-auto px-4">
                  <TeachersCarousel />
                </div>
              </div>
              <VideoGallery />
              <div className="bg-white py-12 sm:py-16 lg:py-20 -mx-4 sm:-mx-6 md:-mx-8">
                <div className="container mx-auto px-4">
                  <ImportantLinks />
                </div>
              </div>
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
