
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Clock } from "lucide-react";

const routineData = {
  "১০ম শ্রেণী": {
    "রবিবার": [
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "পদার্থবিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "জীববিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
      { subject: "উচ্চতর গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
    ],
    "সোমবার": [
      { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
      { subject: "উচ্চতর গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "রসায়ন", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "পদার্থবিজ্ঞান", teacher: "সালমা চৌধুরী" },
    ],
    "মঙ্গলবার": [
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "পদার্থবিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "রসায়ন", teacher: "সালমা চৌধুরী" },
        { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
        { subject: "ধর্ম ও নৈতিক শিক্ষা", teacher: "মোঃ আব্দুল্লাহ আল-আমিন" },
        { subject: "জীববিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
    ],
    "বুধবার": [
        { subject: "উচ্চতর গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "জীববিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
        { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
        { subject: "সাধারণ বিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "রসায়ন", teacher: "সালমা চৌধুরী" },
    ],
    "বৃহস্পতিবার": [
        { subject: "পদার্থবিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "রসায়ন", teacher: "সালমা চৌধুরী" },
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
        { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
        { subject: "উচ্চতর গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
    ],
  },
  "৯ম শ্রেণী": {
    "রবিবার": [
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "পদার্থবিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "জীববিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
      { subject: "উচ্চতর গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
    ],
    "সোমবার": [
      { subject: "উচ্চতর গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
      { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "রসায়ন", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "পদার্থবিজ্ঞান", teacher: "সালমা চৌধুরী" },
    ],
    "মঙ্গলবার": [
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "পদার্থবিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "রসায়ন", teacher: "সালমা চৌধুরী" },
        { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
        { subject: "ধর্ম ও নৈতিক শিক্ষা", teacher: "মোঃ আব্দুল্লাহ আল-আমিন" },
        { subject: "জীববিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
    ],
    "বুধবার": [
        { subject: "উচ্চতর গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "জীববিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
        { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
        { subject: "সাধারণ বিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "রসায়ন", teacher: "সালমা চৌধুরী" },
    ],
    "বৃহস্পতিবার": [
        { subject: "পদার্থবিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "রসায়ন", teacher: "সালমা চৌধুরী" },
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
        { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
        { subject: "উচ্চতর গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
    ],
  },
  "৮ম শ্রেণী": {
    "রবিবার": [
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
    ],
    "সোমবার": [
      { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
    ],
    "মঙ্গলবার": [
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
        { subject: "ধর্ম ও নৈতিক শিক্ষা", teacher: "মোঃ আব্দুল্লাহ আল-আমিন" },
        { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
        { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
    ],
    "বুধবার": [
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
        { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
        { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
        { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
    ],
    "বৃহস্পতিবার": [
        { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
        { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
        { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
        { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
        { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
        { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
        { subject: "ধর্ম ও নৈতিক শিক্ষা", teacher: "মোঃ আব্দুল্লাহ আল-আমিন" },
        { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
    ],
  },
  "৭ম শ্রেণী": {
    "রবিবার": [
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
    ],
    "সোমবার": [
      { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
    ],
    "মঙ্গলবার": [
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "ধর্ম ও নৈতিক শিক্ষা", teacher: "মোঃ আব্দুল্লাহ আল-আমিন" },
      { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
    ],
    "বুধবার": [
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
    ],
    "বৃহস্পতিবার": [
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "ধর্ম ও নৈতিক শিক্ষা", teacher: "মোঃ আব্দুল্লাহ আল-আমিন" },
      { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
    ],
  },
  "৬ষ্ঠ শ্রেণী": {
    "রবিবার": [
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
    ],
    "সোমবার": [
      { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
    ],
    "মঙ্গলবার": [
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "ধর্ম ও নৈতিক শিক্ষা", teacher: "মোঃ আব্দুল্লাহ আল-আমিন" },
      { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
    ],
    "বুধবার": [
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "বাংলা ২য় পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ২য় পত্র", teacher: "কামরুল হাসান" },
      { subject: "বাংলাদেশ ও বিশ্ব পরিচয়", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", teacher: "কামরুল হাসান" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
    ],
    "বৃহস্পতিবার": [
      { subject: "বিজ্ঞান", teacher: "সালমা চৌধুরী" },
      { subject: "গণিত", teacher: "রহিম উদ্দিন আহমেদ" },
      { subject: "বাংলা ১ম পত্র", teacher: "আয়েশা সিদ্দিকা" },
      { subject: "ইংরেজি ১ম পত্র", teacher: "কামরুল হাসান" },
      { subject: "কৃষি শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "শারীরিক শিক্ষা", teacher: "আরিফুল ইসলাম" },
      { subject: "ধর্ম ও নৈতিক শিক্ষা", teacher: "মোঃ আব্দুল্লাহ আল-আমিন" },
      { subject: "চারু ও কারুকলা", teacher: "আরিফুল ইসলাম" },
    ],
  },
};
const periods = ["১ম", "২য়", "৩য়", "৪র্থ", "৫ম", "৬ষ্ঠ", "৭ম", "৮ম"];
const times = [
  "০৯:০০ - ০৯:৪০",
  "০৯:৪০ - ১০:২০",
  "১০:২০ - ১১:০০",
  "১১:০০ - ১১:৪০",
  "১২:৩০ - ০১:১০",
  "০১:১০ - ০১:৫০",
  "০১:৫০ - ০২:৩০",
  "০২:৩০ - ০৩:১০",
];
const days = Object.keys(routineData["১০ম শ্রেণী"]);
const classes = Object.keys(routineData);

export default function RoutinePage() {
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary font-headline">ক্লাস রুটিন</h1>
          <p className="text-muted-foreground mt-2">আমাদের প্রতিষ্ঠানের শ্রেণীভিত্তিক সময়সূচী</p>
        </div>

        <Tabs defaultValue={selectedClass} onValueChange={setSelectedClass}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {classes.map((c) => (
                <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {classes.map((c) => (
            <TabsContent key={c} value={c}>
              <Card className="shadow-lg border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary font-headline text-center">{c} রুটিন</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table className="border">
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="border w-[120px] text-center font-bold">বার/সময়</TableHead>
                          {periods.map((period, index) => (
                            <TableHead key={period} className="border text-center font-bold">
                                <div className="flex flex-col items-center">
                                    <span>{period} পিরিয়ড</span>
                                    <span className="text-xs font-normal text-muted-foreground">{times[index]}</span>
                                </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {days.map(day => (
                          <TableRow key={day}>
                            <TableCell className="border font-bold text-center">{day}</TableCell>
                            {routineData[c][day]?.map((session, index) => (
                              <TableCell key={index} className="border p-2 text-center align-top">
                                <div className="flex flex-col h-full justify-center">
                                    <p className="font-semibold text-foreground">{session.subject}</p>
                                    <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-1">
                                        <User className="h-3 w-3" />
                                        <span>{session.teacher}</span>
                                    </div>
                                </div>
                              </TableCell>
                            )) || <TableCell colSpan={periods.length} className="text-center border">ছুটি</TableCell>}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

    

    