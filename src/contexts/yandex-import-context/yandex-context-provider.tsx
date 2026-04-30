import { useCallback, useState, type PropsWithChildren } from "react";
import { YandexImportContext } from "./yandex.context";

export type YandexImportJobStatus = "connecting" | "running" | "done" | "error";

export interface YandexImportJob {
  id: string;
  shopName: string;
  status: YandexImportJobStatus;
  current: number;
  total: number;
  message: string;
  result?: { categories: number; products: number; skipped: number };
  error?: string;
}

export const YandexImportProvider = ({ children }: PropsWithChildren) => {
  const [jobs, setJobs] = useState<YandexImportJob[]>([]);

  const patch = useCallback((id: string, update: Partial<YandexImportJob>) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...update } : j)));
  }, []);

  const startImport = useCallback(
    (shopId: string, shopName: string, yandexSlug: string) => {
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

      const url = `${import.meta.env.VITE_PUBLIC_API}/shops/${shopId}/import/yandex?yandex_slug=${encodeURIComponent(yandexSlug)}`;
      const es = new EventSource(url, { withCredentials: true });

      es.addEventListener("start", (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        patch(id, { status: "running", total: data.total, message: "Boshlandi..." });
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

      es.addEventListener("error", (e) => {
        try {
          const data = JSON.parse((e as MessageEvent).data);
          patch(id, { status: "error", error: data.message });
        } catch {
          patch(id, { status: "error", error: "Import xatosi yuz berdi" });
        }
        es.close();
      });

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
    <YandexImportContext.Provider value={{ jobs, startImport, dismissJob }}>
      {children}
    </YandexImportContext.Provider>
  );
};
