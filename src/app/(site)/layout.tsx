import Footer from '@/components/footer';
import HeroCarousel from '@/components/homepage/hero-carousel';
import SecondaryNav from '@/components/homepage/secondary-nav';
import DynamicSidebar from '@/components/homepage/dynamic-sidebar';


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
