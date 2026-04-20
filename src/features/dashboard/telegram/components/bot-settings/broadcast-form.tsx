import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SmileIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TBroadcastForm } from "@/types/bot-template.types";
import { broadcastResolver } from "../../utils/bot-template.validator";
import { broadcastMutationFn } from "@/api/mutations";

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
}

export const BroadcastForm = ({ botId }: IProps) => {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<TBroadcastForm>({
    defaultValues: { message: "" },
    resolver: joiResolver(broadcastResolver),
  });

  const mutation = useMutation({
    mutationFn: (data: TBroadcastForm) => broadcastMutationFn(botId, data),
    onSuccess: (result) => {
      toast.success(
        t("dashboard.telegram-settings.broadcast-success", {
          sent: result?.sent ?? 0,
          total: result?.total ?? 0,
        }),
      );
      form.reset();
    },
  });

  const insertEmoji = (emoji: string) => {
    const el = textareaRef.current;
    const current = form.getValues("message");
    if (el) {
      const start = el.selectionStart ?? current.length;
      const end = el.selectionEnd ?? current.length;
      const next = current.slice(0, start) + emoji + current.slice(end);
      form.setValue("message", next, { shouldDirty: true });
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(start + emoji.length, start + emoji.length);
      });
    } else {
      form.setValue("message", current + emoji, { shouldDirty: true });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.telegram-settings.broadcast-title")}</CardTitle>
        <CardDescription>
          {t("dashboard.telegram-settings.broadcast-description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel isRequired>
                      {t("dashboard.telegram-settings.broadcast-message")}
                    </FormLabel>
                    <EmojiPicker onSelect={insertEmoji} />
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      ref={(el) => {
                        field.ref(el);
                        (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                      }}
                      placeholder={t("dashboard.telegram-settings.broadcast-message-placeholder")}
                      className="min-h-[120px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!form.formState.isValid || mutation.isPending}
              className="gap-2"
            >
              <SendIcon className="h-4 w-4" />
              {t("dashboard.telegram-settings.broadcast-send")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
