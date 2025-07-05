import axios from "axios";
import { toast } from "sonner";
import { ErrorMessages, ErrorMessagesMap } from "./utils/error-messages.enum";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error.response?.data?.message as ErrorMessages;
    toast.error(ErrorMessagesMap[code]);

    if (code === ErrorMessages.UnauthorizedError) {
      window.location.href = "/login";
    }

    if (code === ErrorMessages.TokenExpired) {
      window.location.href = "/logout";
    }

    return Promise.reject(error);
  }
);
