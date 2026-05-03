import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { telegramOidcMutationFn } from "@/api/mutations";
import { getDefaultPage } from "@/lib/get-default-page";

export default function TelegramCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const executed = useRef(false);

  const { mutate } = useMutation({
    mutationFn: telegramOidcMutationFn,
    onSuccess: (data) => {
      localStorage.setItem("at", data.data.token);
      toast.success("Tizimga muvaffaqiyatli kirildi");
      navigate(getDefaultPage([]));
      window.location.reload();
    },
    onError: () => {
      toast.error("Telegram orqali kirish muvaffaqiyatsiz tugadi");
      navigate("/login");
    },
  });

  useEffect(() => {
    if (executed.current) return;
    executed.current = true;

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedState = sessionStorage.getItem("tg_oauth_state");

    if (!code || state !== storedState) {
      toast.error("Telegram autentifikatsiya xatosi");
      navigate("/login");
      return;
    }

    sessionStorage.removeItem("tg_oauth_state");

    mutate({
      code,
      redirect_uri: import.meta.env.VITE_TELEGRAM_REDIRECT_URI,
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-foreground/60 text-sm">
      Telegram orqali kirilmoqda...
    </div>
  );
}
