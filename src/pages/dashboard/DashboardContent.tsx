import { motion } from "framer-motion";
import { BookOpen, Plus, Edit, Eye, Trash2 } from "lucide-react";
import { subjects, chapters } from "@/data/mockData";

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">কন্টেন্ট ম্যানেজমেন্ট</h1>
          <p className="text-sm text-muted-foreground mt-0.5">বিষয়, অধ্যায় ও টপিক পরিচালনা</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus size={16} />
          নতুন কন্টেন্ট
        </button>
      </div>

      {/* Subject cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border/50 bg-card p-5 hover:border-primary/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                <BookOpen size={18} className="text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">৬ অধ্যায়</span>
            </div>
            <h3 className="text-base font-semibold text-foreground">{subject.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">ক্লাস ৬-১০ • NCTB</p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full gradient-amber" style={{ width: `${subject.progress}%` }} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{subject.progress}% কন্টেন্ট সম্পন্ন</p>
          </motion.div>
        ))}
      </div>

      {/* Chapters table */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border/50">
          <h2 className="text-sm font-semibold text-foreground">সাম্প্রতিক অধ্যায়সমূহ</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["অধ্যায়", "টপিক", "অগ্রগতি", "স্ট্যাটাস", "অ্যাকশন"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chapters.map((ch, i) => (
                <motion.tr
                  key={ch.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/30 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{ch.title}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ch.topicCount} টি</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full gradient-amber" style={{ width: `${ch.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{ch.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        ch.locked
                          ? "bg-destructive/15 text-destructive"
                          : "bg-success/15 text-success"
                      }`}
                    >
                      {ch.locked ? "লক" : "আনলক"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
