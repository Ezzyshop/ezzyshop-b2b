import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Star, MessageSquare } from "lucide-react";
import { replyReviewMutationFn } from "@/api/mutations";
import { IReview } from "../../utils/review.interface";

interface IProps {
  review: IReview;
  shopId: string;
}

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-none text-muted-foreground"}`}
      />
    ))}
    <span className="text-sm ml-1 font-medium">{rating}</span>
  </div>
);

export const ReviewReplyButton = ({ review, shopId }: IProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState(review.reply ?? "");

  const { mutate, isPending } = useMutation({
    mutationFn: () => replyReviewMutationFn(shopId, review._id, reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", shopId] });
      setOpen(false);
    },
  });

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1"
      >
        <MessageSquare className="w-4 h-4" />
        {t("reviews.reply")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("reviews.reply")}</DialogTitle>
          </DialogHeader>

          {/* Review context */}
          <div className="space-y-2 rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{review.user?.full_name ?? "—"}</p>
              <StarDisplay rating={review.rating} />
            </div>
            {review.message && (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{review.message}</p>
            )}
            {review.images.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {review.images.map((img) => (
                  <a key={img} href={img} target="_blank" rel="noreferrer">
                    <img src={img} alt="" className="w-12 h-12 rounded object-cover border" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <Separator />

          <Textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={t("reviews.reply_placeholder")}
            maxLength={1000}
            rows={4}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button disabled={isPending || !reply.trim()} onClick={() => mutate()}>
              {t("reviews.save_reply")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
