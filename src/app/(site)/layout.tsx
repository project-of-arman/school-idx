
import Footer from '@/components/footer';
import HeroCarousel from '@/components/homepage/hero-carousel';
import SecondaryNav from '@/components/homepage/secondary-nav';
import DynamicSidebar from '@/components/homepage/dynamic-sidebar';
import { Megaphone } from 'lucide-react';

const Marquee = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 my-4 overflow-hidden">
      <div className="marquee-container flex items-center">
        <div className="flex-shrink-0 flex z-50 items-center gap-2 mx-4 bg-primary/80 px-3 py-1 rounded-md">
            <Megaphone className="h-5 w-5" />
            <span className="font-bold">জরুরী ঘোষণা:</span>
        </div>
        <div className="marquee whitespace-nowrap">
          <span>সকলের অবগতির জন্য জানানো যাচ্ছে যে, আগামীকালের পরীক্ষা অনিবার্য কারণবশত স্থগিত করা হয়েছে। নতুন তারিখ পরবর্তীতে জানানো হবে।</span>
        </div>
      </div>
    </div>
  );
};


export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HeroCarousel />
      <SecondaryNav />
       <main className="flex-1">
        <div className="container mx-auto px-4">
            <Marquee />
        </div>
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-10 gap-8">
            <div className="col-span-10 md:col-span-7">
                {children}
            </div>
            <div className="col-span-10 md:col-span-3">
                <DynamicSidebar />
            </div>
            </div>
        </div>
        </main>
      <Footer />
    </div>
  );
}
