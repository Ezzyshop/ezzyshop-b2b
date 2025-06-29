import { useMutation } from "@tanstack/react-query";
import { UserForm } from "../components/user-form/user-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IUserForm } from "@/lib/interfaces";
import { createUserMutationFn } from "@/api/mutations";

export const UserCreatePage = () => {
  const navigate = useNavigate();

  const createUserMutation = useMutation({
    mutationFn: (data: IUserForm) => createUserMutationFn(data),
    onSuccess: () => {
      toast.success("Foydalanuvchi yaratilindi.");
      navigate("/dashboard/users");
    },
  });

  const handleSubmit = (data: IUserForm) => {
    createUserMutation.mutate(data);
  };

  return (
    <UserForm
      onSubmit={handleSubmit}
      isLoading={createUserMutation.isPending}
    />
  );
};

export default UserCreatePage;
