export interface ITelegram {
  _id: string;
  menu_text: string;
  token: string;
}

export type TTelegramForm = Pick<ITelegram, "menu_text" | "token">;
