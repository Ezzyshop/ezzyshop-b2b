import { UserContextProvider } from "@/contexts/user-context/user.context-provider";
import { PropsWithChildren } from "react";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};
