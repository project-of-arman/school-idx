
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to an API
    toast({
      title: "ধন্যবাদ!",
      description: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে।",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">যোগাযোগ ও ফিডব্যাক</h1>
          <p className="text-muted-foreground mt-2">আপনার যেকোনো জিজ্ঞাসা বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary font-headline">আমাদের ঠিকানা</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">শিক্ষা অঙ্গন স্কুল</h3>
                    <p className="text-muted-foreground">১ নং রোড, ব্লক এ, মিরপুর, ঢাকা-১২১৬</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">ফোন</h3>
                    <a href="tel:+8801234567890" className="text-muted-foreground hover:text-primary transition-colors">+৮৮০ ১২৩৪ ৫৬৭৮৯০</a>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">ইমেইল</h3>
                    <a href="mailto:info@shikkhaangan.edu" className="text-muted-foreground hover:text-primary transition-colors">info@shikkhaangan.edu</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-primary/20 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                    {/* Placeholder for Google Maps */}
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0950338381005!2d90.36399991544456!3d23.81513519228574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e6c38a79ef%3A0x28637993b8f683f2!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1675868516053!5m2!1sen!2sbd" 
                        width="100%" 
                        height="100%"
                        style={{border:0}} 
                        allowFullScreen
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="School Location"
                    ></iframe>
                </div>
            </Card>

          </div>

          {/* Feedback Form */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary font-headline">আপনার মতামত দিন</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">আপনার নাম</Label>
                  <Input id="name" placeholder="আপনার সম্পূর্ণ নাম" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="email">আপনার ইমেইল</Label>
                  <Input id="email" type="email" placeholder="আপনার ইমেইল ঠিকানা" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="subject">বিষয়</Label>
                  <Input id="subject" placeholder="আপনার বার্তার বিষয়" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="message">বার্তা</Label>
                  <Textarea id="message" placeholder="আপনার বার্তা এখানে লিখুন..." required rows={5} />
                </div>
                <div>
                   <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    বার্তা পাঠান
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
