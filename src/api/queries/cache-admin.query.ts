import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export interface ICacheStats {
  totalKeys: number;
  usedMemory: string;
}

export interface ICacheKey {
  key: string;
  ttl: number;
}

export interface ICacheKeysResult {
  keys: ICacheKey[];
  nextCursor: string;
  hasMore: boolean;
}

export interface ICacheKeyValue {
  value: unknown;
  ttl: number;
}

export const getCacheStatsQueryFn = async (): Promise<IResponse<ICacheStats>> =>
  api.get("/admin/cache/stats").then((res) => res.data);

export const getCacheKeysQueryFn = async (
  pattern: string = "*",
  cursor: string = "0",
  count: number = 50
): Promise<IResponse<ICacheKeysResult>> =>
  api
    .get("/admin/cache/keys", { params: { pattern, cursor, count } })
    .then((res) => res.data);

export const getCacheKeyValueQueryFn = async (
  key: string
): Promise<IResponse<ICacheKeyValue>> =>
  api.get("/admin/cache/key", { params: { key } }).then((res) => res.data);
