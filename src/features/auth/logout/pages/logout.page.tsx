import { logoutMutationFn } from "@/api/mutations";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      navigate("/login");
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return null;
};

export default LogoutPage;
