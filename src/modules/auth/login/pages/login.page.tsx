import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginSchema, type ILoginForm } from "../utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginMutationFn } from "@/api/mutations";
import { joiResolver } from "@hookform/resolvers/joi";

export default function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const form = useForm<ILoginForm>({
    defaultValues: {
      phone: "",
      password: "",
    },
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: () => {
      toast.success("Tizimga muvaffaqiyatli kirildi");
      navigate("/moderator");
    },
    onError: () => {
      form.resetField("password");
    },
  });

  const onSubmit = (data: ILoginForm) => {
    mutate(data);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen gap-6",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hisobga kirish</CardTitle>
          <CardDescription>
            Hisobga kirish uchun telefon raqamingizni va parolingizni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone">Telefon raqamingiz</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        type="text"
                        placeholder="09123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Parolingiz</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
