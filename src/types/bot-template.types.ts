export interface IBotTemplate {
  _id: string;
  botId: string;
  welcomeMessage: string;
  botDescription: string;
  createdAt: string;
  updatedAt: string;
}

export type TBotTemplateForm = {
  welcomeMessage: string;
  botDescription: string;
};

export type TBroadcastForm = {
  message: string;
};
