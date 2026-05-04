import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { deleteUserMutationFn } from "@/api/mutations";

interface IProps {
  userId: string;
  userName: string;
}

export const DeleteUserDialog = ({ userId, userName }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteUserMutationFn(userId),
    onSuccess: () => {
      toast.success("Foydalanuvchi o'chirildi");
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
          title="O'chirish"
        >
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Foydalanuvchini o'chirish</DialogTitle>
          <DialogDescription>
            {userName} foydalanuvchisini o'chirmoqchimisiz? Foydalanuvchi
            ro'yxatdan yashiriladi.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            Bekor qilish
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate()}
          >
            O'chirish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
