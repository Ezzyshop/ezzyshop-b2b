import { createContext, useContext } from "react";
import { YandexImportJob } from "./yandex-context-provider";

interface YandexImportContextValue {
  jobs: YandexImportJob[];
  startImport: (shopId: string, shopName: string, yandexSlug: string) => void;
  dismissJob: (id: string) => void;
}

export const YandexImportContext = createContext<YandexImportContextValue | null>(null);

export const useYandexImport = () => {
  const ctx = useContext(YandexImportContext);
  if (!ctx)
    throw new Error("useYandexImport must be used within YandexImportProvider");
  return ctx;
};
