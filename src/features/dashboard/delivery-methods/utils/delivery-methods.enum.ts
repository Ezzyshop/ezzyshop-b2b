export enum DeliveryMethodStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

export enum DeliveryMethodDeliveryType {
  Fixed = "FIXED",
  Dynamic = "DYNAMIC",
  Free = "FREE",
  Custom = "CUSTOM",
}

export enum DeliveryMethodType {
  Pickup = "PICKUP",
  Delivery = "DELIVERY",
}

export enum DeliveryMethodEstimatedDayPrefix {
  Min = "MINUTE",
  Day = "DAY",
  Hour = "HOUR",
}

export const deliveryMethodEstimatedDayPrefixLabel = {
  [DeliveryMethodEstimatedDayPrefix.Min]: "common.minute",
  [DeliveryMethodEstimatedDayPrefix.Day]: "common.day",
  [DeliveryMethodEstimatedDayPrefix.Hour]: "common.hour",
};

export const deliveryMethodDeliveryTypeLabel = {
  [DeliveryMethodDeliveryType.Fixed]: "common.fixed",
  [DeliveryMethodDeliveryType.Dynamic]: "common.dynamic",
  [DeliveryMethodDeliveryType.Free]: "common.free",
  [DeliveryMethodDeliveryType.Custom]: "common.custom",
};

export enum DeliveryMethodPricingMode {
  PerKm = "PER_KM",
  FlatAfterThreshold = "FLAT_AFTER_THRESHOLD",
}

export const deliveryMethodPricingModeLabel = {
  [DeliveryMethodPricingMode.PerKm]: "dashboard.delivery-methods.pricing_mode_per_km",
  [DeliveryMethodPricingMode.FlatAfterThreshold]:
    "dashboard.delivery-methods.pricing_mode_flat",
};