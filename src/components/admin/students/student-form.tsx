
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, User, School, Users2, MapPin, Upload } from 'lucide-react';
import { useRouter } from "next/navigation";
import { StudentForAdmin, saveStudent } from "@/lib/student-data";
import { toBase64 } from "@/lib/utils";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z.any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `ফাইলের সর্বোচ্চ আকার 5MB।`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), "শুধুমাত্র .jpg, .jpeg, .png এবং .webp ফরম্যাট সাপোর্ট করবে।");

const optionalFileSchema = fileSchema.optional();

const studentFormSchema = z.object({
  // Student Info
  name: z.string().min(1, "শিক্ষার্থীর নাম আবশ্যক"),
  roll: z.string().min(1, "রোল আবশ্যক"),
  class_name: z.string().min(1, "শ্রেণী আবশ্যক"),
  year: z.coerce.number().min(2000, "বছর আবশ্যক"),
  dob: z.string().min(1, "জন্ম তারিখ আবশ্যক"),
  gender: z.string().min(1, "লিঙ্গ নির্বাচন করুন"),
  religion: z.string().min(1, "ধর্ম নির্বাচন করুন"),
  blood_group: z.string().optional(),
  
  // Parent Info
  father_name: z.string().min(1, "পিতার নাম আবশ্যক"),
  father_mobile: z.string().min(1, "পিতার মোবাইল নম্বর আবশ্যক"),
  mother_name: z.string().min(1, "মাতার নাম আবশ্যক"),
  
  // Address Info
  present_address: z.string().min(1, "বর্তমান ঠিকানা আবশ্যক"),
  permanent_address: z.string().min(1, "স্থায়ী ঠিকানা আবশ্যক"),

  // File Uploads
  student_photo: optionalFileSchema,
});

type FormValues = z.infer<typeof studentFormSchema>;

