import { Card, CardContent } from "@/components/ui/card";
import { IOrderResponse } from "../../utils/order.interface";
import { useTranslation } from "react-i18next";
import { MapIcon } from "lucide-react";
import { useShopContext } from "@/contexts";

interface IProps {
  order: IOrderResponse;
}

export const OrderAddress = ({ order }: IProps) => {
  const { t } = useTranslation();
  const isPickup = !order.delivery_address;
  const { shop } = useShopContext();

  const handleViewOnMap = () => {
    const address = isPickup ? order.pickup_address : order.delivery_address;
    window.open(
      `https://yandex.uz/maps/?ll=${shop.address.lat}%2C${shop.address.long}&mode=routes&rtext=${address?.lat}%2C${address?.lng}~${shop.address.lat}%2C${shop.address.long}`
    );
  };

  return (
    <Card className="py-4">
      <CardContent>
        <div className="space-y-2">
          <div className="font-medium">
            {isPickup
              ? t("dashboard.orders.pickup_address")
              : t("dashboard.orders.delivery_address")}
          </div>
          <div className="text-sm">
            {isPickup
              ? order.pickup_address?.address
              : order.delivery_address?.address}
          </div>

          <button
            onClick={handleViewOnMap}
            className="flex items-center gap-2 text-primary cursor-pointer hover:underline"
          >
            <MapIcon className="w-4 h-4" />
            <span>{t("dashboard.orders.view_on_map")} (Yandex Maps)</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
