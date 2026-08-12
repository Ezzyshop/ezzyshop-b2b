import { logoutMutationFn } from "@/api/mutations";
import { postToNative } from "@/lib/native-bridge";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      postToNative({ type: "logout" });
      navigate("/login");
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return null;
};

export default LogoutPage;
