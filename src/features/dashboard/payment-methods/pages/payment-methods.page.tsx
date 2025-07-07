import { getPaymentMethodsQueryFn } from "@/api/queries";
import { DashboardLayoutLoader } from "@/components/loaders/global-loader";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { PaymentMethodCard } from "../components/payment-method-card";
import { useTranslation } from "react-i18next";
import { AddPaymentMethod } from "../components/payment-method-form/add-payment-method";

export const PaymentMethodsPage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["payment-methods", shop._id],
    queryFn: () => getPaymentMethodsQueryFn(shop._id),
  });

  const renderContent = () => {
    if (isLoading) return <DashboardLayoutLoader />;
    if (data?.data.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((paymentMethod) => (
          <PaymentMethodCard
            key={paymentMethod._id}
            paymentMethod={paymentMethod}
          />
        ))}
      </div>
    );
  };

  console.log(data?.data);

  return (
    <div className="space-y-4 md:space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {t("sidebar.dashboard.payment-methods")}
        </h1>
        <AddPaymentMethod />
      </div>

      {renderContent()}
    </div>
  );
};

export default PaymentMethodsPage;
