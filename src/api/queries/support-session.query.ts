import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";
import {
  ISupportMessage,
  ISupportSession,
  ISupportUserListItem,
} from "@/features/dashboard/chat/utils/support-session.interface";

export const listShopSupportUsersQueryFn = async (
  shopId: string
): Promise<IResponse<ISupportUserListItem[]>> =>
  api.get(`/support-sessions/admin/${shopId}/users`).then((res) => res.data);

export const listShopUserSessionsQueryFn = async (
  shopId: string,
  userId: string
): Promise<IResponse<ISupportSession[]>> =>
  api
    .get(`/support-sessions/admin/${shopId}/users/${userId}/sessions`)
    .then((res) => res.data);

export const listShopSessionMessagesQueryFn = async (
  shopId: string,
  sessionId: string
): Promise<
  IResponse<{ session: ISupportSession; messages: ISupportMessage[] }>
> =>
  api
    .get(`/support-sessions/admin/${shopId}/${sessionId}/messages`)
    .then((res) => res.data);

export const sendShopSupportMessageMutationFn = async (
  shopId: string,
  sessionId: string,
  body: { text?: string; attachments?: { url: string; type: "image" }[] }
): Promise<IResponse<{ session: ISupportSession; message: ISupportMessage }>> =>
  api
    .post(`/support-sessions/admin/${shopId}/${sessionId}/messages`, body)
    .then((res) => res.data);

export const resolveSupportSessionMutationFn = async (
  shopId: string,
  sessionId: string
): Promise<IResponse<ISupportSession>> =>
  api
    .patch(`/support-sessions/admin/${shopId}/${sessionId}/resolve`)
    .then((res) => res.data);
