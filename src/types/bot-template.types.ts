export interface IBotTemplate {
  _id: string;
  botId: string;
  welcomeMessage: string;
  menuHintText: string;
  createdAt: string;
  updatedAt: string;
}

export type TBotTemplateForm = {
  welcomeMessage: string;
  menuHintText: string;
};
