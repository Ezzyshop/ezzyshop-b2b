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

export const shopTypesTranslations: Record<
  ShopPlatform | ShopStatus | BusinessType,
  string
> = {
  [ShopPlatform.Telegram]: "Telegram",
  [ShopStatus.Active]: "Aktiv",
  [ShopStatus.Inactive]: "Inaktiv",
  [BusinessType.OnlineStore]: "Onlayn do'kon",
};

export enum LanguageType {
  Uz = "uz",
  Ru = "ru",
  En = "en",
}

export const languageLabels = {
  [LanguageType.Uz]: "UZ",
  [LanguageType.En]: "EN",
  [LanguageType.Ru]: "RU",
};
