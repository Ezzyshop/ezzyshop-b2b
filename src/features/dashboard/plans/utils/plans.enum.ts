export enum PlansType {
  Monthly = "MONTHLY",
  Annual = "ANNUAL",
}

export const plansTypeTranslations: Record<PlansType, string> = {
  [PlansType.Monthly]: "Oylik",
  [PlansType.Annual]: "Yillik",
};
