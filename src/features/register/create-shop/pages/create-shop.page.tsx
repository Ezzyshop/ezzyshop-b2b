import { getCurrenciesQueryFn } from "@/api/queries";
import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterShopContext, useUserContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AddressForm } from "../components/address-form";
import { useTranslation } from "react-i18next";
import { SelectLanguage } from "../components/select-language";
import { ImageUploadSingle } from "@/components/ui/image-upload";
import { dashboardSidebarData } from "@/lib";

export const CreateShopPage = () => {
  const { form, handleSubmitForm, isPending } = useRegisterShopContext();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currency = useQuery({
    queryKey: ["currency"],
    queryFn: () => getCurrenciesQueryFn(),
  });

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">
        {t("register.create_shop.create_shop")}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {t("register.create_shop.create_shop_description")}
      </p>
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
                <FormLabel isRequired>
                  {t("register.create_shop.shop_name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t(
                      "register.create_shop.shop_name_placeholder"
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    {t("dashboard.settings.basic_information.logo")}
                  </FormLabel>
                  <FormControl>
                    <ImageUploadSingle
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("register.create_shop.shop_description")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder={t(
                      "register.create_shop.shop_description_placeholder"
                    )}
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
                <FormLabel isRequired>
                  {t("register.create_shop.currency")}
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "register.create_shop.currency_placeholder"
                        )}
                      />
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("register.create_shop.languages")}</FormLabel>
                <FormControl>
                  <SelectLanguage
                    values={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AddressForm form={form} />

          <div className="flex flex-col md:flex-row justify-end gap-4">
            {user.shops.length > 0 && (
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => navigate(dashboardSidebarData[0].url)}
              >
                {t("common.back")}
              </Button>
            )}
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPending}
            >
              {t("common.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateShopPage;
