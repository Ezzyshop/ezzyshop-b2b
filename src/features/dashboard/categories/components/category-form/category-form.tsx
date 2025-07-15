import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { useForm } from "react-hook-form";
import { ICategoryForm } from "../utils/category.interface";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryStatus } from "../utils/category.enum";
import { LanguageType } from "@/features/moderator/shops/utils";
import { useShopContext } from "@/contexts";
import { useState } from "react";
import { LanguageSelectTab } from "@/components/form/language-select-tab";

interface IProps {
  initialValues?: ICategoryForm;
  onSubmit: (data: ICategoryForm) => void;
  isLoading: boolean;
}

export const CategoryForm = ({
  onSubmit,
  initialValues,
  isLoading,
}: IProps) => {
  const { shop } = useShopContext();

  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(
    shop.languages.find((lang) => lang.is_main)?.type || LanguageType.Uz
  );

  const { t } = useTranslation();
  const form = useForm<ICategoryForm>({
    defaultValues: initialValues ?? {
      name: {
        uz: "",
      },
      status: CategoryStatus.Active,
      is_popular: false,
    },
  });

  return (
    <Form {...form}>
      <form
        className="p-4 flex-grow flex flex-col space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <LanguageSelectTab
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        />

        <div className="flex-grow space-y-4 ">
          <FormField
            control={form.control}
            key={`name-${activeLanguage}`}
            name={`name.${activeLanguage}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {t("dashboard.categories.name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("dashboard.categories.enter_name")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("dashboard.categories.image")}</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("dashboard.categories.enter_image")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_popular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("table.columns.is_popular")}</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? "true" : "false"}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("table.columns.is_popular")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">
                        {t("table.columns.popular")}
                      </SelectItem>
                      <SelectItem value="false">
                        {t("table.columns.not_popular")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <Button type="submit" disabled={isLoading}>
            {t("common.save")}
          </Button>
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              {t("common.cancel")}
            </Button>
          </DrawerClose>
        </div>
      </form>
    </Form>
  );
};
