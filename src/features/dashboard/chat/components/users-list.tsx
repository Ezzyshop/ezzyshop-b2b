import { listShopSupportUsersQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ISupportUserListItem } from "../utils/support-session.interface";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

interface IProps {
  selectedUserId: string | null;
  onSelect: (userId: string) => void;
}

export const ChatUsersList = ({ selectedUserId, onSelect }: IProps) => {
  const { shop } = useShopContext();
  const { t } = useTranslation();
  const isEnabled = useIsFeatureEnabled("chat");

  const { data, isLoading } = useQuery({
    queryKey: ["support-users", shop._id],
    queryFn: () => listShopSupportUsersQueryFn(shop._id),
    enabled: Boolean(shop._id) && isEnabled,
    refetchInterval: 30000,
  });

  const users: ISupportUserListItem[] = data?.data ?? [];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 border-b font-semibold sticky top-0 bg-background">
        {t("chat.users")}
      </div>
      {isLoading ? (
        <div className="p-3 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-14 rounded bg-muted animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="p-6 text-center text-sm text-muted-foreground">
          {t("chat.no_users")}
        </div>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              <button
                onClick={() => onSelect(u._id)}
                className={cn(
                  "w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-accent transition-colors border-b",
                  selectedUserId === u._id && "bg-accent",
                )}
              >
                <Avatar className="w-9 h-9">
                  {u.user.photo ? (
                    <AvatarImage src={u.user.photo} alt={u.user.full_name} />
                  ) : null}
                  <AvatarFallback>
                    {u.user.full_name?.[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow min-w-0">
                  <div className="font-medium truncate text-sm">
                    {u.user.full_name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {u.openCount} {t("chat.open")} / {u.totalCount}{" "}
                    {t("chat.total")}
                  </div>
                </div>
                {u.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 shrink-0">
                    {u.unread}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
