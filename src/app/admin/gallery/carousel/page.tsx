
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCarouselItems } from "@/lib/school-data";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import CarouselTable from "@/components/admin/gallery/carousel-table";

export default async function AdminCarouselPage() {
  const items = await getCarouselItems();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>ক্যারোসেল ব্যবস্থাপনা</CardTitle>
        <Button asChild>
          <Link href="/admin/gallery/carousel/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            নতুন স্লাইড যোগ করুন
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <CarouselTable items={items} />
      </CardContent>
    </Card>
  );
}
