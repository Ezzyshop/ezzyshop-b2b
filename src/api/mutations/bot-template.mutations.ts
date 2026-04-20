import { TBotTemplateForm, TBroadcastForm } from '@/types/bot-template.types';
import { api } from '../axios';

export const upsertBotTemplateMutationFn = (botId: string, data: TBotTemplateForm) =>
  api.put(`/bot-templates/${botId}`, data).then((res) => res.data?.data);

export const broadcastMutationFn = (botId: string, data: TBroadcastForm) =>
  api.post(`/bot-templates/${botId}/broadcast`, data).then((res) => res.data?.data);
