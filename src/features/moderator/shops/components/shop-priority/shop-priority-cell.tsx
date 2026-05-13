import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { toast } from "sonner";
import { updateShopPriorityMutationFn } from "@/api/mutations/shops.mutation";
import { Badge } from "@/components/ui/badge/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  IShop,
  SHOP_PRIORITIES,
  ShopPriority,
  shopPriorityBadgeClass,
  shopPriorityTranslations,
} from "../../utils";

interface IProps {
  shop: IShop;
  size?: "sm" | "md";
}

export const ShopPriorityCell = ({ shop, size = "md" }: IProps) => {
  const queryClient = useQueryClient();
  const currentPriority = shop.priority ?? ShopPriority.Low;

  const { mutate, isPending } = useMutation({
    mutationFn: (priority: ShopPriority) =>
      updateShopPriorityMutationFn(shop._id, priority),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      queryClient.invalidateQueries({ queryKey: ["shops-board"] });
      toast.success("Muhimligi yangilandi");
    },
    onError: () => {
      toast.error("Muhimligini yangilashda xatolik");
    },
  });

  const handleSelect = (next: ShopPriority) => {
    if (next === currentPriority || isPending) return;
    mutate(next);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center cursor-pointer disabled:opacity-50",
            isPending && "opacity-60"
          )}
        >
          <Badge
            className={cn(
              shopPriorityBadgeClass[currentPriority],
              "gap-1",
              size === "sm" && "text-[10px] px-1.5 py-0"
            )}
          >
            {shopPriorityTranslations[currentPriority]}
            <ChevronDownIcon
              className={cn(size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3")}
            />
          </Badge>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        {SHOP_PRIORITIES.map((priority) => (
          <DropdownMenuItem
            key={priority}
            onClick={() => handleSelect(priority)}
            className="gap-2"
          >
            <Badge className={cn(shopPriorityBadgeClass[priority])}>
              {shopPriorityTranslations[priority]}
            </Badge>
            {priority === currentPriority && (
              <CheckIcon className="w-3.5 h-3.5 ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
