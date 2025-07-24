import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  { src: "https://placehold.co/600x400.png", alt: "Classroom", dataAiHint: "classroom students" },
  { src: "https://placehold.co/600x400.png", alt: "School library", dataAiHint: "school library" },
  { src: "https://placehold.co/600x400.png", alt: "Science lab", dataAiHint: "science lab" },
  { src: "https://placehold.co/600x400.png", alt: "Playground", dataAiHint: "school playground" },
  { src: "https://placehold.co/600x400.png", alt: "Annual function", dataAiHint: "school event" },
  { src: "https://placehold.co/600x400.png", alt: "Graduation ceremony", dataAiHint: "graduation ceremony" },
  { src: "https://placehold.co/600x400.png", alt: "Art competition", dataAiHint: "art competition" },
  { src: "https://placehold.co/600x400.png", alt: "Computer lab", dataAiHint: "computer lab" },
];

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">ছবি গ্যালারি</h1>
          <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠানের কিছু স্মরণীয় মুহূর্ত</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 aspect-w-4 aspect-h-3">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.dataAiHint}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
