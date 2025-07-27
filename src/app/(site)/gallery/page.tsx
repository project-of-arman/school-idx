
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getGalleryImages } from "@/lib/gallery-data";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">ছবি গ্যালারি</h1>
          <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠানের কিছু স্মরণীয় মুহূর্ত</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 aspect-w-4 aspect-h-3 relative">
                <Image
                  src={image.image_url}
                  alt={image.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.data_ai_hint}
                />
                 <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
