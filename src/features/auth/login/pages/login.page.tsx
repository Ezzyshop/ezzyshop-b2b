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
import { dashboardSidebarData } from "@/lib";
import { useEffect } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTheme } from "@/contexts";
import { getLogo } from "@/lib/get-logo";

export default function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const form = useForm<ILoginForm>({
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });

  const { mutate } = useMutation({
    mutationFn: verifyOtpMutationFn,
    onSuccess: () => {
      toast.success("Tizimga muvaffaqiyatli kirildi");
      navigate(dashboardSidebarData[0].url);
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
      <img src={getLogo(theme)} alt="logo" className="w-[320px]" />
      <h2 className="text-3xl font-semibold mt-5 md:mt-8">Kodni kiriting</h2>
      <p className="text-md text-foreground/80 mt-5 max-w-md text-center">
        <a
          href={`https://t.me/${import.meta.env.VITE_PUBLIC_TELEGRAM_BOT}`}
          target="_blank"
          className="text-primary"
        >
          {import.meta.env.VITE_PUBLIC_TELEGRAM_BOT}
        </a>{" "}
        botiga kiring va 1 martalik kodingizni oling.
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
    </div>
  );
}
