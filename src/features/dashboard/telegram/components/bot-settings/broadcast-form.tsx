import { useRef, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SmileIcon, SendIcon, ImageIcon, X, UsersIcon, Loader2Icon } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TBroadcastForm, IBroadcastMessage } from "@/types/bot-template.types";
import { broadcastResolver } from "../../utils/bot-template.validator";
import { broadcastMutationFn } from "@/api/mutations";
import { getBroadcastHistoryQueryFn } from "@/api/queries";
import { uploadImageMutationFn } from "@/api/mutations/upload.mutation";

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
              onClick={() => { onSelect(emoji); setOpen(false); }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString(undefined, {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

interface IProps {
  botId: string;
}

export const BroadcastForm = ({ botId }: IProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TBroadcastForm>({
    defaultValues: { message: "", imageUrl: "" },
    resolver: joiResolver(broadcastResolver),
  });

  const imageUrl = form.watch("imageUrl");
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Broadcast history — infinite scroll
  const {
    data: historyPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: historyStatus,
  } = useInfiniteQuery({
    queryKey: ["broadcast-history", botId],
    queryFn: ({ pageParam = 1 }) => getBroadcastHistoryQueryFn(botId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.paginationInfo?.hasNextPage
        ? lastPage.paginationInfo.currentPage + 1
        : undefined,
    enabled: Boolean(botId),
  });

  const history = historyPages?.pages.flatMap((p) => p.data) ?? [];

  // IntersectionObserver — trigger fetchNextPage when sentinel enters view
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Image upload
  const uploadMutation = useMutation({
    mutationFn: uploadImageMutationFn,
    onSuccess: (data) => {
      form.setValue("imageUrl", data.data.url, { shouldDirty: true });
    },
  });

  // Broadcast send
  const sendMutation = useMutation({
    mutationFn: (data: TBroadcastForm) => broadcastMutationFn(botId, data),
    onSuccess: (result) => {
      toast.success(
        t("dashboard.telegram-settings.broadcast-success", {
          sent: result?.sent ?? 0,
          total: result?.total ?? 0,
        }),
      );
      form.reset({ message: "", imageUrl: "" });
      queryClient.resetQueries({ queryKey: ["broadcast-history", botId] });
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    uploadMutation.mutate(formData);
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Send form */}
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
              onSubmit={form.handleSubmit((data) => sendMutation.mutate(data))}
              className="space-y-4"
            >
              {/* Image preview / upload area */}
              {imageUrl ? (
                <div className="relative w-full rounded-xl overflow-hidden border">
                  <img
                    src={imageUrl}
                    alt="broadcast preview"
                    className="w-full max-h-48 object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={() => form.setValue("imageUrl", "", { shouldDirty: true })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel isRequired>
                        {t("dashboard.telegram-settings.broadcast-message")}
                      </FormLabel>
                      <div className="flex items-center gap-1">
                        {/* Image attach button */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadMutation.isPending}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <EmojiPicker onSelect={insertEmoji} />
                      </div>
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

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
              />

              <Button
                type="submit"
                disabled={!form.formState.isValid || sendMutation.isPending || uploadMutation.isPending}
                className="gap-2"
              >
                <SendIcon className="h-4 w-4" />
                {t("dashboard.telegram-settings.broadcast-send")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* History */}
      {(historyStatus === "success" && history.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.telegram-settings.broadcast-history-title")}</CardTitle>
            <CardDescription>
              {t("dashboard.telegram-settings.broadcast-history-description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            {history.map((item, index) => (
              <div key={item._id}>
                <div className="flex gap-3 px-6 py-4">
                  {/* Author avatar */}
                  <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                    <AvatarImage src={item.sentBy?.photo ?? undefined} />
                    <AvatarFallback className="text-xs">
                      {item.sentBy?.full_name?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Header row */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-sm font-medium leading-none">
                        {item.sentBy?.full_name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    {/* Image if present */}
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="rounded-lg max-h-32 object-cover border"
                      />
                    )}

                    {/* Message text */}
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
                      {item.message}
                    </p>

                    {/* Stats badge */}
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="gap-1 text-xs font-normal">
                        <UsersIcon className="h-3 w-3" />
                        {item.sent} / {item.total}
                      </Badge>
                    </div>
                  </div>
                </div>
                {index < history.length - 1 && <Separator />}
              </div>
            ))}

            {/* Infinite scroll sentinel */}
            <div ref={loadMoreRef} className="py-3 flex justify-center">
              {isFetchingNextPage && (
                <Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
