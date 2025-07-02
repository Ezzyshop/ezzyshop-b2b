import { createContext } from "react";
import { LanguageContextType } from "../../lib/types/language.types";

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
