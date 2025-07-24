import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroCarousel from '@/components/homepage/hero-carousel';
import SecondaryNav from '@/components/homepage/secondary-nav';
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
            width={260}
            height={360}
            className="object-cover rounded"
            data-ai-hint="male portrait"
          />
        </div>
        <p className="mt-4 font-semibold text-primary">প্রফেসর নূর মোঃ আব্দুর রাজ্জাক</p>
      </CardContent>
    </Card>
  );
}


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
       <main className="flex-1">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-10 gap-8">
            <div className="col-span-10 md:col-span-7">
                {children}
            </div>
            <div className="col-span-10 md:col-span-3 space-y-8">
                <ChairmanMessage />
                <SecretaryMessage />
            </div>
            </div>
        </div>
        </main>
      <Footer />
    </div>
  );
}
