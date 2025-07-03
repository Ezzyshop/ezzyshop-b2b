import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ICategoryForm } from "../utils/category.interface";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryStatus } from "../utils/category.enum";

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
        className="p-4 flex-grow flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex-grow space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name.uz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>
                    {t("dashboard.categories.name")} (UZ)
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
              name="name.ru"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dashboard.categories.name")} (RU)</FormLabel>

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
              name="name.en"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>{t("dashboard.categories.name")} (EN)</FormLabel>

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
          </div>

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
