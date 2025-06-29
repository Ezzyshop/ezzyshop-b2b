import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IShopForm } from "../../../utils";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IShopForm>;
}

export const ShopFormSocialLinks = ({ form }: IProps) => {
  return (
    <Card className="p-4 grid grid-cols-2 gap-4">
      <h3 className="text-lg font-medium col-span-2">Ijtimoiy tarmoqlar</h3>

      <FormField
        control={form.control}
        name="social_links.telegram"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telegram</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://t.me/username"
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
        name="social_links.instagram"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instagram</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://instagram.com/username"
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
        name="social_links.facebook"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Facebook</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://facebook.com/username"
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
        name="social_links.twitter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twitter</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://twitter.com/username"
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
        name="social_links.youtube"
        render={({ field }) => (
          <FormItem>
            <FormLabel>YouTube</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://youtube.com/channel/..."
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
