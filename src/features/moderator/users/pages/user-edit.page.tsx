import { updateUserMutationFn } from "@/api/mutations";
import { getUserByIdQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { IUserForm } from "@/lib/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserForm } from "../components/user-form/user-form";
import { toast } from "sonner";

export const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByIdQueryFn(id as string),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IUserForm) => updateUserMutationFn(id as string, data),
    onSuccess: () => {
      toast.success("Foydalanuvchi tahrirlandi");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      navigate("/moderator/users");
    },
  });

  const initialValues: IUserForm = useMemo(() => {
    if (!user?.data) return {} as IUserForm;

    return {
      full_name: user.data.full_name,
      phone: user.data.phone,
      photo: user.data.photo,
      roles: user.data.roles,
    };
  }, [user]);

  if (isLoading) return <LayoutLoader />;

  return (
    <UserForm
      initialValues={initialValues}
      onSubmit={mutate}
      isLoading={isPending}
    />
  );
};

export default UserEditPage;
