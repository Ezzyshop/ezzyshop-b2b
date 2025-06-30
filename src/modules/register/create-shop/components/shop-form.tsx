import { getCurrenciesQueryFn } from "@/api/queries";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, TelegramTokenInput } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BusinessType,
  IShopForm,
  shopCreateSchema,
  ShopPlatform,
} from "@/modules/moderator/shops/utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";

interface IProps {
  onSubmit: (data: IShopForm) => void;
  isLoading: boolean;
}

export const ShopForm = ({ onSubmit, isLoading }: IProps) => {
  const currency = useQuery({
    queryKey: ["currency"],
    queryFn: () => getCurrenciesQueryFn(),
  });

  const form = useForm<IShopForm>({
    defaultValues: {
      business_type: BusinessType.OnlineStore,
      platform: ShopPlatform.Telegram,
      currency: undefined,
      name: undefined,
      logo: undefined,
      telegram: {
        token: undefined,
        menu_text: undefined,
      },
      description: undefined,
      address: {
        address: "Yangi bozor",
        lat: 0,
        long: 0,
      },
    },
    resolver: joiResolver(shopCreateSchema),
  });

  const handleSubmitForm = (data: IShopForm) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Kompaniyangiz nomi</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Kompaniya nomini kiriting" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kompaniyangiz haqida</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Kompaniya haqida kiriting"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Valyuta</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Valyuta tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {currency?.data?.data?.map((currency) => (
                      <SelectItem key={currency._id} value={currency._id}>
                        {currency.symbol}{" "}
                        <span className=" text-muted-foreground">
                          ({currency.name})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="telegram.token"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Telegram Bot Token</FormLabel>
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
                <FormLabel isRequired>Menu nomi</FormLabel>
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

          <div className="col-span-2">
            <div className="bg-muted text-muted-foreground text-sm p-4 pl-12 rounded-md relative">
              <Info className="absolute top-4 left-4" />
              <p className="font-bold">Telegram token olish uchun yo‘riqnoma</p>
              <p className="grid grid-cols-1">
                <span>
                  1. Telegram qidiruv bo‘limiga{" "}
                  <a
                    href="https://t.me/botfather"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    @BotFather
                  </a>{" "}
                  deb yozing
                </span>
                <span>
                  2. <span className="font-bold">/newbot</span> buyrug'i
                  yordamida yangi bot yarating
                </span>
                <span>3. Bot nomi va usernameni kiriting</span>
                <span>
                  4. Javob sifatida{" "}
                  <a
                    href="https://t.me/botfather"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    @BotFather
                  </a>{" "}
                  sizga token yuboradi:
                </span>
                <span className="font-bold">
                  238279964:AAFE6-1ZuCAcEOUPa63XlLxxq9qYU1iYdbs
                </span>
                <span>
                  5. Tokendan nusxa oling va uni{" "}
                  <span
                    onClick={() => form.setFocus("telegram.token")}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    yuqoridagi
                  </span>{" "}
                  maydonga joylashtiring
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="cursor-pointer" disabled={isLoading}>
            Kompaniya yaratish
          </Button>
        </div>
      </form>
    </Form>
  );
};
