import HtmlTranslation from "@/components/ui/html-translation";
import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { IShopTelegramForm } from "@/features/moderator/shops/utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useRegisterShopContext } from "@/contexts";
import { createTelegramMutationFn } from "@/api/mutations";
import { createTelegramResolver } from "@/features/dashboard/telegram/utils/telegram.validator";

export const CreateTelegramPage = () => {
  const { createdShop } = useRegisterShopContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const createTelegramBotMutation = useMutation({
    mutationFn: (data: IShopTelegramForm) =>
      createTelegramMutationFn(createdShop?._id || "", data),
    onSuccess: () => {
      navigate("/register/finish");
    },
  });

  const form = useForm<IShopTelegramForm>({
    resolver: joiResolver(createTelegramResolver),
  });

  const handleSubmit = (data: IShopTelegramForm) => {
    createTelegramBotMutation.mutate(data);
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
              <FormLabel isRequired>
                {t("register.create_telegram.telegram_bot_token")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "register.create_telegram.telegram_bot_token_placeholder"
                  )}
                  {...field}
                  value={field.value}
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
              <FormLabel isRequired>
                {t("register.create_telegram.menu_name")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "register.create_telegram.menu_name_placeholder"
                  )}
                  {...field}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="col-span-1 md:col-span-2">
          <div className="bg-muted text-muted-foreground text-sm p-4 pl-12 rounded-md relative">
            <Info className="absolute top-4 left-4" />
            <p className="font-bold"> {t("register.create_telegram.tips")}</p>
            <p className="grid grid-cols-1">
              <span>
                1.{" "}
                <HtmlTranslation translationKey="register.create_telegram.tip_1" />
              </span>
              <span>
                2.{" "}
                <HtmlTranslation translationKey="register.create_telegram.tip_2" />
              </span>
              <span>
                3.{" "}
                <HtmlTranslation translationKey="register.create_telegram.tip_3" />
              </span>
              <span>
                4.{" "}
                <HtmlTranslation translationKey="register.create_telegram.tip_4" />
              </span>

              <span>
                6.{" "}
                <HtmlTranslation translationKey="register.create_telegram.tip_5" />
              </span>
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end">
          <Button type="submit" className="cursor-pointer">
            {t("common.next")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTelegramPage;
