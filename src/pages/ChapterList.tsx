import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle2, BookOpen } from "lucide-react";
import { chapters, subjects } from "@/data/mockData";
import BottomNav from "@/components/BottomNav";

const ChapterList = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const subject = subjects.find((s) => s.id === subjectId);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 glass-card px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-muted transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{subject?.name || "বিষয়"}</h1>
            <p className="text-xs text-muted-foreground">সকল অধ্যায়</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {chapters.map((chapter, i) => (
          <motion.button
            key={chapter.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => !chapter.locked && navigate(`/topics/${subjectId}/${chapter.id}`)}
            disabled={chapter.locked}
            className={`w-full rounded-2xl border p-4 text-left transition-all ${
              chapter.locked
                ? "border-border bg-muted/30 opacity-50"
                : "border-border/50 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{chapter.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{chapter.topicCount}টি টপিক</p>
              </div>
              {chapter.locked ? (
                <Lock size={18} className="text-muted-foreground" />
              ) : chapter.progress === 100 ? (
                <CheckCircle2 size={18} className="text-success" />
              ) : (
                <BookOpen size={18} className="text-primary" />
              )}
            </div>
            {!chapter.locked && (
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>অগ্রগতি</span>
                  <span>{chapter.progress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-amber transition-all duration-500"
                    style={{ width: `${chapter.progress}%` }}
                  />
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChapterList;
