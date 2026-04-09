import { motion } from "framer-motion";
import { CreditCard, Users, Crown, DollarSign, Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

const stats = [
  { label: "মোট সাবস্ক্রাইবার", value: "১,২৪৫", icon: Users, color: "bg-primary/15 text-primary" },
  { label: "প্রিমিয়াম", value: "৪৮৭", icon: Crown, color: "bg-secondary/15 text-secondary" },
  { label: "ফ্রি", value: "৭৫৮", icon: Users, color: "bg-muted-foreground/15 text-muted-foreground" },
  { label: "মাসিক রেভিনিউ", value: "৳১,৪৬,১০০", icon: DollarSign, color: "bg-success/15 text-success" },
];

const pieData = [
  { name: "প্রিমিয়াম", value: 487 },
  { name: "ফ্রি", value: 758 },
];
const COLORS = ["hsl(270 50% 55%)", "hsl(var(--muted-foreground))"];

const subscribers = [
  { id: 1, name: "আরিফ হোসেন", plan: "প্রিমিয়াম", method: "বিকাশ", expires: "২০২৬-১০-১৫", status: "সক্রিয়" },
  { id: 2, name: "ফাতিমা আক্তার", plan: "প্রিমিয়াম", method: "নগদ", expires: "২০২৬-০৮-২০", status: "সক্রিয়" },
  { id: 3, name: "রাহাত খান", plan: "ফ্রি", method: "—", expires: "—", status: "সক্রিয়" },
  { id: 4, name: "নুসরাত জাহান", plan: "প্রিমিয়াম", method: "কার্ড", expires: "২০২৬-০৭-০১", status: "সক্রিয়" },
  { id: 5, name: "তানভীর আহমেদ", plan: "ফ্রি", method: "—", expires: "—", status: "সক্রিয়" },
  { id: 6, name: "সাবরিনা ইসলাম", plan: "প্রিমিয়াম", method: "বিকাশ", expires: "২০২৬-০৬-১০", status: "মেয়াদোত্তীর্ণ" },
  { id: 7, name: "মাহমুদ হাসান", plan: "প্রিমিয়াম", method: "নগদ", expires: "২০২৬-১২-৩১", status: "সক্রিয়" },
  { id: 8, name: "রিমা বেগম", plan: "ফ্রি", method: "—", expires: "—", status: "সক্রিয়" },
];

const DashboardSubscriptions = () => {
  const [search, setSearch] = useState("");
  const filtered = subscribers.filter((s) => s.name.includes(search));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
          <CreditCard size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">সাবস্ক্রিপশন</h1>
          <p className="text-sm text-muted-foreground">প্ল্যান ও পেমেন্ট ব্যবস্থাপনা</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border/50 bg-card p-4"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pie chart */}
        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">ফ্রি vs প্রিমিয়াম</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={4}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "hsl(var(--foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-muted-foreground">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 border border-border/50 max-w-sm">
            <Search size={14} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="সাবস্ক্রাইবার খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">নাম</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">প্ল্যান</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">পেমেন্ট</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">মেয়াদ</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub, i) => (
                  <motion.tr
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{sub.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        sub.plan === "প্রিমিয়াম"
                          ? "bg-secondary/15 text-secondary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {sub.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{sub.method}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{sub.expires}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        sub.status === "সক্রিয়"
                          ? "bg-success/15 text-success"
                          : "bg-destructive/15 text-destructive"
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSubscriptions;
