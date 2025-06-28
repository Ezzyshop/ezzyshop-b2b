export enum BusinessType {
  OnlineStore = "ONLINE_STORE",
}

export enum ShopPlatform {
  Telegram = "TELEGRAM",
}

export enum ShopStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

export const enumTranslate: Record<
  ShopPlatform | ShopStatus | BusinessType,
  string
> = {
  [ShopPlatform.Telegram]: "Telegram",
  [ShopStatus.Active]: "Aktiv",
  [ShopStatus.Inactive]: "Inaktiv",
  [BusinessType.OnlineStore]: "Onlayn do'kon",
};
