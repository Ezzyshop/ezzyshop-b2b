import { getCurrentUser } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useMemo } from "react";
import { UserContext } from "./user.context";
import { GlobalLoader } from "@/components/loaders/global-loader";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  const value = useMemo(() => ({ user: data?.data ?? null }), [data]);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
