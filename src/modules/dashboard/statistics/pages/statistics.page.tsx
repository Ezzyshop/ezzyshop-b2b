import { useUserContext } from "@/contexts/user-context/user.context";

export const StatisticsPage = () => {
  const { user } = useUserContext();

  return <div>StatisticsPage {user?.full_name}</div>;
};

export default StatisticsPage;
