export enum OrderStatus {
  New = "NEW",
  Processing = "PROCESSING",
  CourierInShop = "COURIER_IN_SHOP",
  Delivering = "DELIVERING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

export const orderStatusTranslations = {
  [OrderStatus.New]: "dashboard.orders.status.new",
  [OrderStatus.Processing]: "dashboard.orders.status.processing",
  [OrderStatus.CourierInShop]: "dashboard.orders.status.courier_in_shop",
  [OrderStatus.Delivering]: "dashboard.orders.status.delivering",
  [OrderStatus.Completed]: "dashboard.orders.status.completed",
  [OrderStatus.Cancelled]: "dashboard.orders.status.cancelled",
};
