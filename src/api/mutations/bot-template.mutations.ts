import { IBotTemplate, TBotTemplateForm } from '@/types/bot-template.types';
import { api } from '../axios';

export const createBotTemplateMutationFn = (
  data: TBotTemplateForm & { botId: string },
): Promise<IBotTemplate> => api.post('/bot-templates', data).then((res) => res.data?.data);

export const updateBotTemplateMutationFn = (
  botId: string,
  data: Partial<TBotTemplateForm>,
): Promise<IBotTemplate> => api.put(`/bot-templates/${botId}`, data).then((res) => res.data?.data);
