import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBranchMutationFn } from "@/api/mutations";
import { useTranslation } from "react-i18next";
import { useShopContext } from "@/contexts";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { IBranch } from "../../utils/branches.interface";
import { useState } from "react";

interface IProps {
  branch: IBranch;
}

export const DeleteBranch = ({ branch }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const deleteBranchMutation = useMutation({
    mutationFn: (id: string) => deleteBranchMutationFn(shop._id, id),
    onSuccess: () => {
      toast.success(t("dashboard.branches.deleted"));
      queryClient.invalidateQueries({ queryKey: ["branches", shop._id] });
      setIsOpen(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="size-8">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dashboard.branches.delete")}</DialogTitle>
          <DialogDescription>
            {t("dashboard.branches.delete_description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t("common.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteBranchMutation.mutate(branch._id)}
          >
            {t("common.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
