
"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getGalleryImages, GalleryImage } from "@/lib/gallery-data";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from '@/components/ui/skeleton';

const GallerySkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full rounded-lg" />
        ))}
    </div>
);


export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
        setLoading(true);
        const data = await getGalleryImages();
        setImages(data);
        setLoading(false);
    }
    fetchImages();
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">ছবি গ্যালারি</h1>
          <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠানের কিছু স্মরণীয় মুহূর্ত</p>
        </div>
        
        {loading ? (
            <GallerySkeleton />
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
                <Dialog key={image.id}>
                    <DialogTrigger asChild>
                        <Card className="overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <CardContent className="p-0 relative aspect-[4/3]">
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
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-2">
                        <div className="relative aspect-video">
                            <Image
                                src={image.image_url}
                                alt={image.title}
                                fill
                                className="object-contain rounded-md"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}
