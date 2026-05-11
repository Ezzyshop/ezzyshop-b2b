import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getBoardShopsQueryFn } from "@/api/queries/shops.query";
import { updateShopPipelineStageMutationFn } from "@/api/mutations/shops.mutation";
import { useQueryParams } from "@/hooks";
import { IShop, ShopPipelineStage, SHOP_PIPELINE_STAGES } from "../../utils";
import { ShopBoardColumn } from "./shop-board-column";
import { ShopBoardCard } from "./shop-board-card";
import { ShopCommentsSheet } from "../shop-comments/shop-comments-sheet";
import { Skeleton } from "@/components/ui/skeleton";

export const ShopsBoardView = () => {
  const queryClient = useQueryClient();
  const { getQueryParams } = useQueryParams();
  const params = getQueryParams();

  const boardFilters = useMemo(() => {
    const { view, page, limit, ...rest } = params;
    void view;
    void page;
    void limit;
    return rest;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  const { data, isLoading } = useQuery({
    queryKey: ["shops-board", boardFilters],
    queryFn: () => getBoardShopsQueryFn(boardFilters),
  });

  const shops = data?.data ?? [];

  const grouped = useMemo(() => {
    const map: Record<ShopPipelineStage, IShop[]> = {
      [ShopPipelineStage.Planning]: [],
      [ShopPipelineStage.FreeTrial]: [],
      [ShopPipelineStage.Paused]: [],
      [ShopPipelineStage.Using]: [],
      [ShopPipelineStage.Cancelled]: [],
    };
    for (const shop of shops) {
      const stage = shop.pipeline_stage ?? ShopPipelineStage.Planning;
      if (map[stage]) map[stage].push(shop);
    }
    return map;
  }, [shops]);

  const [activeShop, setActiveShop] = useState<IShop | null>(null);
  const [commentsShop, setCommentsShop] = useState<IShop | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const { mutate: moveShop } = useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: ShopPipelineStage }) =>
      updateShopPipelineStageMutationFn(id, stage),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["shops-board"] });
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      queryClient.invalidateQueries({
        queryKey: ["shop-pipeline-history", variables.id],
      });
      toast.success("Bosqich yangilandi");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["shops-board"] });
      toast.error("Bosqichni yangilashda xatolik");
    },
  });

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id as string;
    setActiveShop(shops.find((s) => s._id === id) ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveShop(null);
    if (!over) return;

    const shopId = active.id as string;
    const targetStage = over.id as ShopPipelineStage;
    if (!SHOP_PIPELINE_STAGES.includes(targetStage)) return;

    const shop = shops.find((s) => s._id === shopId);
    if (!shop) return;
    const currentStage = shop.pipeline_stage ?? ShopPipelineStage.Planning;
    if (currentStage === targetStage) return;

    queryClient.setQueryData<{ data: IShop[] } | undefined>(
      ["shops-board", boardFilters],
      (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.map((s) =>
            s._id === shopId ? { ...s, pipeline_stage: targetStage } : s
          ),
        };
      }
    );

    moveShop({ id: shopId, stage: targetStage });
  };

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {SHOP_PIPELINE_STAGES.map((stage) => (
          <Skeleton
            key={stage}
            className="h-[400px] w-[280px] shrink-0 rounded-md"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          {SHOP_PIPELINE_STAGES.map((stage) => (
            <ShopBoardColumn
              key={stage}
              stage={stage}
              shops={grouped[stage]}
              onOpenComments={setCommentsShop}
            />
          ))}
        </div>
        <DragOverlay>
          {activeShop ? (
            <div className="w-[264px]">
              <ShopBoardCard shop={activeShop} onOpenComments={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <ShopCommentsSheet
        shop={commentsShop}
        onClose={() => setCommentsShop(null)}
      />
    </>
  );
};
