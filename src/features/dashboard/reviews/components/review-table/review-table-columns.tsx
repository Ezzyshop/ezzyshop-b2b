import { ColumnDef } from "@tanstack/react-table";
import { IReview } from "../../utils/review.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { ArrowDown, ArrowUp, ArrowUpDown, Star } from "lucide-react";
import { TFunction } from "i18next";
import { ReviewReplyButton } from "./review-reply-button";
import { ReviewDeleteButton } from "./review-delete-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-none text-muted-foreground"}`}
      />
    ))}
    <span className="text-sm ml-1">{rating}</span>
  </div>
);

const ImageLightbox = ({ images }: { images: string[] }) => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <div className="flex gap-1 flex-wrap">
        {images.slice(0, 3).map((img) => (
          <button
            key={img}
            type="button"
            onClick={() => setOpen(img)}
            className="relative w-10 h-10 rounded overflow-hidden border hover:opacity-80 transition-opacity"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center"
          onClick={() => setOpen(null)}
        >
          <div className="relative max-w-lg max-h-[80vh] w-full mx-4">
            <img
              src={open}
              alt=""
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const reviewTableColumns = (
  shopId: string,
  lang: string,
  t: TFunction,
  sortBy?: string,
  sortOrder?: string,
  onSortRating?: () => void,
): ColumnDef<IReview>[] => {
  const ratingSort = sortBy === "rating" ? sortOrder : "";
  const RatingSortIcon = ratingSort === "desc" ? ArrowDown : ratingSort === "asc" ? ArrowUp : ArrowUpDown;

  return [
    {
      header: t("reviews.product"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.original.product.main_image} className="object-cover" />
            <AvatarFallback>
              {(
                row.original.product.name[lang as keyof typeof row.original.product.name] ??
                row.original.product.name.uz
              )?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm line-clamp-2 max-w-40">
            {row.original.product.name[lang as keyof typeof row.original.product.name] ??
              row.original.product.name.uz}
          </span>
        </div>
      ),
    },
    {
      header: t("reviews.customer"),
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium">{row.original.user?.full_name ?? "—"}</p>
          {row.original.user?.phone && (
            <p className="text-xs text-muted-foreground">{row.original.user.phone}</p>
          )}
        </div>
      ),
    },
    {
      id: "rating",
      header: () =>
        onSortRating ? (
          <button
            className={`flex items-center gap-1 hover:text-foreground transition-colors ${ratingSort ? "text-primary" : ""}`}
            onClick={onSortRating}
          >
            {t("reviews.rating")}
            <RatingSortIcon className={`h-4 w-4 ${ratingSort ? "opacity-100" : "opacity-40"}`} />
          </button>
        ) : (
          t("reviews.rating")
        ),
      cell: ({ row }) => <StarDisplay rating={row.original.rating} />,
    },
    {
      header: t("reviews.message"),
      cell: ({ row }) => (
        <div className="space-y-1 max-w-xs">
          {row.original.message ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm truncate max-w-xs cursor-default">{row.original.message}</p>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm whitespace-pre-wrap">
                  {row.original.message}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
          {row.original.images.length > 0 && (
            <ImageLightbox images={row.original.images} />
          )}
        </div>
      ),
    },
    {
      header: t("table.columns.created_at"),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {dayjs(row.original.createdAt).format("DD.MM.YYYY")}
        </span>
      ),
    },
    {
      header: t("table.columns.actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <ReviewReplyButton review={row.original} shopId={shopId} />
          <ReviewDeleteButton review={row.original} shopId={shopId} />
        </div>
      ),
    },
  ];
};
