import { TelegramBusinessType } from "./telegram.enum";

export interface ITelegram {
  _id: string;
  menu_text: string;
  token: string;
  business_type: TelegramBusinessType;
}

export type TTelegramForm = Pick<
  ITelegram,
  "menu_text" | "token" | "business_type"
>;
