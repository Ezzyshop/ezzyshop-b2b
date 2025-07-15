import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input, TelegramTokenInput } from "@/components/ui/input";
import { IShopTelegramForm } from "../../../utils";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IShopTelegramForm>;
  isEdit?: boolean;
}

export const ShopFormTelegramConfiguration = ({
  form,
  isEdit = false,
}: IProps) => {
  return (
    <Card className="p-4 grid grid-cols-2 gap-4">
      <h3 className="text-lg font-medium col-span-3">Telegram Sozlamalari</h3>

      <FormField
        control={form.control}
        name="token"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel isRequired>Telegram Bot Token</FormLabel>
            <FormControl>
              <TelegramTokenInput
                disabled={isEdit}
                placeholder="Telegram bot tokenini kiriting"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="menu_text"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>Menu nomi</FormLabel>
            <FormControl>
              <Input
                disabled={isEdit}
                placeholder="Menu nomini kiriting"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};
