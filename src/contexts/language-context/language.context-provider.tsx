import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Language, LanguageContextType } from "../../lib/types/language.types";
import { LanguageContext } from "./language.context";

const LANGUAGES = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "ru" as Language, name: "Russian", nativeName: "Русский" },
  { code: "uz" as Language, name: "Uzbek", nativeName: "O'zbekcha" },
];

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    (i18n.language as Language) || "en"
  );

  const changeLanguage = async (language: Language) => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      localStorage.setItem("i18nextLng", language);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng as Language);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    languages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
