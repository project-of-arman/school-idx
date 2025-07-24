"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Banknote, Loader2 } from "lucide-react";
import Image from "next/image";

const paymentSchema = z.object({
  studentId: z.string().min(1, { message: "শিক্ষার্থীর আইডি আবশ্যক।" }),
  class: z.string().min(1, { message: "অনুগ্রহ করে শ্রেণী নির্বাচন করুন।" }),
  feeType: z.string().min(1, { message: "অনুগ্রহ করে ফি-এর ধরন নির্বাচন করুন।" }),
  mobile: z.string().regex(/^01[3-9]\d{8}$/, { message: "সঠিক মোবাইল নম্বর দিন।" }),
});

export default function SonaliBankPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      studentId: "",
      class: "",
      feeType: "",
      mobile: "",
    },
  });

  function onSubmit(values: z.infer<typeof paymentSchema>) {
    setIsProcessing(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Here you would redirect to the actual payment gateway
      alert("পেমেন্ট গেটওয়েতে আপনাকে নিয়ে যাওয়া হচ্ছে...");
    }, 2000);
  }

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">সোনালী ব্যাংক পেমেন্ট গেটওয়ে</h1>
          <p className="text-muted-foreground mt-2">আপনার সন্তানের স্কুল ফি সহজেই পরিশোধ করুন</p>
        </div>

        <Card className="shadow-lg border-primary/20">
          <CardHeader className="items-center text-center">
            <Image 
                src="https://placehold.co/150x50.png"
                alt="Sonali Bank Logo"
                width={150}
                height={50}
                data-ai-hint="bank logo"
            />
            <CardTitle className="text-2xl pt-4">পেমেন্ট তথ্য</CardTitle>
            <CardDescription>অনুগ্রহ করে নিচের ফর্মটি পূরণ করুন।</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>শিক্ষার্থীর আইডি</FormLabel>
                      <FormControl>
                        <Input placeholder="আপনার শিক্ষার্থীর আইডি দিন" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>শ্রেণী</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="৬ষ্ঠ">৬ষ্ঠ শ্রেণী</SelectItem>
                            <SelectItem value="৭ম">৭ম শ্রেণী</SelectItem>
                            <SelectItem value="৮ম">৮ম শ্রেণী</SelectItem>
                            <SelectItem value="৯ম">৯ম শ্রেণী</SelectItem>
                            <SelectItem value="১০ম">১০ম শ্রেণী</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="feeType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>ফি-এর ধরন</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="ফি-এর ধরন নির্বাচন করুন" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="মাসিক বেতন">মাসিক বেতন</SelectItem>
                            <SelectItem value="ভর্তি ফি">ভর্তি ফি</SelectItem>
                            <SelectItem value="পরীক্ষার ফি">পরীক্ষার ফি</SelectItem>
                            <SelectItem value="อื่นๆ">অন্যান্য</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>মোবাইল নম্বর</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="আপনার মোবাইল নম্বর দিন" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      প্রসেস হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Banknote className="mr-2 h-5 w-5" />
                      ফি পরিশোধ করুন
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
