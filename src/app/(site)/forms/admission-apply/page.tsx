
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

const admissionFormSchema = z.object({
  // Student Info
  studentNameBn: z.string().min(1, "শিক্ষার্থীর নাম (বাংলা) আবশ্যক"),
  studentNameEn: z.string().min(1, "শিক্ষার্থীর নাম (ইংরেজি) আবশ্যক").regex(/^[a-zA-Z\s.-]+$/, "শুধুমাত্র ইংরেজি অক্ষর ব্যবহার করুন"),
  dob: z.string().min(1, "জন্ম তারিখ আবশ্যক"),
  birthCertNo: z.string().min(1, "জন্ম নিবন্ধন নম্বর আবশ্যক"),
  gender: z.string().min(1, "লিঙ্গ নির্বাচন করুন"),
  religion: z.string().min(1, "ধর্ম নির্বাচন করুন"),
  bloodGroup: z.string().optional(),
  
  // Academic Info
  applyingForClass: z.string().min(1, "আবেদনের শ্রেণী নির্বাচন করুন"),
  previousSchool: z.string().optional(),

  // Parent Info
  fatherNameBn: z.string().min(1, "পিতার নাম (বাংলা) আবশ্যক"),
  fatherNameEn: z.string().min(1, "পিতার নাম (ইংরেজি) আবশ্যক").regex(/^[a-zA-Z\s.-]+$/, "শুধুমাত্র ইংরেজি অক্ষর ব্যবহার করুন"),
  fatherNid: z.string().min(1, "পিতার জাতীয় পরিচয়পত্র নম্বর আবশ্যক"),
  fatherMobile: z.string().min(1, "পিতার মোবাইল নম্বর আবশ্যক"),
  motherNameBn: z.string().min(1, "মাতার নাম (বাংলা) আবশ্যক"),
  motherNameEn: z.string().min(1, "মাতার নাম (ইংরেজি) আবশ্যক").regex(/^[a-zA-Z\s.-]+$/, "শুধুমাত্র ইংরেজি অক্ষর ব্যবহার করুন"),
  motherNid: z.string().min(1, "মাতার জাতীয় পরিচয়পত্র নম্বর আবশ্যক"),
  motherMobile: z.string().min(1, "মাতার মোবাইল নম্বর আবশ্যক"),

  // Address Info
  presentAddress: z.string().min(1, "বর্তমান ঠিকানা আবশ্যক"),
  permanentAddress: z.string().min(1, "স্থায়ী ঠিকানা আবশ্যক"),

  // File Uploads
  studentPhoto: z.any().refine(files => files?.length == 1, "শিক্ষার্থীর ছবি আবশ্যক।"),
  birthCertPhoto: z.any().refine(files => files?.length == 1, "জন্ম নিবন্ধন সনদের কপি আবশ্যক।"),
});

