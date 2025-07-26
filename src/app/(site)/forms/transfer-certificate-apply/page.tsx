
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, User, School, FileText } from 'lucide-react';
import { saveTransferCertificateApplication } from "./actions";

const formSchema = z.object({
  studentName: z.string().min(1, "শিক্ষার্থীর নাম আবশ্যক"),
  className: z.string().min(1, "শ্রেণী আবশ্যক"),
  rollNo: z.string().min(1, "রোল নম্বর আবশ্যক"),
  session: z.string().min(1, "সেশন আবশ্যক"),
  fatherName: z.string().min(1, "পিতার নাম আবশ্যক"),
  motherName: z.string().min(1, "মাতার নাম আবশ্যক"),
  reason: z.string().min(1, "ছাড়পত্র গ্রহণের কারণ আবশ্যক"),
  mobile: z.string().min(1, "যোগাযোগের মোবাইল নম্বর আবশ্যক"),
});

type FormValues = z.infer<typeof formSchema>;

export default function TransferCertificateApplyPage() {
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await saveTransferCertificateApplication(formData);

    if (result.success) {
      toast({
        title: "আবেদন সফল হয়েছে",
        description: "আপনার ছাড়পত্রের আবেদন সফলভাবে জমা দেওয়া হয়েছে।",
      });
      reset();
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
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">ছাড়পত্রের জন্য আবেদন</h1>
          <p className="text-muted-foreground mt-2">
            সঠিক তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><FileText /> আবেদনের তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormItem> <Label htmlFor="studentName">শিক্ষার্থীর নাম</Label> <Input id="studentName" placeholder="সম্পূর্ণ নাম লিখুন" {...register("studentName")} /> <FormMessage name="studentName" /> </FormItem>
                <FormItem> <Label htmlFor="className">শ্রেণী</Label> <Input id="className" placeholder="যেমন: দশম" {...register("className")} /> <FormMessage name="className" /> </FormItem>
                <FormItem> <Label htmlFor="rollNo">রোল নম্বর</Label> <Input id="rollNo" placeholder="শ্রেণী রোল" {...register("rollNo")} /> <FormMessage name="rollNo" /> </FormItem>
                <FormItem> <Label htmlFor="session">সেশন</Label> <Input id="session" placeholder="যেমন: 2023-2024" {...register("session")} /> <FormMessage name="session" /> </FormItem>
                <FormItem> <Label htmlFor="fatherName">পিতার নাম</Label> <Input id="fatherName" placeholder="সম্পূর্ণ নাম লিখুন" {...register("fatherName")} /> <FormMessage name="fatherName" /> </FormItem>
                <FormItem> <Label htmlFor="motherName">মাতার নাম</Label> <Input id="motherName" placeholder="সম্পূর্ণ নাম লিখুন" {...register("motherName")} /> <FormMessage name="motherName" /> </FormItem>
                <FormItem className="md:col-span-2"> <Label htmlFor="reason">ছাড়পত্র গ্রহণের কারণ</Label> <Textarea id="reason" placeholder="বিস্তারিত লিখুন..." {...register("reason")} /> <FormMessage name="reason" /> </FormItem>
                <FormItem> <Label htmlFor="mobile">যোগাযোগের মোবাইল নম্বর</Label> <Input id="mobile" placeholder="১১ ডিজিটের নম্বর" {...register("mobile")} /> <p className="text-xs text-muted-foreground mt-1">আপনার সঠিক মোবাইল নম্বর টি দিন আমাদের পক্ষ থেকে আপনার সাথে যোগাযোগ করা হবে</p> <FormMessage name="mobile" /> </FormItem>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'জমা হচ্ছে...' : 'আবেদন জমা দিন'} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
      </div>
    </div>
  );
}
