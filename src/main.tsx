import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryLayout } from "./layouts/react-query.layout.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./modules/auth/login/pages/login.page.tsx";
import "./App.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
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
    </ReactQueryLayout>
  </StrictMode>
);
