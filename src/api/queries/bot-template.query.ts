import { IBotTemplate } from '@/types/bot-template.types';
import { api } from '../axios';

export const getBotTemplateQueryFn = (botId: string): Promise<IBotTemplate | null> =>
  api.get(`/bot-templates/${botId}`).then((res) => res.data?.data || null);
