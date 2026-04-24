import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSupportSocket = (): Socket => {
  if (socket) return socket;
  const rawUrl: string = import.meta.env.VITE_PUBLIC_API || "";
  // VITE_PUBLIC_API may be a relative path ("/api") in dev — strip any path,
  // or fall back to the socket-specific var. The socket server lives at the origin.
  const baseURL = rawUrl.startsWith("http")
    ? new URL(rawUrl).origin
    : import.meta.env.VITE_SOCKET_URL || "http://localhost:9100";
  const token = localStorage.getItem("at");
  socket = io(baseURL, {
    withCredentials: true,
    autoConnect: true,
    transports: ["websocket", "polling"],
    auth: token ? { token } : undefined,
  });
  return socket;
};

export const closeSupportSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
