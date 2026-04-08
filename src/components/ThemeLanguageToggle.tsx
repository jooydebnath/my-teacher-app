import { Sun, Moon, Palette, Globe } from "lucide-react";
import { useThemeMode, ThemeMode } from "@/contexts/ThemeContext";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const themes: { value: ThemeMode; icon: any; label: string; labelEn: string }[] = [
  { value: "default", icon: Palette, label: "ডিফল্ট", labelEn: "Default" },
  { value: "light", icon: Sun, label: "লাইট", labelEn: "Light" },
  { value: "dark", icon: Moon, label: "ডার্ক", labelEn: "Dark" },
];

const languages: { value: Language; label: string }[] = [
  { value: "bn", label: "বাংলা" },
  { value: "en", label: "English" },
];

const ThemeLanguageToggle = () => {
  const { theme, setTheme } = useThemeMode();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-[60]">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border/50 shadow-lg backdrop-blur-md transition-all hover:scale-105"
      >
        <Palette size={18} className="text-primary" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-2xl bg-card border border-border/50 p-3 shadow-xl backdrop-blur-md"
          >
            {/* Theme section */}
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {language === "bn" ? "থিম" : "Theme"}
            </p>
            <div className="flex gap-1.5 mb-3">
              {themes.map((t) => {
                const active = theme === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`flex flex-1 flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-medium transition-all ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <t.icon size={14} />
                    {language === "bn" ? t.label : t.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Language section */}
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {language === "bn" ? "ভাষা" : "Language"}
            </p>
            <div className="flex gap-1.5">
              {languages.map((l) => {
                const active = language === l.value;
                return (
                  <button
                    key={l.value}
                    onClick={() => setLanguage(l.value)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl p-2 text-xs font-medium transition-all ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Globe size={12} />
                    {l.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeLanguageToggle;
