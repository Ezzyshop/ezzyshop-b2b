import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { createTelegramResolver } from "../utils/telegram.validator";
import { TTelegramForm } from "../utils/telegram.interface";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  createTelegramMutationFn,
  deleteTelegramMutationFn,
  updateTelegramMutationFn,
} from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { toast } from "sonner";
import { cn } from "@/lib";
import { CreateTelegramInstruction } from "@/features/register/create-platform/components/instruction";
import { TelegramBusinessType } from "../utils/telegram.enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IProps {
  initialValues?: TTelegramForm;
  telegramId?: string;
  refetch: () => void;
}

export const TelegramForm = ({
  initialValues,
  telegramId,
  refetch,
}: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const form = useForm<TTelegramForm>({
    defaultValues: initialValues,
    resolver: joiResolver(createTelegramResolver),
  });

  const createTelegramMutation = useMutation({
    mutationFn: (data: TTelegramForm) =>
      createTelegramMutationFn(shop._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.telegram.form.success"));
      refetch();
    },
  });

  const updateTelegramMutation = useMutation({
    mutationFn: (data: TTelegramForm) =>
      updateTelegramMutationFn(shop._id, telegramId!, data),
    onSuccess: () => {
      toast.success(t("dashboard.telegram.form.success"));
      refetch();
    },
  });

  const deleteTelegramMutation = useMutation({
    mutationFn: () => deleteTelegramMutationFn(shop._id, telegramId!),
    onSuccess: async () => {
      toast.success(t("dashboard.telegram.form.success"));
      refetch();
      form.reset({
        menu_text: undefined,
        token: undefined,
        business_type: TelegramBusinessType.Market,
      });
    },
  });

  const handleSubmitForm = (data: TTelegramForm) => {
    if (initialValues && telegramId) {
      updateTelegramMutation.mutate(data);
    } else {
      createTelegramMutation.mutate(data);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.telegram.title")}</CardTitle>
        <CardDescription>{t("dashboard.telegram.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            onSubmit={form.handleSubmit(handleSubmitForm)}
          >
            <FormField
              control={form.control}
              name="menu_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>
                    {t("dashboard.telegram.form.menu-text")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t(
                        "dashboard.telegram.form.menu-text-placeholder"
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="business_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Do'kon turi</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        {" "}
                        <SelectValue placeholder="Do'kon turini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TelegramBusinessType.Market}>
                          {t("dashboard.telegram.form.business-type.market")}
                        </SelectItem>
                        <SelectItem value={TelegramBusinessType.Restaurant}>
                          {t(
                            "dashboard.telegram.form.business-type.restaurant"
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>
                    {t("dashboard.telegram.form.token")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!!initialValues}
                      placeholder={t(
                        "dashboard.telegram.form.token-placeholder"
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="md:col-span-3">
              <CreateTelegramInstruction />
            </div>

            <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className={cn(initialValues ? "col-span-1" : "md:col-span-2")}
                disabled={
                  !form.formState.isValid ||
                  createTelegramMutation.isPending ||
                  updateTelegramMutation.isPending
                }
              >
                {t("common.save")}
              </Button>
              {initialValues && (
                <Button
                  variant="destructive"
                  disabled={
                    deleteTelegramMutation.isPending ||
                    createTelegramMutation.isPending ||
                    updateTelegramMutation.isPending
                  }
                  type="button"
                  onClick={() => deleteTelegramMutation.mutate()}
                >
                  {t("common.delete")}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
