import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { IRole } from "@/lib/types/permission.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoleMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { toast } from "sonner";
import { useState } from "react";
import { Trash } from "lucide-react";

interface IProps {
  role: IRole;
}

export const DeleteRole = ({ role }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteRole, isPending } = useMutation({
    mutationFn: () => deleteRoleMutationFn(shop._id, role._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles", shop._id] });
      toast.success(t("dashboard.roles.deleted"));
      setIsOpen(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dashboard.roles.delete")}</DialogTitle>
          <DialogDescription>{t("dashboard.roles.delete_description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" disabled={isPending} onClick={() => deleteRole()}>
            {t("dashboard.roles.delete")}
          </Button>
          <Button variant="outline" disabled={isPending} onClick={() => setIsOpen(false)}>
            {t("common.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
