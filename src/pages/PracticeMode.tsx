import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { topicContent } from "@/data/mockData";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";

const PracticeMode = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const mcqs = topicContent.mcqs;
  const total = mcqs.length;
  const currentMcq = mcqs[currentQ];

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === currentMcq.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-4 flex h-24 w-24 items-center justify-center rounded-full gradient-primary"
        >
          <Trophy size={48} className="text-primary-foreground" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground"
        >
          প্র্যাকটিস সম্পন্ন! 🎉
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 w-full max-w-xs rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm"
        >
          <p className="text-4xl font-bold text-gradient">{score}/{total}</p>
          <p className="mt-1 text-sm text-muted-foreground">{pct}% সঠিক</p>
          <div className="mt-4 flex gap-4 justify-center text-sm">
            <div className="flex items-center gap-1 text-success">
              <CheckCircle2 size={14} /> {score} সঠিক
            </div>
            <div className="flex items-center gap-1 text-destructive">
              <XCircle size={14} /> {total - score} ভুল
            </div>
          </div>
        </motion.div>
        <div className="mt-8 flex w-full max-w-xs gap-3">
          <button
            onClick={() => { setCurrentQ(0); setScore(0); setFinished(false); setSelected(null); setRevealed(false); }}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm font-semibold text-foreground"
          >
            <RotateCcw size={16} /> আবার করো
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 rounded-2xl gradient-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            ফিরে যাও
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-card px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-muted transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <span className="text-sm font-semibold text-foreground">
            {currentQ + 1} / {total}
          </span>
          <div className="text-sm font-bold text-primary">{score} পয়েন্ট</div>
        </div>
        {/* Progress */}
        <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            animate={{ width: `${((currentQ + 1) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="mb-6 text-lg font-semibold text-foreground leading-relaxed">
              {currentMcq.question}
            </h2>

            <div className="space-y-3">
              {currentMcq.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrect = oi === currentMcq.correct;
                let cls = "border-border bg-card";
                if (revealed && isCorrect) cls = "border-success bg-success/10";
                else if (revealed && isSelected && !isCorrect) cls = "border-destructive bg-destructive/10";
                else if (isSelected) cls = "border-primary bg-accent";

                return (
                  <motion.button
                    key={oi}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(oi)}
                    className={`w-full flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${cls}`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-semibold text-muted-foreground">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="text-sm font-medium text-foreground">{opt}</span>
                    {revealed && isCorrect && <CheckCircle2 size={18} className="ml-auto text-success" />}
                    {revealed && isSelected && !isCorrect && <XCircle size={18} className="ml-auto text-destructive" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {revealed && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="mt-8 w-full rounded-2xl gradient-primary py-4 text-primary-foreground font-semibold text-base"
          >
            {currentQ + 1 >= total ? "ফলাফল দেখো" : "পরবর্তী →"}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default PracticeMode;
