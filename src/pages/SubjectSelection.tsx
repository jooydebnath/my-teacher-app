import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calculator, FlaskConical, Globe, Monitor, Languages, Flame } from "lucide-react";
import { subjects } from "@/data/mockData";
import BottomNav from "@/components/BottomNav";

const iconMap: Record<string, any> = {
  BookOpen, Languages, Calculator, FlaskConical, Monitor, Globe,
};

const colorMap: Record<string, string> = {
  "bangla": "from-emerald-500 to-emerald-600",
  "english": "from-blue-500 to-blue-600",
  "math": "from-amber-500 to-orange-500",
  "science": "from-purple-500 to-purple-600",
  "ict": "from-cyan-500 to-cyan-600",
  "bgs": "from-rose-500 to-rose-600",
};

const SubjectSelection = () => {
  const navigate = useNavigate();
  const selectedClass = localStorage.getItem("selectedClass") || "class-8";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 pb-8 pt-10 rounded-b-[2rem]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/70 text-sm">আসসালামু আলাইকুম 👋</p>
            <h1 className="text-xl font-bold text-primary-foreground mt-0.5">শিক্ষার্থী</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary-foreground/20 px-3 py-1.5">
            <Flame size={16} className="text-secondary" />
            <span className="text-sm font-semibold text-primary-foreground">১২ দিন</span>
          </div>
        </div>

        {/* Class badge */}
        <div className="mt-4 rounded-xl bg-primary-foreground/10 p-3 backdrop-blur-sm">
          <p className="text-primary-foreground/80 text-xs">তোমার ক্লাস</p>
          <p className="text-primary-foreground font-semibold">
            ক্লাস ৮ — NCTB কারিকুলাম
          </p>
        </div>
      </div>

      {/* Subject grid */}
      <div className="px-5 -mt-4">
        <h2 className="mb-4 text-base font-semibold text-foreground">বিষয় নির্বাচন করো</h2>
        <div className="grid grid-cols-2 gap-3">
          {subjects.map((subject, i) => {
            const Icon = iconMap[subject.icon] || BookOpen;
            const gradient = colorMap[subject.id] || "from-gray-500 to-gray-600";
            return (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/chapters/${subject.id}`)}
                className="relative overflow-hidden rounded-2xl bg-card p-4 text-left shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}>
                  <Icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-tight">{subject.name}</h3>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                    <span>সম্পন্ন</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SubjectSelection;
