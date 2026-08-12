import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      "749c-2a05-45c2-51a4-cc01-fdae-8c82-5bbc-5cdf.ngrok-free.app",
    ],
    // 4999: macOS AirPlay Receiver occupies port 5000, breaking adb reverse for the mobile app.
    // 127.0.0.1: force IPv4 — adb reverse can't reach an IPv6-only ([::1]) listener.
    host: "127.0.0.1",
    port: 4999,
    proxy:
      process.env.NODE_ENV === "development"
        ? {
            "/api": {
              target: "http://localhost:9100/v1",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          }
        : undefined,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
