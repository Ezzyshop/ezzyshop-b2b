export interface IBotTemplate {
  _id: string;
  botId: string;
  welcomeMessage: string;
  botDescription: string;
  buttonText: string;
  createdAt: string;
  updatedAt: string;
}

export type TBotTemplateForm = {
  welcomeMessage: string;
  botDescription: string;
  buttonText: string;
};

export type TBroadcastForm = {
  message: string;
};
