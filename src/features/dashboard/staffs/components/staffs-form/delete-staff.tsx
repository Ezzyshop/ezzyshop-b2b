import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { IUser } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStaffMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { toast } from "sonner";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IProps {
  staff: IUser;
}

export const DeleteStaff = ({ staff }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteStaff, isPending } = useMutation({
    mutationFn: () => deleteStaffMutationFn(shop._id, staff._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      toast.success(t("dashboard.staffs.deleted"));
      setIsOpen(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          disabled={isPending}
          className="cursor-pointer"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dashboard.staffs.delete")}</DialogTitle>
          <DialogDescription>
            {t("dashboard.staffs.delete_description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => deleteStaff()}
          >
            {t("dashboard.staffs.delete")}
          </Button>

          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            {t("common.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
