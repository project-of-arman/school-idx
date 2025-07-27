
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarouselForm } from "@/components/admin/gallery/carousel-form";
import { getCarouselItemById } from "@/lib/school-data";
import { notFound } from "next/navigation";

export default async function EditCarouselItemPage({ params }: { params: { id: string } }) {
  const item = await getCarouselItemById(params.id);

  if (!item) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>স্লাইড সম্পাদনা করুন</CardTitle>
      </CardHeader>
      <CardContent>
        <CarouselForm item={item} />
      </CardContent>
    </Card>
  );
}
