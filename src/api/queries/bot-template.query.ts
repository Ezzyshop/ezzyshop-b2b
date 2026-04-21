import { IBotTemplate, IBroadcastMessage } from '@/types/bot-template.types';
import { api } from '../axios';

export const getBotTemplateQueryFn = (botId: string): Promise<IBotTemplate | null> =>
  api.get(`/bot-templates/${botId}`).then((res) => res.data?.data ?? null);

export const getBroadcastHistoryQueryFn = (
  botId: string,
  page: number = 1,
  limit: number = 20,
): Promise<{ data: IBroadcastMessage[]; paginationInfo: { hasNextPage: boolean; currentPage: number; totalPages: number; totalItems: number } }> =>
  api
    .get(`/bot-templates/${botId}/broadcasts`, { params: { page, limit } })
    .then((res) => ({ data: res.data?.data ?? [], paginationInfo: res.data?.paginationInfo }));
