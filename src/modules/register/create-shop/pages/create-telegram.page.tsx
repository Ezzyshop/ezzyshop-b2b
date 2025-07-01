import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input, TelegramTokenInput } from "@/components/ui/input";
import { useRegisterShopContext } from "@/contexts";
import { IShopForm, telegramSchema } from "@/modules/moderator/shops/utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const CreateTelegramPage = () => {
  const { form: shopForm } = useRegisterShopContext();
  const navigate = useNavigate();
  const initialValue = shopForm.getValues("telegram");

  const form = useForm<IShopForm["telegram"]>({
    defaultValues: initialValue ?? {
      token: "",
      menu_text: "",
    },
    resolver: joiResolver(telegramSchema),
  });

  const handleSubmit = (data: IShopForm["telegram"]) => {
    shopForm.setValue("telegram", data);
    navigate("/register/create-shop");
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="token"
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
                  placeholder="Menu nomini kiriting"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="col-span-1 md:col-span-2">
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
                2. <span className="font-bold">/newbot</span> buyrug'i yordamida
                yangi bot yarating
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
                  onClick={() => form.setFocus("token")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  yuqoridagi
                </span>{" "}
                maydonga joylashtiring
              </span>
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end">
          <Button type="submit" className="cursor-pointer">
            Keyingi
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTelegramPage;
