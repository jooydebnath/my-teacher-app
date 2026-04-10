import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Brain, Trophy, Flame, ArrowRight, ArrowLeft } from "lucide-react";
import { classes } from "@/data/mockData";
import logoImg from "@/assets/logo.png";

const slides = [
  {
    icon: BookOpen,
    title: "NCTB পাঠ্যবই",
    subtitle: "৬ষ্ঠ থেকে ১২শ শ্রেণির সকল বিষয়",
    description: "তোমার পাঠ্যবইয়ের প্রতিটি অধ্যায় ও টপিক সহজ ভাষায় ব্যাখ্যা করা আছে।",
    color: "bg-primary/15 text-primary",
  },
  {
    icon: Brain,
    title: "MCQ প্র্যাকটিস",
    subtitle: "হাজারো প্রশ্ন দিয়ে প্রস্তুতি নাও",
    description: "প্রতিটি টপিকে MCQ প্র্যাকটিস করো, সঙ্গে সঙ্গে ফলাফল দেখো এবং ভুলগুলো থেকে শেখো।",
    color: "bg-secondary/15 text-secondary",
  },
  {
    icon: Flame,
    title: "ডেইলি স্ট্রিক",
    subtitle: "প্রতিদিন পড়ো, স্ট্রিক বাড়াও",
    description: "নিয়মিত পড়াশোনার অভ্যাস তৈরি করো। ধারাবাহিক স্ট্রিক রাখলে লিডারবোর্ডে উপরে উঠবে!",
    color: "bg-streak/15 text-streak",
  },
  {
    icon: Trophy,
    title: "লিডারবোর্ড",
    subtitle: "সেরাদের সাথে প্রতিযোগিতা করো",
    description: "তোমার স্কোর ও স্ট্রিক দিয়ে র‍্যাংকিংয়ে জায়গা করে নাও এবং বন্ধুদের সাথে প্রতিযোগিতা করো।",
    color: "bg-success/15 text-success",
  },
];

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const totalSteps = slides.length + 1; // slides + class selection
  const isLastSlide = step === slides.length;

  const handleNext = () => {
    if (isLastSlide && selectedClass) {
      localStorage.setItem("selectedClass", selectedClass);
      navigate("/subjects", { replace: true });
    } else if (!isLastSlide) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSkip = () => {
    setStep(slides.length);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-8 md:hidden">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/40" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isLastSlide ? (
          /* Feature slides */
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col items-center justify-center text-center max-w-sm"
          >
            <div className={`flex h-20 w-20 items-center justify-center rounded-3xl ${slides[step].color} mb-6`}>
              {(() => {
                const Icon = slides[step].icon;
                return <Icon size={36} />;
              })()}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-1">{slides[step].title}</h2>
            <p className="text-sm font-medium text-primary mb-3">{slides[step].subtitle}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{slides[step].description}</p>
          </motion.div>
        ) : (
          /* Class selection */
          <motion.div
            key="class-select"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col items-center max-w-sm w-full"
          >
            <img src={logoImg} alt="My Teacher" width={64} height={64} className="mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-1">তোমার ক্লাস সিলেক্ট করো</h2>
            <p className="text-sm text-muted-foreground mb-6">যে শ্রেণিতে পড়ো সেটি বেছে নাও</p>

            <div className="grid w-full grid-cols-3 gap-3">
              {classes.map((cls, i) => (
                <motion.button
                  key={cls.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`flex flex-col items-center rounded-2xl border-2 p-4 transition-all duration-200 ${
                    selectedClass === cls.id
                      ? "border-primary bg-accent shadow-lg shadow-primary/20"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className={`text-2xl font-bold ${selectedClass === cls.id ? "text-primary" : "text-foreground"}`}>
                    {cls.label}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">{cls.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="w-full max-w-sm mt-8 space-y-3">
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground hover:bg-accent transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={isLastSlide && !selectedClass}
            className={`flex-1 rounded-2xl py-3.5 text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isLastSlide && !selectedClass
                ? "bg-muted text-muted-foreground"
                : "gradient-amber text-primary-foreground shadow-lg"
            }`}
          >
            {isLastSlide ? "শুরু করো" : "পরবর্তী"} <ArrowRight size={18} />
          </button>
        </div>

        {!isLastSlide && (
          <button
            onClick={handleSkip}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            এড়িয়ে যাও
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
