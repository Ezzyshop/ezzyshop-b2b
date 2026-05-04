import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { KeyRoundIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";

import { updateUserPasswordMutationFn } from "@/api/mutations";
import { changePasswordValidator } from "../../utils/user.validator";

interface IProps {
  userId: string;
  userName: string;
}

interface IPasswordForm {
  password: string;
  confirm_password: string;
}

export const ChangeUserPasswordDialog = ({ userId, userName }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<IPasswordForm>({
    defaultValues: { password: "", confirm_password: "" },
    resolver: joiResolver(changePasswordValidator),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IPasswordForm) =>
      updateUserPasswordMutationFn(userId, data),
    onSuccess: () => {
      toast.success("Parol o'zgartirildi");
      form.reset();
      setIsOpen(false);
    },
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Parolni o'zgartirish">
          <KeyRoundIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parolni o'zgartirish — {userName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Yangi parol</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Yangi parolni kiriting"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Parolni tasdiqlash</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Parolni qayta kiriting"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => handleOpenChange(false)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" disabled={isPending}>
                Saqlash
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
