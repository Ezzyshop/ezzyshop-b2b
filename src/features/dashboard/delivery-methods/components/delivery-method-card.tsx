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
            {deliveryMethod.initial_km_price?.toLocaleString()} UZS /{" "}
            {t("common.km")}
          </p>
        ) : (
          <p className="text-2xl font-bold">
            {deliveryMethod.price?.toLocaleString()} UZS
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
            {deliveryMethod.estimated_day_prefix &&
              t(
                deliveryMethodEstimatedDayPrefixLabel[
                  deliveryMethod.estimated_day_prefix
                ]
              )}
          </p>
        </div>

        {deliveryMethod.deliveryType === DeliveryMethodDeliveryType.Dynamic && (
          <>
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-sm">
                {deliveryMethod.initial_km}{" "}
                {t("dashboard.delivery-methods.initial_km_price_prefix")}:
              </p>
              <p className="text-sm">
                {deliveryMethod.initial_km_price?.toLocaleString()} UZS
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-sm">
                {t("dashboard.delivery-methods.every_km_price_prefix")}:
              </p>
              <p className="text-sm">
                {deliveryMethod.every_km_price?.toLocaleString()} UZS
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
