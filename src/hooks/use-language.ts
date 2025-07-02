import { useContext } from "react";
import { LanguageContextType } from "../lib/types/language.types";
import { LanguageContext } from "../contexts/language-context/language.context";

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
