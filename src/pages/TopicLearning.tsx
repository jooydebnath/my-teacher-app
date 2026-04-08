import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, Lightbulb, HelpCircle, CheckSquare, Play } from "lucide-react";
import { topicContent } from "@/data/mockData";
import { useState } from "react";

const TopicLearning = () => {
  const navigate = useNavigate();
  const { subjectId, chapterId, topicId } = useParams();
  const [bookmarked, setBookmarked] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleAnswer = (mcqId: string, optionIndex: number) => {
    if (showResults[mcqId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
    setShowResults((prev) => ({ ...prev, [mcqId]: true }));
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-40 glass-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-muted transition-colors">
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <h1 className="text-base font-bold text-foreground">{topicContent.title}</h1>
          </div>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="rounded-full p-2 hover:bg-muted transition-colors"
          >
            <Bookmark size={20} className={bookmarked ? "fill-primary text-primary" : "text-muted-foreground"} />
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Explanation */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border/50 bg-card p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Lightbulb size={16} className="text-primary" />
            </div>
            <h2 className="font-bold text-foreground">ব্যাখ্যা</h2>
          </div>
          <p className="text-sm leading-relaxed text-foreground/85">{topicContent.explanation}</p>
        </motion.section>

        {/* Key Points */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border/50 bg-card p-5"
        >
          <h2 className="mb-3 font-bold text-foreground">📌 মূল পয়েন্ট</h2>
          <div className="space-y-2.5">
            {topicContent.keyPoints.map((kp, i) => (
              <div key={i} className="rounded-xl bg-accent/50 p-3 border border-border/30">
                <span className="text-xs font-semibold text-primary">{kp.label}</span>
                <p className="mt-0.5 text-sm text-foreground/85">{kp.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CQ */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border/50 bg-card p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-amber">
              <HelpCircle size={16} className="text-primary-foreground" />
            </div>
            <h2 className="font-bold text-foreground">সৃজনশীল প্রশ্ন (CQ)</h2>
          </div>
          {topicContent.cqs.map((cq, i) => (
            <p key={i} className="text-sm leading-relaxed text-foreground/85">{cq}</p>
          ))}
        </motion.section>

        {/* MCQ */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border/50 bg-card p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <CheckSquare size={16} className="text-primary" />
            </div>
            <h2 className="font-bold text-foreground">MCQ প্রশ্ন</h2>
          </div>
          <div className="space-y-4">
            {topicContent.mcqs.map((mcq, qi) => (
              <div key={mcq.id} className="rounded-xl bg-muted/50 p-3.5">
                <p className="mb-2.5 text-sm font-medium text-foreground">
                  {qi + 1}. {mcq.question}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {mcq.options.map((opt, oi) => {
                    const isSelected = selectedAnswers[mcq.id] === oi;
                    const revealed = showResults[mcq.id];
                    const isCorrect = oi === mcq.correct;
                    let optClass = "border-border bg-card";
                    if (revealed && isCorrect) optClass = "border-success bg-success/10";
                    else if (revealed && isSelected && !isCorrect) optClass = "border-destructive bg-destructive/10";

                    return (
                      <button
                        key={oi}
                        onClick={() => handleAnswer(mcq.id, oi)}
                        className={`rounded-xl border p-2.5 text-left text-sm transition-all ${optClass}`}
                      >
                        <span className="text-muted-foreground mr-2">{String.fromCharCode(2453 + oi)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SQ */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border/50 bg-card p-5"
        >
          <h2 className="mb-3 font-bold text-foreground">📝 সংক্ষিপ্ত প্রশ্ন</h2>
          <ol className="space-y-2">
            {topicContent.sqs.map((sq, i) => (
              <li key={i} className="text-sm text-foreground/85 pl-1">
                {i + 1}. {sq}
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Practice Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate(`/practice/${subjectId}/${chapterId}/${topicId}`)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl gradient-amber py-4 text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20"
        >
          <Play size={20} />
          প্র্যাকটিস শুরু করো
        </motion.button>
      </div>
    </div>
  );
};

export default TopicLearning;
