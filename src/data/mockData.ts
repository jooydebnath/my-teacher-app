import { BookOpen, Calculator, FlaskConical, Globe, Monitor, Languages } from "lucide-react";

export const classes = [
  { id: "class-6", name: "ক্লাস ৬", label: "৬" },
  { id: "class-7", name: "ক্লাস ৭", label: "৭" },
  { id: "class-8", name: "ক্লাস ৮", label: "৮" },
  { id: "class-9-10", name: "ক্লাস ৯-১০", label: "৯-১০" },
  { id: "class-11-12", name: "ক্লাস ১১-১২", label: "১১-১২" },
];

export const subjects = [
  { id: "bangla", name: "বাংলা", icon: "BookOpen", color: "160 60% 28%", progress: 45 },
  { id: "english", name: "ইংরেজি", icon: "Languages", color: "220 70% 50%", progress: 30 },
  { id: "math", name: "গণিত", icon: "Calculator", color: "38 90% 55%", progress: 60 },
  { id: "science", name: "বিজ্ঞান", icon: "FlaskConical", color: "280 60% 50%", progress: 25 },
  { id: "ict", name: "তথ্য ও যোগাযোগ প্রযুক্তি", icon: "Monitor", color: "200 70% 50%", progress: 15 },
  { id: "bgs", name: "বাংলাদেশ ও বিশ্বপরিচয়", icon: "Globe", color: "0 70% 55%", progress: 40 },
];

export const chapters = [
  { id: "ch-1", title: "অধ্যায় ১: গতি", progress: 80, topicCount: 5, locked: false },
  { id: "ch-2", title: "অধ্যায় ২: বল ও চাপ", progress: 50, topicCount: 6, locked: false },
  { id: "ch-3", title: "অধ্যায় ৩: পদার্থের অবস্থা", progress: 20, topicCount: 4, locked: false },
  { id: "ch-4", title: "অধ্যায় ৪: শব্দ", progress: 0, topicCount: 5, locked: false },
  { id: "ch-5", title: "অধ্যায় ৫: আলো", progress: 0, topicCount: 7, locked: true },
  { id: "ch-6", title: "অধ্যায় ৬: তাপ", progress: 0, topicCount: 4, locked: true },
];

export const topics = [
  { id: "t-1", title: "গতি কী?", status: "completed" as const },
  { id: "t-2", title: "দ্রুতি ও বেগ", status: "completed" as const },
  { id: "t-3", title: "ত্বরণ", status: "in-progress" as const },
  { id: "t-4", title: "গতির সমীকরণ", status: "not-started" as const },
  { id: "t-5", title: "পড়ন্ত বস্তুর গতি", status: "not-started" as const },
];

export const topicContent = {
  title: "ত্বরণ",
  explanation: `ধরো তুমি সাইকেল চালাচ্ছো। প্রথমে ধীরে ধীরে চালাচ্ছো, তারপর জোরে জোরে চালাতে শুরু করলে। তোমার বেগ বাড়ছে, তাই না? এই যে বেগ বাড়ার হার — এটাকেই আমরা বলি ত্বরণ। সহজ কথায়, একক সময়ে বেগের যে পরিবর্তন হয়, তাকে ত্বরণ বলে। যদি তোমার বেগ কমে যায়, তাহলে সেটাকে বলি মন্দন বা ঋণাত্মক ত্বরণ। মনে রাখবে, ত্বরণ একটি ভেক্টর রাশি — এর মান এবং দিক দুটোই আছে।`,
  keyPoints: [
    { label: "সংজ্ঞা", text: "একক সময়ে বেগের পরিবর্তনের হারকে ত্বরণ বলে।" },
    { label: "সূত্র", text: "ত্বরণ (a) = (শেষ বেগ - আদি বেগ) / সময় = (v - u) / t" },
    { label: "একক", text: "মিটার/সেকেন্ড² (m/s²)" },
    { label: "প্রকারভেদ", text: "ধনাত্মক ত্বরণ (বেগ বাড়ে), ঋণাত্মক ত্বরণ/মন্দন (বেগ কমে)" },
  ],
  cqs: [
    "একটি গাড়ি স্থির অবস্থান থেকে যাত্রা শুরু করে ১০ সেকেন্ডে ২০ মি/সে বেগ প্রাপ্ত হলো। গাড়িটির ত্বরণ নির্ণয় করো এবং ব্যাখ্যা করো।",
  ],
  mcqs: [
    {
      id: "m1", question: "ত্বরণের একক কী?",
      options: ["m/s", "m/s²", "km/h", "N"],
      correct: 1,
    },
    {
      id: "m2", question: "বেগ কমে গেলে ত্বরণকে কী বলে?",
      options: ["ধনাত্মক ত্বরণ", "মন্দন", "সুষম বেগ", "দ্রুতি"],
      correct: 1,
    },
    {
      id: "m3", question: "ত্বরণ কোন ধরনের রাশি?",
      options: ["স্কেলার", "ভেক্টর", "মৌলিক", "লব্ধ"],
      correct: 1,
    },
    {
      id: "m4", question: "a = (v - u) / t সূত্রে 'u' দ্বারা কী বোঝায়?",
      options: ["শেষ বেগ", "আদি বেগ", "ত্বরণ", "সময়"],
      correct: 1,
    },
    {
      id: "m5", question: "কোনটি ত্বরণের উদাহরণ?",
      options: ["সুষম বেগে চলা গাড়ি", "ব্রেক করা গাড়ি", "স্থির বস্তু", "সমবেগে ঘূর্ণন"],
      correct: 1,
    },
  ],
  sqs: [
    "ত্বরণ বলতে কী বোঝ?",
    "ত্বরণ ও মন্দনের মধ্যে পার্থক্য লেখো।",
    "ত্বরণের সূত্র লেখো এবং প্রতীকগুলো ব্যাখ্যা করো।",
  ],
};

export const leaderboardData = [
  { rank: 1, name: "রাফি আহমেদ", streak: 45, score: 980 },
  { rank: 2, name: "তানিয়া আক্তার", streak: 38, score: 920 },
  { rank: 3, name: "সাকিব হাসান", streak: 35, score: 890 },
  { rank: 4, name: "নুসরাত জাহান", streak: 30, score: 850 },
  { rank: 5, name: "আরিফ ইসলাম", streak: 28, score: 820 },
  { rank: 6, name: "মিথিলা রহমান", streak: 25, score: 780 },
  { rank: 7, name: "তুমি", streak: 12, score: 450, isUser: true },
];
