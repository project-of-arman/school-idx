"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
};

export default function ResultsPage() {
    const [roll, setRoll] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [generatedCaptcha, setGeneratedCaptcha] = useState('');
    const { toast } = useToast();

    const refreshCaptcha = useCallback(() => {
        setGeneratedCaptcha(generateCaptcha());
    }, []);

    useEffect(() => {
        refreshCaptcha();
    }, [refreshCaptcha]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!roll || !selectedClass) {
            toast({
                title: 'ত্রুটি',
                description: 'অনুগ্রহ করে রোল এবং শ্রেণী নির্বাচন করুন।',
                variant: 'destructive'
            });
            return;
        }
        if (captchaInput !== generatedCaptcha) {
            toast({
                title: 'ত্রুটি',
                description: 'ক্যাপচাটি সঠিক নয়।',
                variant: 'destructive'
            });
            refreshCaptcha();
            setCaptchaInput('');
            return;
        }
        
        // Handle result fetching logic here
        toast({
            title: 'অনুসন্ধান সফল',
            description: `রোল ${roll} এবং শ্রেণী ${selectedClass} এর ফলাফল দেখানো হচ্ছে...`,
        });

        // Reset form for now
        setRoll('');
        setSelectedClass('');
        setCaptchaInput('');
        refreshCaptcha();
    };

    return (
        <div className="bg-white py-16 sm:py-20">
            <div className="container mx-auto px-4 flex justify-center">
                <div className="w-full max-w-lg">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-primary font-headline">ফলাফল অনুসন্ধান</h1>
                        <p className="text-muted-foreground mt-2">আপনার পরীক্ষার ফলাফল দেখতে নিচের ফর্মটি পূরণ করুন</p>
                    </div>

                    <Card className="shadow-lg border-primary/20">
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle className="text-xl text-primary font-headline text-center">ফলাফল দেখুন</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="class">শ্রেণী</Label>
                                    <Select onValueChange={setSelectedClass} value={selectedClass}>
                                        <SelectTrigger id="class">
                                            <SelectValue placeholder="আপনার শ্রেণী নির্বাচন করুন" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="৬ষ্ঠ">৬ষ্ঠ শ্রেণী</SelectItem>
                                            <SelectItem value="৭ম">৭ম শ্রেণী</SelectItem>
                                            <SelectItem value="৮ম">৮ম শ্রেণী</SelectItem>
                                            <SelectItem value="৯ম">৯ম শ্রেণী</SelectItem>
                                            <SelectItem value="১০ম">১০ম শ্রেণী</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="roll">রোল নম্বর</Label>
                                    <Input
                                        id="roll"
                                        type="number"
                                        placeholder="আপনার রোল নম্বর লিখুন"
                                        value={roll}
                                        onChange={(e) => setRoll(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="captcha">ক্যাপচা</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-1/2 select-none rounded-md border bg-muted flex items-center justify-center h-10">
                                            <span className="text-xl font-bold tracking-widest" style={{ fontFamily: 'monospace', textDecoration: 'line-through', fontStyle: 'italic' }}>
                                                {generatedCaptcha}
                                            </span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={refreshCaptcha}
                                            aria-label="Refresh captcha"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Input
                                        id="captcha"
                                        placeholder="উপরের ক্যাপচাটি লিখুন"
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full" size="lg">
                                    <Search className="mr-2 h-5 w-5" />
                                    ফলাফল দেখুন
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
