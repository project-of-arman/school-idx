import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const images = [
  { src: "https://placehold.co/600x400.png", alt: "Classroom", dataAiHint: "classroom students" },
  { src: "https://placehold.co/600x400.png", alt: "School library", dataAiHint: "school library" },
  { src: "https://placehold.co/600x400.png", alt: "Science lab", dataAiHint: "science lab" },
  { src: "https://placehold.co/600x400.png", alt: "Playground", dataAiHint: "school playground" },
];

export default function ImageGallery() {
  return (
    <section id="image-gallery">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary font-headline">ছবি গ্যালারি</h2>
        <Button asChild variant="outline">
          <Link href="/gallery">সব ছবি দেখুন</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
}
