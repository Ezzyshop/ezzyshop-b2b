import type { ExternalToast } from "sonner";

type TToastStatus = "success" | "error" | "warning" | "info";

export const toastConfig: Record<TToastStatus, ExternalToast> = {
  success: {
    duration: 3000,
  },
  error: {
    duration: 3000,
    position: "top-center",
    classNames: {
      warning: "bg-red-500",
    },
  },
  warning: {
    duration: 3000,
  },
  info: {
    duration: 3000,
  },
};
