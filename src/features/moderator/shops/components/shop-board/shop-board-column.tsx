import { useDroppable } from "@dnd-kit/core";
import {
  IShop,
  ShopPipelineStage,
  shopPipelineStageTranslations,
} from "../../utils";
import { ShopBoardCard } from "./shop-board-card";
import { cn } from "@/lib/utils";

interface IProps {
  stage: ShopPipelineStage;
  shops: IShop[];
  onOpenComments: (shop: IShop) => void;
}

const stageAccent: Record<ShopPipelineStage, string> = {
  [ShopPipelineStage.Planning]: "bg-blue-500",
  [ShopPipelineStage.FreeTrial]: "bg-amber-500",
  [ShopPipelineStage.Paused]: "bg-slate-500",
  [ShopPipelineStage.Using]: "bg-emerald-500",
  [ShopPipelineStage.Cancelled]: "bg-rose-500",
};

export const ShopBoardColumn = ({ stage, shops, onOpenComments }: IProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: stage });

  return (
    <div className="flex flex-col min-w-[280px] w-[280px] rounded-md border bg-muted/30">
      <div className="flex items-center gap-2 px-3 py-2 border-b">
        <span className={cn("h-2 w-2 rounded-full", stageAccent[stage])} />
        <h3 className="font-medium text-sm">
          {shopPipelineStageTranslations[stage]}
        </h3>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {shops.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 p-2 space-y-2 min-h-[200px] transition-colors",
          isOver && "bg-accent/50"
        )}
      >
        {shops.map((shop) => (
          <ShopBoardCard
            key={shop._id}
            shop={shop}
            onOpenComments={onOpenComments}
          />
        ))}
        {shops.length === 0 && (
          <div className="text-xs text-muted-foreground text-center py-6">
            Bo'sh
          </div>
        )}
      </div>
    </div>
  );
};
