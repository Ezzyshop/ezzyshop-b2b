import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useShopContext } from "@/contexts";
import { getOrderQueryFn } from "@/api/queries";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { OrderCustomer } from "../components/order-page/order-customer";
import { OrderSummary } from "../components/order-page/order-summary";
import { OrderStatusProgress } from "../components/order-page/order-status/order-status-progress";
import { OrderItems } from "../components/order-page/order-items";
import { OrderNote } from "../components/order-page/order-note";
import { OrderAddress } from "../components/order-page/order-address";
import { OrderCheques } from "../components/order-page/order-cheques/order-cheques";
import { useTranslation } from "react-i18next";
import { OrderTransactionStatus } from "../components/order-page/order-transaction-status";
import { OrderStatusHistory } from "../components/order-page/order-status-history";

export const OrderPage = () => {
  const { orderId } = useParams();
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["order", shop._id, orderId],
    queryFn: () => getOrderQueryFn(shop._id, orderId as string),
    enabled: Boolean(shop._id && orderId),
  });

  const order = data?.data;

  if (isLoading || !order) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="gap-4 md:gap-6 grid grid-cols-1 lg:grid-cols-4">
      <div className="flex col-span-1 md:col-span-4 items-center justify-between gap-2">
        <div className="flex flex-col items-start gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/orders">
              <ArrowLeft className="mr-1" /> {t("common.back")}
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">
            {t("dashboard.orders.order")} {order._id}
          </h1>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6 col-span-1 md:col-span-3 flex flex-col">
        <OrderStatusProgress order={order} />
        <OrderItems order={order} />
        <OrderStatusHistory order={order} />
      </div>
      <div className="space-y-4 md:space-y-6">
        <OrderSummary order={order} />
        <OrderNote order={order} />
        <OrderTransactionStatus order={order} />
        <OrderCheques order={order} />
        <OrderCustomer order={order} />
        <OrderAddress order={order} />
      </div>
    </div>
  );
};

export default OrderPage;
