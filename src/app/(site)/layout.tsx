import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroCarousel from '@/components/homepage/hero-carousel';
import SecondaryNav from '@/components/homepage/secondary-nav';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <HeroCarousel />
      <SecondaryNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
