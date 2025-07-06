import { getDeliveryMethodsQueryFn } from "@/api/queries";
import { DashboardLayoutLoader } from "@/components/loaders/global-loader";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { AddDeliveryMethod } from "../components/delivery-method-form/add-delivery-method";
import { DeliveryMethodCard } from "../components/delivery-method-card";
import { DeliveryMethodEmptyState } from "../components/delivery-method-empty-state";

export const DeliveryMethodsPage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["delivery-methods", shop._id],
    queryFn: () => getDeliveryMethodsQueryFn(shop._id),
  });

  const renderContent = () => {
    if (isLoading) return <DashboardLayoutLoader />;
    if (data?.data.length === 0) return <DeliveryMethodEmptyState />;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((deliveryMethod) => (
          <DeliveryMethodCard
            key={deliveryMethod._id}
            deliveryMethod={deliveryMethod}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {t("sidebar.dashboard.delivery-methods")}
        </h1>
        <AddDeliveryMethod />
      </div>

      {renderContent()}
    </div>
  );
};

export default DeliveryMethodsPage;
