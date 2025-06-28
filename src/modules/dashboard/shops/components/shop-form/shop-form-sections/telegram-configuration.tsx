import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, TelegramTokenInput } from "@/components/ui/input";
import { IShopForm } from "../../../utils";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IShopForm>;
}

export const ShopFormTelegramConfiguration = ({ form }: IProps) => {
  return (
    <Card className="p-4 grid grid-cols-3 gap-4">
      <h3 className="text-lg font-medium col-span-3">Telegram Sozlamalari</h3>

      <FormField
        control={form.control}
        name="telegram.token"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Telegram Bot Token</FormLabel>
            <FormControl>
              <TelegramTokenInput
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
        name="telegram.menu_text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Menu nomi</FormLabel>
            <FormControl>
              <Input
                placeholder="Menu nomini kiriting"
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
        name="telegram.menu_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Menu manzili</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://example.com/menu"
                {...field}
                value={field.value || undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};
