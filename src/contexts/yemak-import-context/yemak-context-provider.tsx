import { useCallback, useState, type PropsWithChildren } from "react";
import { YemakImportContext } from "./yemak.context";

export type ImportJobStatus = "connecting" | "running" | "done" | "error";

export interface ImportJob {
  id: string;
  shopName: string;
  status: ImportJobStatus;
  current: number;
  total: number;
  message: string;
  result?: { categories: number; products: number; skipped: number };
  error?: string;
}

export const YemakImportProvider = ({ children }: PropsWithChildren) => {
  const [jobs, setJobs] = useState<ImportJob[]>([]);

  const patch = useCallback((id: string, update: Partial<ImportJob>) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...update } : j)));
  }, []);

  const startImport = useCallback(
    (shopId: string, shopName: string, yemakId: string) => {
      const id = `${shopId}-${Date.now()}`;

      setJobs((prev) => [
        ...prev,
        {
          id,
          shopName,
          status: "connecting",
          current: 0,
          total: 0,
          message: "Ulanmoqda...",
        },
      ]);

      const url = `${import.meta.env.VITE_PUBLIC_API}/shops/${shopId}/import/yemak?yemak_id=${yemakId}`;
      const es = new EventSource(url, { withCredentials: true });

      es.addEventListener("start", (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        patch(id, {
          status: "running",
          total: data.total,
          message: "Boshlandi...",
        });
      });

      es.addEventListener("progress", (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        patch(id, {
          status: "running",
          current: data.current,
          total: data.total,
          message: data.message,
        });
      });

      es.addEventListener("done", (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        patch(id, {
          status: "done",
          result: data,
          message: `Tayyor — ${data.categories} kategoriya, ${data.products} mahsulot`,
        });
        es.close();
      });

      // Server-sent error event
      es.addEventListener("error", (e) => {
        try {
          const data = JSON.parse((e as MessageEvent).data);
          patch(id, { status: "error", error: data.message });
        } catch {
          patch(id, { status: "error", error: "Import xatosi yuz berdi" });
        }
        es.close();
      });

      // Connection-level error (fires when server closes stream too)
      es.onerror = () => {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === id && j.status !== "done" && j.status !== "error"
              ? { ...j, status: "error", error: "Ulanish uzildi" }
              : j,
          ),
        );
        es.close();
      };
    },
    [patch],
  );

  const dismissJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  return (
    <YemakImportContext.Provider value={{ jobs, startImport, dismissJob }}>
      {children}
    </YemakImportContext.Provider>
  );
};
