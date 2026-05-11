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

export enum HomepageLayout {
  Classic = "CLASSIC",
  Editorial = "EDITORIAL",
}

export enum ShopPipelineStage {
  Planning = "PLANNING",
  FreeTrial = "FREE_TRIAL",
  Paused = "PAUSED",
  Using = "USING",
  Cancelled = "CANCELLED",
}

export const shopPipelineStageTranslations: Record<ShopPipelineStage, string> =
  {
    [ShopPipelineStage.Planning]: "Rejalashtirilgan",
    [ShopPipelineStage.FreeTrial]: "Sinov muddati",
    [ShopPipelineStage.Paused]: "To'xtatilgan",
    [ShopPipelineStage.Using]: "Foydalanmoqda",
    [ShopPipelineStage.Cancelled]: "Bekor qilingan",
  };

export const SHOP_PIPELINE_STAGES: ShopPipelineStage[] = [
  ShopPipelineStage.Planning,
  ShopPipelineStage.FreeTrial,
  ShopPipelineStage.Paused,
  ShopPipelineStage.Using,
  ShopPipelineStage.Cancelled,
];
