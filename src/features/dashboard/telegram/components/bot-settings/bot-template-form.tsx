import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SmileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TBotTemplateForm } from "@/types/bot-template.types";
import { botTemplateResolver } from "../../utils/bot-template.validator";
import { upsertBotTemplateMutationFn } from "@/api/mutations";

const EMOJIS = [
  "😊","🎉","👋","🛍️","🏪","🎁","✅","🔥","💯","⭐",
  "🚀","💬","📦","🙌","❤️","😍","👍","🤝","💥","🌟",
  "🎊","📣","🔔","💎","🏆","😄","🤩","💪","🛒","📱",
];

const EmojiPicker = ({ onSelect }: { onSelect: (emoji: string) => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => setOpen((v) => !v)}
      >
        <SmileIcon className="h-4 w-4" />
      </Button>
      {open && (
        <div className="absolute z-50 right-0 mt-1 w-56 bg-popover border rounded-lg shadow-md p-2 grid grid-cols-8 gap-1">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="text-lg hover:bg-accent rounded p-0.5 leading-none"
              onClick={() => {
                onSelect(emoji);
                setOpen(false);
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface IProps {
  botId: string;
  initialValues: TBotTemplateForm;
}

export const BotTemplateForm = ({ botId, initialValues }: IProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const welcomeRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

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

  const insertEmoji = (
    fieldName: "welcomeMessage" | "botDescription",
    emoji: string,
    ref: React.RefObject<HTMLTextAreaElement | null>,
  ) => {
    const el = ref.current;
    const current = form.getValues(fieldName);
    if (el) {
      const start = el.selectionStart ?? current.length;
      const end = el.selectionEnd ?? current.length;
      const next = current.slice(0, start) + emoji + current.slice(end);
      form.setValue(fieldName, next, { shouldDirty: true });
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(start + emoji.length, start + emoji.length);
      });
    } else {
      form.setValue(fieldName, current + emoji, { shouldDirty: true });
    }
  };

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
              <div className="flex items-center justify-between">
                <FormLabel isRequired>
                  {t("dashboard.telegram-settings.welcome-message")}
                </FormLabel>
                <EmojiPicker
                  onSelect={(e) => insertEmoji("welcomeMessage", e, welcomeRef)}
                />
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  ref={(el) => {
                    field.ref(el);
                    (welcomeRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                  }}
                  placeholder={t("dashboard.telegram-settings.welcome-message-placeholder")}
                  className="min-h-[120px]"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="botDescription"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>
                  {t("dashboard.telegram-settings.bot-description")}
                </FormLabel>
                <EmojiPicker
                  onSelect={(e) => insertEmoji("botDescription", e, descRef)}
                />
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  ref={(el) => {
                    field.ref(el);
                    (descRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                  }}
                  placeholder={t("dashboard.telegram-settings.bot-description-placeholder")}
                  className="min-h-[100px]"
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
