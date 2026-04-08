import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";
import { topics, chapters } from "@/data/mockData";
import BottomNav from "@/components/BottomNav";

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "সম্পন্ন" },
  "in-progress": { icon: Clock, color: "text-secondary", bg: "bg-secondary/10", label: "চলমান" },
  "not-started": { icon: Circle, color: "text-muted-foreground", bg: "bg-muted", label: "শুরু হয়নি" },
};

const TopicList = () => {
  const navigate = useNavigate();
  const { subjectId, chapterId } = useParams();
  const chapter = chapters.find((c) => c.id === chapterId);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 glass-card px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-muted transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-base font-bold text-foreground">{chapter?.title || "অধ্যায়"}</h1>
            <p className="text-xs text-muted-foreground">{topics.length}টি টপিক</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {topics.map((topic, i) => {
          const status = statusConfig[topic.status];
          const StatusIcon = status.icon;
          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/learn/${subjectId}/${chapterId}/${topic.id}`)}
              className="w-full flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 text-left shadow-sm hover:shadow-md transition-all"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${status.bg}`}>
                <StatusIcon size={20} className={status.color} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-foreground">{topic.title}</h3>
                <span className={`text-[10px] font-medium ${status.color}`}>{status.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default TopicList;
