import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const students = [
  { id: 1, name: "রাফি আহমেদ", class: "ক্লাস ৮", streak: 45, score: 980, progress: 85, status: "premium" },
  { id: 2, name: "তানিয়া আক্তার", class: "ক্লাস ৯", streak: 38, score: 920, progress: 72, status: "premium" },
  { id: 3, name: "সাকিব হাসান", class: "ক্লাস ৭", streak: 35, score: 890, progress: 68, status: "free" },
  { id: 4, name: "নুসরাত জাহান", class: "ক্লাস ৮", streak: 30, score: 850, progress: 60, status: "premium" },
  { id: 5, name: "আরিফ ইসলাম", class: "ক্লাস ১০", streak: 28, score: 820, progress: 55, status: "free" },
  { id: 6, name: "মিথিলা রহমান", class: "ক্লাস ৬", streak: 25, score: 780, progress: 48, status: "free" },
  { id: 7, name: "কামরুল হাসান", class: "ক্লাস ৮", streak: 20, score: 700, progress: 40, status: "premium" },
  { id: 8, name: "ফারিয়া আলম", class: "ক্লাস ৯", streak: 18, score: 650, progress: 35, status: "free" },
];

const DashboardStudents = () => {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) => s.name.includes(search));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">শিক্ষার্থী</h1>
        <p className="text-sm text-muted-foreground mt-0.5">সকল শিক্ষার্থীর তালিকা ও তথ্য</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 rounded-xl bg-card px-3 py-2.5 border border-border/50">
          <Search size={14} className="text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম দিয়ে খুঁজুন..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-card px-4 py-2.5 border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Filter size={14} />
          ফিল্টার
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["নাম", "ক্লাস", "স্ট্রিক", "স্কোর", "অগ্রগতি", "প্ল্যান", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-border/30 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
                        <span className="text-xs font-bold text-primary">{student.name.charAt(0)}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{student.class}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Flame size={12} className="text-primary" />
                      <span className="text-sm font-semibold text-foreground">{student.streak}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{student.score}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full gradient-amber" style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        student.status === "premium"
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {student.status === "premium" ? "প্রিমিয়াম" : "ফ্রি"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">মোট {filtered.length} জন</span>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
              ১
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudents;
