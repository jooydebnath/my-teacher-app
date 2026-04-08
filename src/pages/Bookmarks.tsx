import { motion } from "framer-motion";
import { Bookmark, BookOpen } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const savedTopics = [
  { id: "t-1", title: "গতি কী?", subject: "বিজ্ঞান", chapter: "অধ্যায় ১" },
  { id: "t-3", title: "ত্বরণ", subject: "বিজ্ঞান", chapter: "অধ্যায় ১" },
];

const Bookmarks = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-10">
        <h1 className="text-xl font-bold text-foreground">সেভ করা টপিক</h1>
        <p className="text-sm text-muted-foreground mt-1">তোমার বুকমার্ক করা টপিকগুলো</p>
      </div>

      <div className="px-5 py-5 space-y-3">
        {savedTopics.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Bookmark size={48} className="text-muted-foreground/30" />
            <p className="mt-3 text-muted-foreground">কোনো টপিক সেভ করা হয়নি</p>
          </div>
        ) : (
          savedTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <BookOpen size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{topic.title}</h3>
                <p className="text-xs text-muted-foreground">{topic.subject} • {topic.chapter}</p>
              </div>
              <Bookmark size={18} className="fill-secondary text-secondary" />
            </motion.div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Bookmarks;
