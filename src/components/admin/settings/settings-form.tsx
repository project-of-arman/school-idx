
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { SiteSettings } from "@/lib/settings-data";
import { Textarea } from "@/components/ui/textarea";
import { saveSiteSettings } from "@/lib/actions/settings-actions";

const formSchema = z.object({
  site_title: z.string().min(1, "সাইটের শিরোনাম আবশ্যক"),
  meta_description: z.string().min(1, "মেটা বিবরণ আবশ্যক"),
  meta_keywords: z.string().optional(),
  favicon_url: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  async function onSubmit(values: FormValues) {
    const result = await saveSiteSettings(values);
    if (result.success) {
      toast({ title: "সফল!", description: "সেটিংস সফলভাবে আপডেট করা হয়েছে।" });
      router.refresh();
    } else {
      toast({ title: "ত্রুটি", description: result.error, variant: "destructive" });
    }
  }

  const FormItem = ({ children }: { children: React.ReactNode }) => <div className="space-y-2">{children}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <FormItem>
          <Label htmlFor="site_title">সাইটের শিরোনাম (Title)</Label>
          <Input id="site_title" {...register("site_title")} />
          {errors.site_title && <p className="text-sm font-medium text-destructive">{errors.site_title.message}</p>}
        </FormItem>
        <FormItem>
          <Label htmlFor="meta_description">মেটা বিবরণ (Description)</Label>
          <Textarea id="meta_description" {...register("meta_description")} />
           <p className="text-xs text-muted-foreground">সার্চ ইঞ্জিনে আপনার সাইটের নিচে এই বিবরণটি দেখানো হবে।</p>
          {errors.meta_description && <p className="text-sm font-medium text-destructive">{errors.meta_description.message}</p>}
        </FormItem>
        <FormItem>
          <Label htmlFor="meta_keywords">মেটা কিওয়ার্ডস (Keywords)</Label>
          <Input id="meta_keywords" {...register("meta_keywords")} />
           <p className="text-xs text-muted-foreground">কমা (,) দিয়ে একাধিক কিওয়ার্ড লিখুন। যেমন: স্কুল, কলেজ, শিক্ষা।</p>
          {errors.meta_keywords && <p className="text-sm font-medium text-destructive">{errors.meta_keywords.message}</p>}
        </FormItem>
        <FormItem>
          <Label htmlFor="favicon_url">ফেভিকন URL</Label>
          <Input id="favicon_url" {...register("favicon_url")} />
           <p className="text-xs text-muted-foreground">ব্রাউজার ট্যাবে দেখানো ছোট আইকনের লিঙ্ক।</p>
          {errors.favicon_url && <p className="text-sm font-medium text-destructive">{errors.favicon_url.message}</p>}
        </FormItem>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'}
        </Button>
      </div>
    </form>
  );
}
