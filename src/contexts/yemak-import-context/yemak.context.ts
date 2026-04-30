import { createContext, useContext } from "react";
import { ImportJob } from "./yemak-context-provider";

interface YemakImportContextValue {
  jobs: ImportJob[];
  startImport: (shopId: string, shopName: string, yemakId: string) => void;
  dismissJob: (id: string) => void;
}

export const YemakImportContext = createContext<YemakImportContextValue | null>(
  null,
);

export const useYemakImport = () => {
  const ctx = useContext(YemakImportContext);
  if (!ctx)
    throw new Error("useYemakImport must be used within YemakImportProvider");
  return ctx;
};
