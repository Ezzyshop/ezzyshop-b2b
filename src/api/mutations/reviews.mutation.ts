import { api } from '../axios';

export const replyReviewMutationFn = (shopId: string, reviewId: string, reply: string) =>
  api.patch(`/reviews/shop/${shopId}/${reviewId}/reply`, { reply }).then((res) => res.data);

export const deleteReviewMutationFn = (shopId: string, reviewId: string) =>
  api.delete(`/reviews/shop/${shopId}/${reviewId}`).then((res) => res.data);
