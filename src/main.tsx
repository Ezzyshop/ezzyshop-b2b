import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { ReactQueryLayout } from "./layouts/react-query.layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryLayout>
      <App />
    </ReactQueryLayout>
  </StrictMode>
);