export function StudentForm({ student }: { student?: StudentForAdmin }) {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student?.name || "",
      roll: student?.roll || "",
      class_name: student?.class_name || "",
      year: student?.year || new Date().getFullYear(),
      dob: student?.dob ? new Date(student.dob).toISOString().split('T')[0] : "",
      gender: student?.gender || "",
      religion: student?.religion || "",
      blood_group: student?.blood_group || "",
      father_name: student?.father_name || "",
      father_mobile: student?.father_mobile || "",
      mother_name: student?.mother_name || "",
      present_address: student?.present_address || "",
      permanent_address: student?.permanent_address || "",
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    
    // Append all string/number values
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'student_photo') {
         formData.append(key, value as any);
      }
    }
    
    // Handle file upload
    if (values.student_photo && values.student_photo.length > 0) {
      try {
        const studentPhotoBase64 = await toBase64(values.student_photo[0]);
        formData.append('image', studentPhotoBase64);
      } catch (error) {
         toast({
            title: "ফাইল আপলোড ত্রুটি",
            description: "ছবি প্রসেস করার সময় একটি সমস্যা হয়েছে।",
            variant: "destructive",
          });
          return;
      }
    }

    const result = await saveStudent(formData, student?.id);

    if (result.success) {
        toast({
        title: "সফল হয়েছে",
        description: `শিক্ষার্থীর তথ্য সফলভাবে ${student ? 'আপডেট' : 'তৈরি'} করা হয়েছে।`,
        });
        router.push("/admin/students");
        router.refresh();
    } else {
        toast({
        title: "ত্রুটি",
        description: result.error || "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।",
        variant: "destructive",
        });
    }
  }

  const FormItem = ({ children }: { children: React.ReactNode }) => <div className="space-y-2">{children}</div>;
  const FormMessage = ({ name }: { name: keyof FormValues }) => errors[name] ? <p className="text-sm font-medium text-destructive">{errors[name]?.message as string}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary"><User /> শিক্ষার্থীর তথ্য</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormItem> <Label htmlFor="name">শিক্ষার্থীর নাম</Label> <Input id="name" {...register("name")} /> <FormMessage name="name" /> </FormItem>
            <FormItem> <Label htmlFor="roll">রোল নং</Label> <Input id="roll" {...register("roll")} /> <FormMessage name="roll" /> </FormItem>
            <FormItem>
              <Label>শ্রেণী</Label>
               <Controller name="class_name" control={control} render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="৬ষ্ঠ">৬ষ্ঠ</SelectItem>
                      <SelectItem value="৭ম">৭ম</SelectItem>
                      <SelectItem value="৮ম">৮ম</SelectItem>
                      <SelectItem value="৯ম">৯ম</SelectItem>
                      <SelectItem value="১০ম">১০ম</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              <FormMessage name="class_name" />
            </FormItem>
            <FormItem> <Label htmlFor="year">বছর</Label> <Input id="year" type="number" {...register("year")} /> <FormMessage name="year" /> </FormItem>
            <FormItem> <Label htmlFor="dob">জন্ম তারিখ</Label> <Input id="dob" type="date" {...register("dob")} /> <FormMessage name="dob" /> </FormItem>
            <FormItem>
              <Label>লিঙ্গ</Label>
               <Controller name="gender" control={control} render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ছেলে">ছেলে</SelectItem>
                      <SelectItem value="মেয়ে">মেয়ে</SelectItem>
                      <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              <FormMessage name="gender" />
            </FormItem>
             <FormItem>
              <Label>ধর্ম</Label>
                <Controller name="religion" control={control} render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ইসলাম">ইসলাম</SelectItem>
                      <SelectItem value="হিন্দু">হিন্দু</SelectItem>
                      <SelectItem value="বৌদ্ধ">বৌদ্ধ</SelectItem>
                      <SelectItem value="খ্রিস্টান">খ্রিস্টান</SelectItem>
                      <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              <FormMessage name="religion" />
            </FormItem>
             <FormItem>
              <Label>রক্তের গ্রুপ (ঐচ্ছিক)</Label>
                <Controller name="blood_group" control={control} render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>
                       <SelectItem value="A+">A+</SelectItem>
                       <SelectItem value="A-">A-</SelectItem>
                       <SelectItem value="B+">B+</SelectItem>
                       <SelectItem value="B-">B-</SelectItem>
                       <SelectItem value="AB+">AB+</SelectItem>
                       <SelectItem value="AB-">AB-</SelectItem>
                       <SelectItem value="O+">O+</SelectItem>
                       <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              <FormMessage name="blood_group" />
            </FormItem>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary"><Users2 /> অভিভাবকের তথ্য</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormItem> <Label htmlFor="father_name">পিতার নাম</Label> <Input id="father_name" {...register("father_name")} /> <FormMessage name="father_name" /> </FormItem>
            <FormItem> <Label htmlFor="father_mobile">পিতার মোবাইল নম্বর</Label> <Input id="father_mobile" {...register("father_mobile")} /> <FormMessage name="father_mobile" /> </FormItem>
            <FormItem> <Label htmlFor="mother_name">মাতার নাম</Label> <Input id="mother_name" {...register("mother_name")} /> <FormMessage name="mother_name" /> </FormItem>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary"><MapPin /> ঠিকানা</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem> <Label htmlFor="present_address">বর্তমান ঠিকানা</Label> <Input id="present_address" {...register("present_address")} /> <FormMessage name="present_address" /> </FormItem>
            <FormItem> <Label htmlFor="permanent_address">স্থায়ী ঠিকানা</Label> <Input id="permanent_address" {...register("permanent_address")} /> <FormMessage name="permanent_address" /> </FormItem>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary"><Upload /> ফাইল আপলোড</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem>
                <Label htmlFor="student_photo">শিক্ষার্থীর ছবি (পাসপোর্ট সাইজ)</Label>
                <Input id="student_photo" type="file" accept="image/*" {...register("student_photo")} />
                <p className="text-xs text-muted-foreground">{student ? "নতুন ছবি আপলোড করলে পুরোনো ছবিটি প্রতিস্থাপিত হবে।" : ""}</p>
                <FormMessage name="student_photo" />
            </FormItem>
            {student?.image && (
                <div>
                    <Label>বর্তমান ছবি</Label>
                    <img src={student.image} alt="Student photo" className="mt-2 h-24 w-24 rounded-md object-cover" />
                </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
           <Button type="button" variant="outline" onClick={() => router.back()}>
                বাতিল করুন
            </Button>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>
  );
}
