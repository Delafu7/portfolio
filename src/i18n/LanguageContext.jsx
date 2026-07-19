import { createContext, useContext, useState, useCallback } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio-lang");
      if (stored) return stored;
      return navigator.language.startsWith("es") ? "es" : "en";
    }
    return "en";
  });

  const toggleLanguage = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "es" : "en";
      localStorage.setItem("portfolio-lang", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (path) => {
      const keys = path.split(".");
      let value = translations[lang];
      for (const key of keys) {
        value = value?.[key];
      }
      return value ?? path;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
