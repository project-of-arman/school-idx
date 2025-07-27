
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Video, saveVideo } from "@/lib/video-data";

const formSchema = z.object({
  title: z.string().min(1, "শিরোনাম আবশ্যক"),
  youtube_url: z.string().url("অবৈধ ইউটিউব URL"),
  description: z.string().optional(),
  dataAiHint: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function VideoForm({ video }: { video?: Video }) {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: video?.title || "",
      youtube_url: video ? `https://www.youtube.com/watch?v=${video.videoUrl.split('/').pop()}` : "",
      description: video?.description || "",
      dataAiHint: video?.dataAiHint || "school event",
    },
  });

  async function onSubmit(values: FormValues) {
    const result = await saveVideo(values, video?.id);

    if (result.success) {
        toast({ title: "সফল হয়েছে", description: `ভিডিও সফলভাবে ${video ? 'আপডেট' : 'যোগ'} করা হয়েছে।` });
        router.push("/admin/gallery/videos");
        router.refresh();
    } else {
        toast({ title: "ত্রুটি", description: result.error || "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।", variant: "destructive" });
    }
  }

  const FormItem = ({ children }: { children: React.ReactNode }) => <div className="space-y-2">{children}</div>;
  const FormMessage = ({ name }: { name: keyof FormValues }) => errors[name] ? <p className="text-sm font-medium text-destructive">{errors[name]?.message as string}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormItem> 
          <Label htmlFor="title">শিরোনাম</Label> 
          <Input id="title" {...register("title")} /> 
          <FormMessage name="title" /> 
        </FormItem>
        <FormItem>
          <Label htmlFor="youtube_url">ইউটিউব ভিডিওর URL</Label>
          <Input id="youtube_url" placeholder="https://www.youtube.com/watch?v=..." {...register("youtube_url")} />
          <p className="text-xs text-muted-foreground">ইউটিউব থেকে ভিডিওর শেয়ার লিঙ্ক এখানে দিন।</p>
          <FormMessage name="youtube_url" />
        </FormItem>
        <FormItem> 
          <Label htmlFor="description">বিবরণ</Label> 
          <Textarea id="description" {...register("description")} />
          <FormMessage name="description" /> 
        </FormItem>
        <FormItem> 
          <Label htmlFor="dataAiHint">AI Hint (Optional)</Label> 
          <Input id="dataAiHint" {...register("dataAiHint")} /> 
          <FormMessage name="dataAiHint" /> 
        </FormItem>
        <div className="flex justify-end gap-2">
           <Button type="button" variant="outline" onClick={() => router.back()}>বাতিল করুন</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'}
          </Button>
        </div>
    </form>
  );
}
