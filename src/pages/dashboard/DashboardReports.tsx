import { motion } from "framer-motion";
import {
  FileText,
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Download,
  Eye,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const reportTypes = [
  {
    title: "শিক্ষার্থী রিপোর্ট",
    description: "সকল শিক্ষার্থীর অগ্রগতি, স্ট্রিক ও কার্যকলাপ বিশ্লেষণ",
    icon: Users,
    color: "bg-primary/15 text-primary",
  },
  {
    title: "কন্টেন্ট রিপোর্ট",
    description: "বিষয়, অধ্যায় ও টপিকের ব্যবহার পরিসংখ্যান",
    icon: BookOpen,
    color: "bg-secondary/15 text-secondary",
  },
  {
    title: "রেভিনিউ রিপোর্ট",
    description: "সাবস্ক্রিপশন আয়, পেমেন্ট ও প্ল্যান বিশ্লেষণ",
    icon: DollarSign,
    color: "bg-success/15 text-success",
  },
  {
    title: "পারফরম্যান্স রিপোর্ট",
    description: "MCQ স্কোর, পাস রেট ও সময় বিশ্লেষণ",
    icon: TrendingUp,
    color: "bg-streak/15 text-streak",
  },
];

const recentReports = [
  { id: 1, name: "মাসিক শিক্ষার্থী রিপোর্ট — মার্চ ২০২৬", type: "শিক্ষার্থী", date: "০১ এপ্রিল ২০২৬", status: "সম্পন্ন" },
  { id: 2, name: "কন্টেন্ট ব্যবহার রিপোর্ট — Q1 ২০২৬", type: "কন্টেন্ট", date: "২৮ মার্চ ২০২৬", status: "সম্পন্ন" },
  { id: 3, name: "রেভিনিউ সামারি — মার্চ ২০২৬", type: "রেভিনিউ", date: "২৫ মার্চ ২০২৬", status: "সম্পন্ন" },
  { id: 4, name: "সাপ্তাহিক পারফরম্যান্স রিপোর্ট", type: "পারফরম্যান্স", date: "০৭ এপ্রিল ২০২৬", status: "প্রসেসিং" },
  { id: 5, name: "শিক্ষার্থী ড্রপ-অফ বিশ্লেষণ", type: "শিক্ষার্থী", date: "০৫ এপ্রিল ২০২৬", status: "সম্পন্ন" },
];

const DashboardReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
          <FileText size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">রিপোর্ট</h1>
          <p className="text-sm text-muted-foreground">বিভিন্ন রিপোর্ট তৈরি ও ডাউনলোড করুন</p>
        </div>
      </div>

      {/* Report type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reportTypes.map((report, i) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-4"
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${report.color}`}>
                <report.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-foreground">{report.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 gap-1.5 rounded-xl text-xs">
                <Eye size={14} /> দেখুন
              </Button>
              <Button size="sm" className="flex-1 gap-1.5 rounded-xl text-xs">
                <Download size={14} /> ডাউনলোড
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent reports */}
      <div className="rounded-2xl border border-border/50 bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">সাম্প্রতিক রিপোর্ট</h2>
        <div className="space-y-2">
          {recentReports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-xl bg-muted/20 p-3 border border-border/30 hover:bg-muted/30 transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{report.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground">{report.type}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={10} /> {report.date}
                  </span>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                report.status === "সম্পন্ন"
                  ? "bg-success/15 text-success"
                  : "bg-primary/15 text-primary"
              }`}>
                {report.status === "সম্পন্ন" ? <CheckCircle size={10} /> : <Clock size={10} />}
                {report.status}
              </span>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Download size={14} />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardReports;
