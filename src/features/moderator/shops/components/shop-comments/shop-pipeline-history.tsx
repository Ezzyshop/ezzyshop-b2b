import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowRightIcon } from "lucide-react";
import { getShopPipelineHistoryQueryFn } from "@/api/queries/shops.query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge/badge";
import {
  IShopPipelineHistoryEntry,
  ShopPipelineStage,
  shopPipelineStageTranslations,
} from "../../utils";

interface IProps {
  shopId: string;
}

const stageDotClass: Record<ShopPipelineStage, string> = {
  [ShopPipelineStage.Planning]: "bg-blue-500",
  [ShopPipelineStage.FreeTrial]: "bg-amber-500",
  [ShopPipelineStage.Paused]: "bg-slate-500",
  [ShopPipelineStage.Using]: "bg-emerald-500",
  [ShopPipelineStage.Cancelled]: "bg-rose-500",
};

const StageChip = ({ stage }: { stage: ShopPipelineStage | null }) => {
  if (!stage) {
    return (
      <Badge variant="outline" className="text-[10px]">
        —
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-[10px] gap-1">
      <span className={`size-1.5 rounded-full ${stageDotClass[stage]}`} />
      {shopPipelineStageTranslations[stage]}
    </Badge>
  );
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const ShopPipelineHistoryView = ({ shopId }: IProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["shop-pipeline-history", shopId],
    queryFn: () => getShopPipelineHistoryQueryFn(shopId),
  });

  const entries: IShopPipelineHistoryEntry[] = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-10">
        Bosqich o'zgarishlari yo'q
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div
          key={entry._id}
          className="rounded-md border bg-card p-3 space-y-2"
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              {entry.changed_by.photo ? (
                <AvatarImage src={entry.changed_by.photo} />
              ) : null}
              <AvatarFallback className="text-[10px]">
                {getInitials(entry.changed_by.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium leading-tight truncate">
                {entry.changed_by.full_name}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {dayjs(entry.createdAt).format("DD.MM.YYYY HH:mm")}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <StageChip stage={entry.from_stage} />
            <ArrowRightIcon className="w-3.5 h-3.5 text-muted-foreground" />
            <StageChip stage={entry.to_stage} />
          </div>
        </div>
      ))}
    </div>
  );
};
