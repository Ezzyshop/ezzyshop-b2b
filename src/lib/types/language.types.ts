export type Language = "en" | "ru" | "uz";

export interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  languages: Array<{
    code: Language;
    name: string;
    nativeName: string;
  }>;
}
