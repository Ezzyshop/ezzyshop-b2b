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

export enum ShopPriority {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3,
}

export const SHOP_PRIORITIES: ShopPriority[] = [
  ShopPriority.Urgent,
  ShopPriority.High,
  ShopPriority.Medium,
  ShopPriority.Low,
];

export const shopPriorityTranslations: Record<ShopPriority, string> = {
  [ShopPriority.Low]: "Past",
  [ShopPriority.Medium]: "O'rtacha",
  [ShopPriority.High]: "Yuqori",
  [ShopPriority.Urgent]: "Shoshilinch",
};

export const shopPriorityBadgeClass: Record<ShopPriority, string> = {
  [ShopPriority.Low]: "bg-slate-200 text-slate-700 border-transparent",
  [ShopPriority.Medium]: "bg-blue-200 text-blue-800 border-transparent",
  [ShopPriority.High]: "bg-amber-200 text-amber-900 border-transparent",
  [ShopPriority.Urgent]: "bg-rose-200 text-rose-900 border-transparent",
};
