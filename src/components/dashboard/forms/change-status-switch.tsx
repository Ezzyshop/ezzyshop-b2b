import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { api } from "@/api/axios";

enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

interface IProps {
  status: "ACTIVE" | "INACTIVE";
  url: string;
  invalidateQueryKey: string[];
}

export const StatusChangeSwitch = ({
  status,
  url,
  invalidateQueryKey,
}: IProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { status: Status }) => api.put(url, data),
    onSuccess: () => {
      toast.success("Holat muvaffaqiyatli o'zgartirildi");
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    },
  });

  return (
    <Switch
      className="cursor-pointer data-[state=checked]:bg-primary data-[state=unchecked]:bg-red-500"
      checked={status === Status.Active}
      disabled={isPending}
      onCheckedChange={() =>
        mutate({
          status: status === Status.Active ? Status.Inactive : Status.Active,
        })
      }
    />
  );
};
