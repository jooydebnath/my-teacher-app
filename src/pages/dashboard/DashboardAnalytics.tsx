import { motion } from "framer-motion";
import { TrendingUp, Clock, Target, Award } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const monthlyGrowth = [
  { month: "জানু", students: 200, active: 150 },
  { month: "ফেব্রু", students: 350, active: 280 },
  { month: "মার্চ", students: 520, active: 400 },
  { month: "এপ্রি", students: 780, active: 620 },
  { month: "মে", students: 980, active: 750 },
  { month: "জুন", students: 1245, active: 876 },
];

const classDistribution = [
  { name: "ক্লাস ৬", value: 180 },
  { name: "ক্লাস ৭", value: 250 },
  { name: "ক্লাস ৮", value: 350 },
  { name: "ক্লাস ৯-১০", value: 320 },
  { name: "ক্লাস ১১-১২", value: 145 },
];

const COLORS = [
  "hsl(38 90% 55%)",
  "hsl(270 50% 55%)",
  "hsl(142 55% 45%)",
  "hsl(25 95% 55%)",
  "hsl(200 70% 50%)",
];

const completionData = [
  { week: "সপ্তাহ ১", rate: 45 },
  { week: "সপ্তাহ ২", rate: 52 },
  { week: "সপ্তাহ ৩", rate: 48 },
  { week: "সপ্তাহ ৪", rate: 61 },
  { week: "সপ্তাহ ৫", rate: 58 },
  { week: "সপ্তাহ ৬", rate: 67 },
];

const metricCards = [
  { label: "গড় সেশন সময়", value: "১৮ মিনিট", icon: Clock, color: "bg-primary/15 text-primary" },
  { label: "MCQ সঠিক হার", value: "৭২%", icon: Target, color: "bg-success/15 text-success" },
  { label: "সাপ্তাহিক বৃদ্ধি", value: "+২৭%", icon: TrendingUp, color: "bg-secondary/15 text-secondary" },
  { label: "প্রিমিয়াম রূপান্তর", value: "১৮%", icon: Award, color: "bg-streak/15 text-streak" },
];

const DashboardAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">অ্যানালিটিক্স</h1>
        <p className="text-sm text-muted-foreground mt-0.5">বিস্তারিত পরিসংখ্যান ও প্রবণতা</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border/50 bg-card p-4 flex items-center gap-4"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.color}`}>
              <m.icon size={22} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">মাসিক ব্যবহারকারী বৃদ্ধি</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
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
              <Line type="monotone" dataKey="students" stroke="hsl(38 90% 55%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(38 90% 55%)" }} name="মোট" />
              <Line type="monotone" dataKey="active" stroke="hsl(270 50% 55%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(270 50% 55%)" }} name="সক্রিয়" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">ক্লাস বিভাজন</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={classDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {classDistribution.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
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
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {classDistribution.map((cls, i) => (
              <div key={cls.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[10px] text-muted-foreground">{cls.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completion rate */}
      <div className="rounded-2xl border border-border/50 bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">সাপ্তাহিক কমপ্লিশন রেট</h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={completionData}>
            <defs>
              <linearGradient id="completionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142 55% 45%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(142 55% 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
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
            <Area type="monotone" dataKey="rate" stroke="hsl(142 55% 45%)" fill="url(#completionGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
