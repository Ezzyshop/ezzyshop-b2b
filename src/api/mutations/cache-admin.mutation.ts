import { api } from "../axios";

export const deleteCacheKeyMutationFn = (key: string) =>
  api.delete("/admin/cache/key", { params: { key } }).then((res) => res.data);

export const deleteCacheByPatternMutationFn = (pattern: string) =>
  api
    .delete("/admin/cache/pattern", { data: { pattern } })
    .then((res) => res.data);
