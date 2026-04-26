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
import { Trash2 } from "lucide-react";
import { deleteReviewMutationFn } from "@/api/mutations";
import { IReview } from "../../utils/review.interface";

interface IProps {
  review: IReview;
  shopId: string;
}

export const ReviewDeleteButton = ({ review, shopId }: IProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteReviewMutationFn(shopId, review._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", shopId] });
      setOpen(false);
    },
  });

  return (
    <>
      <Button size="sm" variant="destructive" onClick={() => setOpen(true)}>
        <Trash2 className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("reviews.delete")}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{t("reviews.delete_confirm")}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" disabled={isPending} onClick={() => mutate()}>
              {t("reviews.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
