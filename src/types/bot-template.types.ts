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
  imageUrl?: string;
};

export interface IBroadcastMessage {
  _id: string;
  botId: string;
  message: string;
  imageUrl?: string;
  sentBy: {
    _id: string;
    full_name: string;
    photo: string | null;
  };
  sent: number;
  total: number;
  createdAt: string;
}
