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
  isEdit?: boolean;
}

export const ShopFormTelegramConfiguration = ({
  form,
  isEdit = false,
}: IProps) => {
  return (
    <Card className="p-4 grid grid-cols-3 gap-4">
      <h3 className="text-lg font-medium col-span-3">Telegram Sozlamalari</h3>

      <FormField
        control={form.control}
        name="telegram.token"
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
        name="telegram.menu_text"
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

      <FormField
        control={form.control}
        name="telegram.menu_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>Menu manzili</FormLabel>
            <FormControl>
              <Input
                disabled={isEdit}
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
