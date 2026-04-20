import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TBotTemplateForm } from "@/types/bot-template.types";
import { botTemplateResolver } from "../../utils/bot-template.validator";
import { upsertBotTemplateMutationFn } from "@/api/mutations";

interface IProps {
  botId: string;
  initialValues: TBotTemplateForm;
}

export const BotTemplateForm = ({ botId, initialValues }: IProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<TBotTemplateForm>({
    defaultValues: initialValues,
    resolver: joiResolver(botTemplateResolver),
  });

  const mutation = useMutation({
    mutationFn: (data: TBotTemplateForm) => upsertBotTemplateMutationFn(botId, data),
    onSuccess: () => {
      toast.success(t("common.success"));
      queryClient.invalidateQueries({ queryKey: ["bot-template", botId] });
      form.reset(form.getValues());
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="welcomeMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.telegram-settings.welcome-message")}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t(
                    "dashboard.telegram-settings.welcome-message-placeholder"
                  )}
                  className="min-h-[120px]"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="menuHintText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.telegram-settings.menu-hint-text")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "dashboard.telegram-settings.menu-hint-text-placeholder"
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            mutation.isPending
          }
        >
          {t("common.save")}
        </Button>
      </form>
    </Form>
  );
};
