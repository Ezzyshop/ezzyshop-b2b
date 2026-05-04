import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserForm } from "../components/user-form/user-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IUserCreateForm, IUserForm } from "@/lib/interfaces";
import { createUserMutationFn } from "@/api/mutations";

export const UserCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (data: IUserCreateForm) => createUserMutationFn(data),
    onSuccess: () => {
      toast.success("Foydalanuvchi yaratilindi.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/moderator/users");
    },
  });

  const handleSubmit = (data: IUserForm | IUserCreateForm) => {
    createUserMutation.mutate(data as IUserCreateForm);
  };

  return (
    <UserForm
      onSubmit={handleSubmit}
      isLoading={createUserMutation.isPending}
    />
  );
};

export default UserCreatePage;
