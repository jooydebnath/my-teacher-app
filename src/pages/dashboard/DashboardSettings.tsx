import { motion } from "framer-motion";
import { Settings, Bell, Shield, BookOpen, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const DashboardSettings = () => {
  const [appName, setAppName] = useState("My Teacher");
  const [tagline, setTagline] = useState("বই না বুঝলে, My Teacher খুলে দেখো");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [defaultClass, setDefaultClass] = useState("১০ম");
  const [mcqCount, setMcqCount] = useState("10");

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
          <Settings size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">সেটিংস</h1>
          <p className="text-sm text-muted-foreground">প্ল্যাটফর্ম কনফিগারেশন</p>
        </div>
      </div>

      {/* Platform settings */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border/50 bg-card p-5 space-y-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={16} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">প্ল্যাটফর্ম সেটিংস</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">অ্যাপের নাম</label>
            <Input value={appName} onChange={(e) => setAppName(e.target.value)} className="rounded-xl" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">ট্যাগলাইন</label>
            <Input value={tagline} onChange={(e) => setTagline(e.target.value)} className="rounded-xl" />
          </div>
        </div>
      </motion.div>

      {/* Notification settings */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-2xl border border-border/50 bg-card p-5 space-y-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <Bell size={16} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">নোটিফিকেশন সেটিংস</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-muted/20 p-3 border border-border/30">
            <div>
              <p className="text-sm font-medium text-foreground">ইমেইল নোটিফিকেশন</p>
              <p className="text-xs text-muted-foreground">নতুন রেজিস্ট্রেশন ও রিপোর্টের ইমেইল পান</p>
            </div>
            <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-muted/20 p-3 border border-border/30">
            <div>
              <p className="text-sm font-medium text-foreground">পুশ নোটিফিকেশন</p>
              <p className="text-xs text-muted-foreground">রিয়েল-টাইম অ্যালার্ট পান</p>
            </div>
            <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-muted/20 p-3 border border-border/30">
            <div>
              <p className="text-sm font-medium text-foreground">সাপ্তাহিক সামারি</p>
              <p className="text-xs text-muted-foreground">প্রতি সপ্তাহে সামারি রিপোর্ট পান</p>
            </div>
            <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
          </div>
        </div>
      </motion.div>

      {/* Content settings */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="rounded-2xl border border-border/50 bg-card p-5 space-y-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={16} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">কন্টেন্ট সেটিংস</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">ডিফল্ট ক্লাস</label>
            <select
              value={defaultClass}
              onChange={(e) => setDefaultClass(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {["৬ষ্ঠ", "৭ম", "৮ম", "৯ম", "১০ম", "১১শ", "১২শ"].map((c) => (
                <option key={c} value={c}>{c} শ্রেণি</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">প্রতি প্র্যাকটিসে MCQ সংখ্যা</label>
            <Input
              type="number"
              value={mcqCount}
              onChange={(e) => setMcqCount(e.target.value)}
              min={5}
              max={50}
              className="rounded-xl"
            />
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="rounded-2xl border border-border/50 bg-card p-5 space-y-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <Shield size={16} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">সিকিউরিটি</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">বর্তমান পাসওয়ার্ড</label>
            <Input type="password" placeholder="••••••••" className="rounded-xl" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">নতুন পাসওয়ার্ড</label>
            <Input type="password" placeholder="••••••••" className="rounded-xl" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">পাসওয়ার্ড নিশ্চিত করুন</label>
            <Input type="password" placeholder="••••••••" className="rounded-xl" />
          </div>
        </div>
      </motion.div>

      {/* Save button */}
      <div className="flex justify-end">
        <Button className="gap-2 rounded-xl px-6">
          <Save size={16} /> সংরক্ষণ করুন
        </Button>
      </div>
    </div>
  );
};

export default DashboardSettings;
