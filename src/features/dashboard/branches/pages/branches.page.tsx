import { getBranchesQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { DashboardLayoutLoader } from "@/components/loaders/global-loader";
import { BranchEmptyState } from "../components/branch-empty-state";
import { BranchCard } from "../components/branch-card";
import { AddBranch } from "../components/branch-form/add-branch";

export const BranchesPage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["branches", shop._id],
    queryFn: () => getBranchesQueryFn(shop._id),
  });

  const renderContent = () => {
    if (isLoading) return <DashboardLayoutLoader />;
    if (data?.data.length === 0) return <BranchEmptyState />;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((branch) => (
          <BranchCard key={branch._id} branch={branch} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {t("sidebar.dashboard.branches")}
        </h1>
        <AddBranch />
      </div>

      {renderContent()}
    </div>
  );
};

export default BranchesPage;
