export type ButtonAction = 'menu' | 'orders' | 'feedback' | 'language';

export type ButtonType = 'callback' | 'url';

export interface IBotTemplateButton {
  text: string;
  action: ButtonAction;
  type: ButtonType;
  order: number;
}

export interface IBotTemplate {
  _id: string;
  botId: string;
  welcomeMessage: string;
  menuHintText: string;
  buttons: IBotTemplateButton[];
  createdAt: string;
  updatedAt: string;
}

export type TBotTemplateForm = {
  welcomeMessage: string;
  menuHintText: string;
  buttons: IBotTemplateButton[];
};
