import { listShopUserSessionsQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  ISupportSession,
  SupportSessionStatus,
} from "../utils/support-session.interface";

interface IProps {
  userId: string | null;
  selectedSessionId: string | null;
  onSelect: (sessionId: string) => void;
}

export const ChatSessionsList = ({
  userId,
  selectedSessionId,
  onSelect,
}: IProps) => {
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["support-user-sessions", shop._id, userId],
    queryFn: () => listShopUserSessionsQueryFn(shop._id, userId as string),
    enabled: Boolean(shop._id && userId),
    refetchInterval: 30000,
  });

  const sessions: ISupportSession[] = data?.data ?? [];

  if (!userId) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-sm text-muted-foreground text-center">
        {t("chat.select_user")}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 border-b font-semibold sticky top-0 bg-background">
        {t("chat.sessions")}
      </div>
      {isLoading ? (
        <div className="p-3 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded bg-muted animate-pulse" />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <div className="p-6 text-center text-sm text-muted-foreground">
          {t("chat.no_sessions")}
        </div>
      ) : (
        <ul>
          {sessions.map((s) => {
            const resolved = s.status === SupportSessionStatus.Resolved;
            return (
              <li key={s._id}>
                <button
                  onClick={() => onSelect(s._id)}
                  className={cn(
                    "w-full text-left px-3 py-2 hover:bg-accent transition-colors border-b",
                    selectedSessionId === s._id && "bg-accent"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-medium truncate text-sm flex-grow">
                      {s.subject}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] rounded-full px-2 py-0.5 shrink-0 uppercase",
                        resolved
                          ? "bg-muted text-muted-foreground"
                          : "bg-green-500/15 text-green-700 dark:text-green-400"
                      )}
                    >
                      {resolved ? t("chat.resolved") : t("chat.open_status")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground truncate flex-grow">
                      {s.lastMessagePreview || "—"}
                    </div>
                    {s.unreadForShop > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 shrink-0">
                        {s.unreadForShop}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