export default function AdmissionApplyPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof admissionFormSchema>>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: {
        studentNameBn: "",
        studentNameEn: "",
        dob: "",
        birthCertNo: "",
        gender: "",
        religion: "",
        bloodGroup: "",
        applyingForClass: "",
        previousSchool: "",
        fatherNameBn: "",
        fatherNameEn: "",
        fatherNid: "",
        fatherMobile: "",
        motherNameBn: "",
        motherNameEn: "",
        motherNid: "",
        motherMobile: "",
        presentAddress: "",
        permanentAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof admissionFormSchema>) {
    console.log(values);
    toast({
      title: "আবেদন সফল হয়েছে",
      description: "আপনার ভর্তির আবেদন সফলভাবে জমা দেওয়া হয়েছে।",
    });
    form.reset();
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">অনলাইন ভর্তি আবেদন</h1>
          <p className="text-muted-foreground mt-2">
            সঠিক তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
            {/* Student Information */}
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><User /> শিক্ষার্থীর তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="studentNameBn" render={({ field }) => ( <FormItem> <FormLabel>শিক্ষার্থীর নাম (বাংলা)</FormLabel> <FormControl> <Input placeholder="বাংলায় নাম লিখুন" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="studentNameEn" render={({ field }) => ( <FormItem> <FormLabel>শিক্ষার্থীর নাম (ইংরেজি)</FormLabel> <FormControl> <Input placeholder="ইংরেজিতে নাম লিখুন" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="dob" render={({ field }) => ( <FormItem> <FormLabel>জন্ম তারিখ</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="birthCertNo" render={({ field }) => ( <FormItem> <FormLabel>জন্ম নিবন্ধন নম্বর</FormLabel> <FormControl> <Input placeholder="১৭ ডিজিটের নম্বর" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>লিঙ্গ</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ছেলে">ছেলে</SelectItem>
                          <SelectItem value="মেয়ে">মেয়ে</SelectItem>
                          <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ধর্ম</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ইসলাম">ইসলাম</SelectItem>
                          <SelectItem value="হিন্দু">হিন্দু</SelectItem>
                          <SelectItem value="বৌদ্ধ">বৌদ্ধ</SelectItem>
                          <SelectItem value="খ্রিস্টান">খ্রিস্টান</SelectItem>
                          <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>রক্তের গ্রুপ (ঐচ্ছিক)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            {/* Academic Information */}
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><School />একাডেমিক তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="applyingForClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>আবেদনের শ্রেণী</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="৬ষ্ঠ">৬ষ্ঠ</SelectItem>
                          <SelectItem value="৭ম">৭ম</SelectItem>
                          <SelectItem value="৮ম">৮ম</SelectItem>
                          <SelectItem value="৯ম">৯ম</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField control={form.control} name="previousSchool" render={({ field }) => ( <FormItem> <FormLabel>পূর্ববর্তী প্রতিষ্ঠানের নাম (যদি থাকে)</FormLabel> <FormControl> <Input placeholder="স্কুলের নাম লিখুন" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
              </CardContent>
            </Card>

            {/* Parent Information */}
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><Users2 /> অভিভাবকের তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fatherNameBn" render={({ field }) => ( <FormItem> <FormLabel>পিতার নাম (বাংলা)</FormLabel> <FormControl> <Input placeholder="বাংলায় নাম লিখুন" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="fatherNameEn" render={({ field }) => ( <FormItem> <FormLabel>পিতার নাম (ইংরেজি)</FormLabel> <FormControl> <Input placeholder="ইংরেজিতে নাম লিখুন" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="fatherNid" render={({ field }) => ( <FormItem> <FormLabel>পিতার জাতীয় পরিচয়পত্র নম্বর</FormLabel> <FormControl> <Input placeholder="NID নম্বর" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="fatherMobile" render={({ field }) => ( <FormItem> <FormLabel>পিতার মোবাইল নম্বর</FormLabel> <FormControl> <Input placeholder="মোবাইল নম্বর" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="motherNameBn" render={({ field }) => ( <FormItem> <FormLabel>মাতার নাম (বাংলা)</FormLabel> <FormControl> <Input placeholder="বাংলায় নাম লিখুন" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="motherNameEn" render={({ field }) => ( <FormItem> <FormLabel>মাতার নাম (ইংরেজি)</FormLabel> <FormControl> <Input placeholder="ইংরেজিতে নাম লিখুন" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="motherNid" render={({ field }) => ( <FormItem> <FormLabel>মাতার জাতীয় পরিচয়পত্র নম্বর</FormLabel> <FormControl> <Input placeholder="NID নম্বর" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="motherMobile" render={({ field }) => ( <FormItem> <FormLabel>মাতার মোবাইল নম্বর</FormLabel> <FormControl> <Input placeholder="মোবাইল নম্বর" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
              </CardContent>
            </Card>

             {/* Address Information */}
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><MapPin /> ঠিকানা</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="presentAddress" render={({ field }) => ( <FormItem> <FormLabel>বর্তমান ঠিকানা</FormLabel> <FormControl> <Input placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="permanentAddress" render={({ field }) => ( <FormItem> <FormLabel>স্থায়ী ঠিকানা</FormLabel> <FormControl> <Input placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
              </CardContent>
            </Card>
            
            {/* File Uploads */}
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><Upload /> ফাইল আপলোড</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="studentPhoto"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>শিক্ষার্থীর ছবি (পাসপোর্ট সাইজ)</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthCertPhoto"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>জন্ম নিবন্ধন সনদের কপি</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*,application/pdf" onChange={(e) => onChange(e.target.files)} {...rest} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                আবেদন জমা দিন <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

    