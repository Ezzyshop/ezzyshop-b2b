import { changePlanStatusMutationFn } from "@/api/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlanStatus } from "../../utils/plan.enum";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface IProps {
  id: string;
  status: PlanStatus;
}

export const PlanStatusSwitch = ({ id, status }: IProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { status: PlanStatus }) =>
      changePlanStatusMutationFn(id, data),
    onSuccess: () => {
      toast.success("Tarif holati muvaffaqiyatli o'zgartirildi");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  return (
    <Switch
      className="cursor-pointer data-[state=checked]:bg-primary data-[state=unchecked]:bg-red-500"
      checked={status === PlanStatus.Active}
      disabled={isPending}
      onCheckedChange={() =>
        mutate({
          status:
            status === PlanStatus.Active
              ? PlanStatus.Inactive
              : PlanStatus.Active,
        })
      }
    />
  );
};
