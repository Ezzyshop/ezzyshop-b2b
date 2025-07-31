import axios from "axios";
import { toast } from "sonner";
import { ErrorMessages, errorMessagesMap } from "./utils/error-messages.enum";

export const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message as ErrorMessages;
    const status = error.response?.status;
    const method = error.config?.method;

    if (status === 500 && method === "get") {
      window.location.href = "/server-error";
    }

    toast.error(errorMessagesMap[message]);

    if (message === ErrorMessages.UnauthorizedError) {
      window.location.href = "/login";
    }

    if (message === ErrorMessages.TokenExpired) {
      window.location.href = "/logout";
    }

    return Promise.reject(error);
  }
);
