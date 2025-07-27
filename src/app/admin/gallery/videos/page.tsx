
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVideos } from "@/lib/video-data";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import VideoTable from "@/components/admin/gallery/video-table";

export default async function AdminVideosPage() {
  const videos = await getVideos();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>ভিডিও গ্যালারি ব্যবস্থাপনা</CardTitle>
        <Button asChild>
          <Link href="/admin/gallery/videos/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            নতুন ভিডিও যোগ করুন
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <VideoTable videos={videos} />
      </CardContent>
    </Card>
  );
}
