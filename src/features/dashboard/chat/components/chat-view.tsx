import {
  listShopSessionMessagesQueryFn,
  resolveSupportSessionMutationFn,
  sendShopSupportMessageMutationFn,
} from "@/api/queries";
import { uploadShopImageMutationFn } from "@/api/mutations/upload.mutation";
import { getSupportSocket } from "@/api/socket";
import { useShopContext, useUserContext } from "@/contexts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Paperclip, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  ISupportAttachment,
  ISupportMessage,
  ISupportSession,
  SupportSenderRole,
  SupportSessionStatus,
} from "../utils/support-session.interface";

interface IProps {
  sessionId: string | null;
}

export const ChatView = ({ sessionId }: IProps) => {
  const { shop } = useShopContext();
  const { user } = useUserContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [text, setText] = useState("");
  const [pendingImages, setPendingImages] = useState<ISupportAttachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["support-session-messages", shop._id, sessionId],
    queryFn: () =>
      listShopSessionMessagesQueryFn(shop._id, sessionId as string),
    enabled: Boolean(shop._id && sessionId),
    refetchInterval: 10000,
  });

  const session: ISupportSession | undefined = data?.data?.session;
  const messages: ISupportMessage[] = useMemo(
    () => data?.data?.messages ?? [],
    [data]
  );

  const resolved = session?.status === SupportSessionStatus.Resolved;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  useEffect(() => {
    if (!sessionId) return;
    const socket = getSupportSocket();

    const join = () => socket.emit("session:join", sessionId);
    if (socket.connected) join();
    socket.on("connect", join);

    const onNew = (payload: { sessionId: string; message: ISupportMessage }) => {
      if (payload.sessionId !== sessionId) return;
      queryClient.setQueryData<typeof data>(
        ["support-session-messages", shop._id, sessionId],
        (prev) => {
          if (!prev?.data) return prev;
          if (prev.data.messages.some((m) => m._id === payload.message._id))
            return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              messages: [...prev.data.messages, payload.message],
            },
          };
        }
      );
    };

    const onSessionUpdated = (payload: { session: ISupportSession }) => {
      if (payload?.session?._id !== sessionId) return;
      queryClient.setQueryData<typeof data>(
        ["support-session-messages", shop._id, sessionId],
        (prev) => {
          if (!prev?.data) return prev;
          return { ...prev, data: { ...prev.data, session: payload.session } };
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["support-user-sessions", shop._id],
      });
      queryClient.invalidateQueries({ queryKey: ["support-users", shop._id] });
    };

    const onSidebarUpdated = () => {
      queryClient.invalidateQueries({
        queryKey: ["support-user-sessions", shop._id],
      });
      queryClient.invalidateQueries({ queryKey: ["support-users", shop._id] });
    };

    socket.on("message:new", onNew);
    socket.on("session:resolved", onSessionUpdated);
    socket.on("session:updated", onSidebarUpdated);

    return () => {
      socket.emit("session:leave", sessionId);
      socket.off("connect", join);
      socket.off("message:new", onNew);
      socket.off("session:resolved", onSessionUpdated);
      socket.off("session:updated", onSidebarUpdated);
    };
  }, [sessionId, shop._id, queryClient]);

  const sendMutation = useMutation({
    mutationFn: (body: {
      text?: string;
      attachments?: ISupportAttachment[];
    }) =>
      sendShopSupportMessageMutationFn(shop._id, sessionId as string, body),
    onSuccess: () => {
      setText("");
      setPendingImages([]);
      queryClient.invalidateQueries({
        queryKey: ["support-session-messages", shop._id, sessionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["support-user-sessions", shop._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["support-users", shop._id],
      });
    },
    onError: () => {
      toast.error(t("chat.send_failed"));
    },
  });

  const resolveMutation = useMutation({
    mutationFn: () =>
      resolveSupportSessionMutationFn(shop._id, sessionId as string),
    onSuccess: () => {
      setConfirmOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["support-session-messages", shop._id, sessionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["support-user-sessions", shop._id],
      });
    },
    onError: () => {
      toast.error(t("chat.resolve_failed"));
    },
  });

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed && pendingImages.length === 0) return;
    sendMutation.mutate({
      text: trimmed || undefined,
      attachments: pendingImages.length > 0 ? pendingImages : undefined,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadShopImageMutationFn(shop._id, "product", formData);
      const url = res?.data?.url || res?.url;
      if (url) {
        setPendingImages((prev) => [...prev, { url, type: "image" }]);
      }
    } catch {
      toast.error(t("chat.upload_failed"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!sessionId) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-sm text-muted-foreground text-center">
        {t("chat.select_session")}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b flex items-center gap-3">
        <div className="flex-grow min-w-0">
          <div className="font-semibold truncate">
            {session?.subject || "—"}
          </div>
          <div className="text-xs text-muted-foreground">
            {resolved ? t("chat.resolved") : t("chat.open_status")}
          </div>
        </div>
        {!resolved && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmOpen(true)}
            disabled={resolveMutation.isPending}
          >
            {t("chat.issue_resolved")}
          </Button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-3 bg-muted/30"
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-8">
            {t("chat.no_messages")}
          </div>
        ) : (
          messages.map((m) => {
            const isMine =
              m.senderRole === SupportSenderRole.Shop ||
              (user && m.sender === user._id);
            return (
              <div
                key={m._id}
                className={cn(
                  "flex",
                  isMine ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                    isMine
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  )}
                >
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-1">
                      {m.attachments.map((a, i) => (
                        <a
                          key={i}
                          href={a.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={a.url}
                            alt=""
                            className="w-32 h-32 object-cover rounded"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                  {m.text && (
                    <div className="whitespace-pre-wrap break-words">
                      {m.text}
                    </div>
                  )}
                  <div
                    className={cn(
                      "text-[10px] mt-1 opacity-70",
                      isMine ? "text-right" : ""
                    )}
                  >
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {resolved ? (
        <div className="p-4 border-t bg-muted/50 text-center text-sm text-muted-foreground">
          {t("chat.session_resolved_banner")}
        </div>
      ) : (
        <div className="border-t p-3">
          {pendingImages.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {pendingImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img.url}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    onClick={() =>
                      setPendingImages((prev) =>
                        prev.filter((_, idx) => idx !== i)
                      )
                    }
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Paperclip className="w-4 h-4" />
              )}
            </Button>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t("chat.type_reply")}
              rows={1}
              className="flex-grow resize-none min-h-[40px] max-h-40"
            />
            <Button
              type="button"
              size="icon"
              onClick={handleSend}
              disabled={
                sendMutation.isPending ||
                (!text.trim() && pendingImages.length === 0)
              }
            >
              {sendMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("chat.resolve_confirm_title")}</DialogTitle>
            <DialogDescription>
              {t("chat.resolve_confirm_description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button
              onClick={() => resolveMutation.mutate()}
              disabled={resolveMutation.isPending}
            >
              {resolveMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                t("chat.confirm_resolve")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
