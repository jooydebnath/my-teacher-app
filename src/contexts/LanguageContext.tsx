import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "bn" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (bn: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "bn",
  setLanguage: () => {},
  t: (bn) => bn,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("app-language") as Language) || "bn";
  });

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem("app-language", lang);
    setLanguage(lang);
  };

  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
