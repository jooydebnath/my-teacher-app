import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { classes } from "@/data/mockData";
import logoImg from "@/assets/logo.png";
import heroImg from "@/assets/onboarding-hero.png";

const Onboarding = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      localStorage.setItem("selectedClass", selected);
      navigate("/subjects");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <img src={logoImg} alt="My Teacher Logo" width={80} height={80} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gradient"
      >
        My Teacher
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-1 text-sm text-muted-foreground"
      >
        বই না বুঝলে, My Teacher খুলে দেখো
      </motion.p>

      <motion.img
        src={heroImg}
        alt="Student studying"
        width={280}
        height={210}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="my-6"
      />

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-4 text-lg font-semibold text-foreground"
      >
        তোমার ক্লাস সিলেক্ট করো
      </motion.h2>

      <div className="grid w-full max-w-sm grid-cols-3 gap-3">
        {classes.map((cls, i) => (
          <motion.button
            key={cls.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            onClick={() => setSelected(cls.id)}
            className={`flex flex-col items-center rounded-2xl border-2 p-4 transition-all duration-200 ${
              selected === cls.id
                ? "border-primary bg-accent shadow-lg"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <span
              className={`text-2xl font-bold ${
                selected === cls.id ? "text-primary" : "text-foreground"
              }`}
            >
              {cls.label}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">{cls.name}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={handleContinue}
        disabled={!selected}
        className={`mt-8 w-full max-w-sm rounded-2xl py-4 text-lg font-semibold transition-all duration-300 ${
          selected
            ? "gradient-primary text-primary-foreground shadow-lg animate-pulse-glow"
            : "bg-muted text-muted-foreground"
        }`}
      >
        শুরু করো →
      </motion.button>
    </div>
  );
};

export default Onboarding;
