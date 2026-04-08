import { motion } from "framer-motion";
import { User, Flame, Award, BookOpen, Settings, Crown, ChevronRight } from "lucide-react";
import { subjects } from "@/data/mockData";
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile header */}
      <div className="gradient-primary px-6 pb-10 pt-10 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur-sm">
            <User size={32} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">শিক্ষার্থী</h1>
            <p className="text-sm text-primary-foreground/70">ক্লাস ৮ • ফ্রি প্ল্যান</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: Flame, label: "স্ট্রিক", value: "১২ দিন", color: "text-secondary" },
            { icon: Award, label: "স্কোর", value: "৪৫০", color: "text-primary-foreground" },
            { icon: BookOpen, label: "সম্পন্ন", value: "৩৫%", color: "text-primary-foreground" },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl bg-primary-foreground/10 p-3 text-center backdrop-blur-sm">
              <stat.icon size={20} className={`mx-auto ${stat.color}`} />
              <p className="mt-1 text-lg font-bold text-primary-foreground">{stat.value}</p>
              <p className="text-[10px] text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-4">
        {/* Premium CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex items-center gap-3 rounded-2xl gradient-amber p-4 shadow-md"
        >
          <Crown size={24} className="text-primary-foreground" />
          <div className="flex-1 text-left">
            <p className="font-bold text-primary-foreground text-sm">প্রিমিয়াম আনলক করো</p>
            <p className="text-xs text-primary-foreground/80">সব কন্টেন্ট, ভিডিও ক্লাস ও প্র্যাকটিস</p>
          </div>
          <ChevronRight size={18} className="text-primary-foreground/70" />
        </motion.button>

        {/* Subject progress */}
        <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
          <h2 className="mb-3 font-bold text-foreground text-sm">বিষয়ভিত্তিক অগ্রগতি</h2>
          <div className="space-y-3">
            {subjects.map((sub) => (
              <div key={sub.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground font-medium">{sub.name}</span>
                  <span className="text-muted-foreground">{sub.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-primary transition-all duration-700"
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings link */}
        <button className="w-full flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
          <Settings size={20} className="text-muted-foreground" />
          <span className="flex-1 text-left text-sm font-medium text-foreground">সেটিংস</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
