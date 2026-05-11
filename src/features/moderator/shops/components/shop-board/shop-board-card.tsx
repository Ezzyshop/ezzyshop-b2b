import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CreditCardIcon, EditIcon, MessageSquareIcon } from "lucide-react";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { IShop } from "../../utils";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";

interface IProps {
  shop: IShop;
  onOpenComments: (shop: IShop) => void;
}

export const ShopBoardCard = ({ shop, onOpenComments }: IProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: shop._id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-md border bg-card shadow-sm p-3 space-y-2 select-none"
    >
      <div
        className="cursor-grab active:cursor-grabbing space-y-1.5"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="font-medium text-sm leading-tight line-clamp-2">
            {shop.name}
          </div>
          {shop.plan?.name && (
            <Badge variant="outline" className="shrink-0 text-[10px]">
              {shop.plan.name}
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {shop.owner?.full_name ?? "—"}
        </div>
        <div className="text-[11px] text-muted-foreground">
          {dayjs(shop.createdAt).format("DD.MM.YYYY")}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 pt-1 border-t">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onOpenComments(shop)}
          title="Izohlar"
        >
          <MessageSquareIcon className="w-3.5 h-3.5" />
        </Button>
        <Button asChild variant="ghost" size="icon" className="h-7 w-7">
          <NavLink to={`/moderator/shops/${shop._id}/edit`} title="Tahrirlash">
            <EditIcon className="w-3.5 h-3.5" />
          </NavLink>
        </Button>
        <Button asChild variant="ghost" size="icon" className="h-7 w-7">
          <NavLink
            to={`/moderator/shops/${shop._id}/plan`}
            title="Tarifni o'zgartirish"
          >
            <CreditCardIcon className="w-3.5 h-3.5" />
          </NavLink>
        </Button>
      </div>
    </div>
  );
};
