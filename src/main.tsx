import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryLayout } from "./layouts/react-query.layout.tsx";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./lib/i18n";
import { Toaster } from "sonner";
import { IndexRoutes } from "./routes/index.routes.tsx";
import { ThemeContextProvider, LanguageProvider } from "./contexts";
import { YemakImportProvider } from "./contexts/yemak-import-context/yemak-context-provider.tsx";
import { FloatingImportProgress } from "./components/yemak-import-progress/floating-import-progress";
import { YandexImportProvider } from "./contexts/yandex-import-context/yandex-context-provider.tsx";
import { YandexFloatingImportProgress } from "./components/yandex-import-progress/floating-import-progress";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryLayout>
      <LanguageProvider>
        <ThemeContextProvider defaultTheme="Light">
          <YemakImportProvider>
            <YandexImportProvider>
              <BrowserRouter>
                <IndexRoutes />
              </BrowserRouter>
              <FloatingImportProgress />
              <YandexFloatingImportProgress />
              <Toaster
                position="top-center"
                toastOptions={{
                  unstyled: true,
                  className:
                    "text-white flex items-center justify-center px-4 py-2 gap-2 rounded-md shadow-sm mx-auto w-full",
                  classNames: {
                    warning: "bg-yellow-500",
                    error: "bg-red-500 ",
                    success: "bg-green-500",
                    info: "bg-blue-500",
                  },
                }}
              />
            </YandexImportProvider>
          </YemakImportProvider>
        </ThemeContextProvider>
      </LanguageProvider>
    </ReactQueryLayout>
  </StrictMode>,
);
