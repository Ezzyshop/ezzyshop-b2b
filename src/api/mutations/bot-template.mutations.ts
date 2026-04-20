import { TBotTemplateForm } from '@/types/bot-template.types';
import { api } from '../axios';

export const upsertBotTemplateMutationFn = (botId: string, data: TBotTemplateForm) =>
  api.put(`/bot-templates/${botId}`, data).then((res) => res.data?.data);
