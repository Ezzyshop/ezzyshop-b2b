import { getCurrentUser } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useMemo } from "react";
import { UserContext } from "./user.context";
import { GlobalLoader } from "@/components/loaders/global-loader";
import { IResponse } from "@/api/utils/axios.interface";
import { IUser } from "@/lib";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading, refetch } = useQuery<IResponse<IUser>>({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  const value = useMemo(
    () => ({ user: data?.data as IUser, refetch }),
    [data, refetch]
  );

  if (isLoading) {
    return <GlobalLoader />;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
