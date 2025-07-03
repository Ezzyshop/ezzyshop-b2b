import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { api } from "@/api/axios";

interface IProps {
  is_popular: boolean;
  url: string;
  invalidateQueryKey: string[];
}

export const ChangePopularStatus = ({
  is_popular,
  url,
  invalidateQueryKey,
}: IProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { is_popular: boolean }) => api.put(url, data),
    onSuccess: () => {
      toast.success("Holat muvaffaqiyatli o'zgartirildi");
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    },
  });

  return (
    <Switch
      className="cursor-pointer data-[state=checked]:bg-primary data-[state=unchecked]:bg-red-500"
      checked={is_popular}
      disabled={isPending}
      onCheckedChange={() =>
        mutate({
          is_popular: !is_popular,
        })
      }
    />
  );
};
