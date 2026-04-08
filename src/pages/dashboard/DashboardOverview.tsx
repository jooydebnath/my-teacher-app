import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Flame,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { subjects, leaderboardData } from "@/data/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const activityData = [
  { day: "শনি", users: 120 },
  { day: "রবি", users: 180 },
  { day: "সোম", users: 250 },
  { day: "মঙ্গল", users: 220 },
  { day: "বুধ", users: 310 },
  { day: "বৃহঃ", users: 280 },
  { day: "শুক্র", users: 350 },
];

const subjectEngagement = subjects.map((s) => ({
  name: s.name.length > 6 ? s.name.slice(0, 6) + "…" : s.name,
  value: Math.floor(Math.random() * 80) + 20,
}));

const stats = [
  {
    label: "মোট শিক্ষার্থী",
    value: "১,২৪৫",
    change: "+১২%",
    up: true,
    icon: Users,
    color: "bg-primary/15 text-primary",
  },
  {
    label: "সক্রিয় ব্যবহারকারী",
    value: "৮৭৬",
    change: "+৮%",
    up: true,
    icon: TrendingUp,
    color: "bg-success/15 text-success",
  },
  {
    label: "সম্পন্ন টপিক",
    value: "৩,৪৫০",
    change: "+২৩%",
    up: true,
    icon: BookOpen,
    color: "bg-secondary/15 text-secondary",
  },
  {
    label: "গড় স্ট্রিক",
    value: "৮.৫ দিন",
    change: "-২%",
    up: false,
    icon: Flame,
    color: "bg-streak/15 text-streak",
  },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">ড্যাশবোর্ড</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          My Teacher অ্যাপের সামগ্রিক পরিসংখ্যান
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border/50 bg-card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold ${
                  stat.up ? "text-success" : "text-destructive"
                }`}
              >
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity chart */}
        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">সাপ্তাহিক অ্যাক্টিভিটি</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(38 90% 55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(38 90% 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Area type="monotone" dataKey="users" stroke="hsl(38 90% 55%)" fill="url(#areaGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject engagement */}
        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">বিষয়ভিত্তিক এনগেজমেন্ট</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={subjectEngagement} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="value" fill="hsl(270 50% 55%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top students */}
        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">শীর্ষ শিক্ষার্থী</h2>
          <div className="space-y-2.5">
            {leaderboardData.slice(0, 5).map((user) => (
              <div
                key={user.rank}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3 border border-border/30"
              >
                <span className="text-xs font-bold text-muted-foreground w-5">#{user.rank}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
                  <span className="text-xs font-bold text-primary">{user.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={12} className="text-primary" />
                  <span className="text-xs font-semibold text-foreground">{user.streak}</span>
                </div>
                <span className="text-xs text-muted-foreground">{user.score} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject progress */}
        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">বিষয়ভিত্তিক অগ্রগতি</h2>
          <div className="space-y-4">
            {subjects.map((sub) => (
              <div key={sub.id}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-foreground font-medium">{sub.name}</span>
                  <span className="text-muted-foreground">{sub.progress}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sub.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full gradient-amber"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
