
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { GalleryImage, saveGalleryImage } from "@/lib/gallery-data";
import { toBase64 } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const imageSchema = z.any()
  .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `ফাইলের সর্বোচ্চ আকার 5MB।`)
  .refine(
    (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "শুধুমাত্র .jpg, .jpeg, .png এবং .webp ফরম্যাট সাপোর্ট করবে।"
  );

const formSchema = z.object({
  title: z.string().min(1, "শিরোনাম আবশ্যক"),
  sort_order: z.coerce.number().int().min(0, "অবস্থান আবশ্যক"),
  image: imageSchema.optional(),
  data_ai_hint: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function GalleryImageForm({ image }: { image?: GalleryImage }) {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: image?.title || "",
      sort_order: image?.sort_order || 0,
      data_ai_hint: image?.data_ai_hint || "school event",
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    
    formData.append('title', values.title);
    formData.append('sort_order', values.sort_order.toString());
    formData.append('data_ai_hint', values.data_ai_hint || 'school event');
    
    if (values.image && values.image.length > 0) {
      try {
        const imageBase64 = await toBase64(values.image[0]);
        formData.append('image_url', imageBase64);
      } catch (error) {
         toast({ title: "ফাইল আপলোড ত্রুটি", description: "ছবি প্রসেস করার সময় একটি সমস্যা হয়েছে।", variant: "destructive" });
         return;
      }
    }

    const result = await saveGalleryImage(formData, image?.id);

    if (result.success) {
        toast({ title: "সফল হয়েছে", description: `ছবি সফলভাবে ${image ? 'আপডেট' : 'আপলোড'} করা হয়েছে।` });
        router.push("/admin/gallery/photos");
        router.refresh();
    } else {
        toast({ title: "ত্রুটি", description: result.error || "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।", variant: "destructive" });
    }
  }

  const FormItem = ({ children }: { children: React.ReactNode }) => <div className="space-y-2">{children}</div>;
  const FormMessage = ({ name }: { name: keyof FormValues }) => errors[name] ? <p className="text-sm font-medium text-destructive">{errors[name]?.message as string}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormItem> <Label htmlFor="title">শিরোনাম</Label> <Input id="title" {...register("title")} /> <FormMessage name="title" /> </FormItem>
        <FormItem> <Label htmlFor="sort_order">অবস্থান (Sort Order)</Label> <Input id="sort_order" type="number" {...register("sort_order")} /> <FormMessage name="sort_order" /> </FormItem>
        <FormItem>
            <Label htmlFor="image">ছবি</Label>
            <Input id="image" type="file" accept="image/*" {...register("image")} />
            <p className="text-xs text-muted-foreground">{image ? "নতুন ছবি আপলোড করলে পুরোনো ছবিটি প্রতিস্থাপিত হবে।" : "নতুন ছবির জন্য ফাইল আবশ্যক।"}</p>
            <FormMessage name="image" />
        </FormItem>
        {image?.image_url && (
            <div className="mt-4">
                <Label>বর্তমান ছবি</Label>
                <img src={image.image_url} alt="Current gallery photo" className="mt-2 h-24 w-auto rounded-md object-cover" />
            </div>
        )}
        <FormItem> <Label htmlFor="data_ai_hint">AI Hint (Optional)</Label> <Input id="data_ai_hint" {...register("data_ai_hint")} /> </FormItem>
         <div className="flex justify-end gap-2">
           <Button type="button" variant="outline" onClick={() => router.back()}>বাতিল করুন</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'}
          </Button>
        </div>
    </form>
  );
}
