"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const carouselItems = [
  {
    src: "https://jrgbp.edu.bd/wp-content/uploads/2023/09/2022-12-09.jpg",
    alt: "School campus",
    title: "স্বাগতম মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়ে",
    description: "একটি আদর্শ ও আধুনিক শিক্ষা প্রতিষ্ঠান",
    dataAiHint: "school campus"
  },
  {
    src: "https://narayanganjpreparatoryschool.edu.bd/wp-content/uploads/2024/01/IMG-20230714-WA0003.jpg",
    alt: "Annual sports day",
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    description: "শিক্ষার্থীদের শারীরিক ও মানসিক বিকাশে খেলাধুলার গুরুত্ব",
    dataAiHint: "sports day"
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npEppKeyl0u8huo4z74e9lsi3VkjV1r6IvhRzM80FtS3C4i0O8EleFmwOKE3qt3e-el8V7cO9mG5j4OKEZIm9OPc_lwM-m9wLWl6aliRYfFE8alPOzE5JIliGedNvM6cSKzTS9Brw=s680-w680-h510-rw",
    alt: "Science fair",
    title: "বিজ্ঞান মেলা",
    description: "নতুন প্রজন্মের উদ্ভাবনী শক্তির প্রকাশ",
    dataAiHint: "science fair"
  },
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Autoplay every 5 seconds

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="w-full relative">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={item.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/60 flex items-start justify-start p-8 md:p-12 lg:p-16">
                  <div className="text-left text-white max-w-lg">
                    <h2 className=" font-bold mb-2 font-headline animate-fade-in-down">
                      {item.title}
                    </h2>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselItems.map((_, index) => (
                <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 w-2 rounded-full transition-all ${current === index ? 'w-4 bg-primary' : 'bg-white/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </Carousel>

      <div className="absolute bottom-0 z-50 left-0 right-0 py-8 z-10">
            <Link href="/" className="container mx-auto px-4">
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
                <h1 className="text-xl md:text-2xl font-bold  text-white font-headline">মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়</h1>
                <p className="text-base text-white bold ">কাফ্রিখাল, মিঠাপুকুর, রংপুর।</p>
                </div>
            </div>
            </Link>
        </div>
    </section>
  );
}
