import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IDeliveryMethod } from "../utils/delivery-methods.interface";
import { useTranslation } from "react-i18next";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import { EditDeliveryMethod } from "./delivery-method-form/edit-delivery-method";
import {
  DeliveryMethodDeliveryType,
  deliveryMethodDeliveryTypeLabel,
  deliveryMethodEstimatedDayPrefixLabel,
} from "../utils/delivery-methods.enum";

interface IProps {
  deliveryMethod: IDeliveryMethod;
}

export const DeliveryMethodCard = ({ deliveryMethod }: IProps) => {
  const { i18n, t } = useTranslation();
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>
          {
            deliveryMethod.name[
              i18n.language as keyof typeof deliveryMethod.name
            ]
          }
        </CardTitle>
        <div className="flex items-center gap-2">
          <StatusChangeSwitch
            status={deliveryMethod.status}
            url={`/delivery-methods/${deliveryMethod.shop._id}/${deliveryMethod._id}/status`}
            invalidateQueryKey={["delivery-methods"]}
          />
          <EditDeliveryMethod deliveryMethod={deliveryMethod} />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {deliveryMethod.deliveryType === DeliveryMethodDeliveryType.Dynamic ? (
          <p className="text-2xl font-bold">
            {deliveryMethod.initial_km_price?.toLocaleString()}{" "}
            {deliveryMethod.currency.symbol} / {t("common.km")}
          </p>
        ) : (
          <p className="text-2xl font-bold">
            {deliveryMethod.price?.toLocaleString()}{" "}
            {deliveryMethod.currency.symbol}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm">
            {t("dashboard.delivery-methods.delivery_type")}:
          </p>
          {deliveryMethod.deliveryType && (
            <p className="text-sm">
              {t(deliveryMethodDeliveryTypeLabel[deliveryMethod.deliveryType])}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm">
            {t("dashboard.delivery-methods.estimated_days")}:
          </p>
          <p className="text-sm">
            {deliveryMethod.estimated_days}{" "}
            {t(
              deliveryMethodEstimatedDayPrefixLabel[
                deliveryMethod.estimated_day_prefix
              ]
            )}
          </p>
        </div>
        {deliveryMethod.pickup_location && (
          <div className="flex items-center justify-between gap-2">
            <p className="text-muted-foreground text-sm">
              {t("dashboard.delivery-methods.pickup_location")}:
            </p>
            <p className="text-sm">{deliveryMethod.pickup_location}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
