import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { IUserForm } from "@/lib/interfaces";

interface IProps {
  form: UseFormReturn<IUserForm>;
}

export const UserFormChangePassword = ({ form }: IProps) => {
  return (
    <Card className="p-4 grid grid-cols-2 gap-4">
      <h3 className="text-lg font-medium col-span-2">Parol</h3>

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>Parol</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Parolni kiriting"
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
            <FormLabel isRequired>Parolni Tasdiqlash</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Parolni qayta kiriting"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};
