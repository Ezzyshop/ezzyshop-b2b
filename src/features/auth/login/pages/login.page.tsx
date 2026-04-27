import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { loginSchema, type ILoginForm } from "../utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { verifyOtpMutationFn } from "@/api/mutations";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect } from "react";

function startTelegramLogin() {
  const state = crypto.randomUUID();
  sessionStorage.setItem("tg_oauth_state", state);

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_TELEGRAM_BOT_ID,
    redirect_uri: import.meta.env.VITE_TELEGRAM_REDIRECT_URI,
    response_type: "code",
    scope: "openid phone",
    state,
  });

  window.location.href = `https://oauth.telegram.org/auth?${params.toString()}`;
}

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Theme, useTheme } from "@/contexts";
import { getLogo } from "@/lib/get-logo";
import { getDefaultPage } from "@/lib/get-default-page";
import { UserRoles } from "@/lib/enums";
import { useTranslation } from "react-i18next";

export default function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });

  const { mutate } = useMutation({
    mutationFn: verifyOtpMutationFn,
    onSuccess: (data) => {
      localStorage.setItem("at", data.data.token);
      toast.success("Tizimga muvaffaqiyatli kirildi");
      navigate(getDefaultPage([UserRoles.Staff]));
      window.location.reload();
    },
    onError: () => {
      form.resetField("otp");
    },
  });

  const onSubmit = (data: ILoginForm) => {
    mutate(data);
  };

  const otp = form.watch("otp");

  useEffect(() => {
    if (otp?.length === 6) {
      mutate({ otp });
    }
  }, [otp, mutate]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-[60vh]",
        className
      )}
      {...props}
    >
      <img
        src={getLogo(theme.toLowerCase() as Theme)}
        alt="logo"
        className="w-[320px]"
      />
      <h2 className="text-3xl font-semibold mt-5 md:mt-8">{t("login.enter_code")}</h2>
      <p className="text-md text-foreground/80 mt-5 max-w-md text-center">
        <a
          href={`https://t.me/${import.meta.env.VITE_PUBLIC_TELEGRAM_BOT}`}
          target="_blank"
          className="text-primary"
        >
          @{import.meta.env.VITE_PUBLIC_TELEGRAM_BOT}
        </a>{" "}
        {t("login.bot_instruction")}
      </p>
      <Form {...form}>
        <form className=" mt-8 md:mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex items-center gap-3 mt-8 w-full max-w-xs">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-foreground/40">{t("login.or")}</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <button
        type="button"
        onClick={startTelegramLogin}
        className="mt-4 flex items-center gap-3 px-6 py-3 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90 active:opacity-80"
        style={{ backgroundColor: "#2AABEE" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 shrink-0"
        >
          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
        </svg>
        {t("login.login_with_phone")}
      </button>
    </div>
  );
}
