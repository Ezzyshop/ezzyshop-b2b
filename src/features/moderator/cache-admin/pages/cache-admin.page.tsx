import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCacheStatsQueryFn,
  getCacheKeysQueryFn,
  getCacheKeyValueQueryFn,
  ICacheKey,
} from "@/api/queries/cache-admin.query";
import {
  deleteCacheKeyMutationFn,
  deleteCacheByPatternMutationFn,
} from "@/api/mutations/cache-admin.mutation";
import { DataTable } from "@/components/data-table/data-table";
import { getCacheTableColumns } from "../components/cache-table/cache-table-columns";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpDownIcon,
  DatabaseIcon,
  HardDriveIcon,
  RefreshCwIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

export const CacheAdminPage = () => {
  const queryClient = useQueryClient();

  const [pattern, setPattern] = useState("*");
  const [patternInput, setPatternInput] = useState("*");
  const [cursor, setCursor] = useState("0");
  const [allKeys, setAllKeys] = useState<ICacheKey[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [viewKey, setViewKey] = useState<string | null>(null);
  const [deleteKey, setDeleteKey] = useState<string | null>(null);
  const [patternDeleteInput, setPatternDeleteInput] = useState("");
  const [showPatternDelete, setShowPatternDelete] = useState(false);

  const [filterText, setFilterText] = useState("");
  const [sortTtl, setSortTtl] = useState<"asc" | "desc" | null>(null);

  const displayKeys = useMemo(() => {
    let result = allKeys;

    if (filterText.trim()) {
      const lower = filterText.trim().toLowerCase();
      result = result.filter((k) => k.key.toLowerCase().includes(lower));
    }

    if (sortTtl) {
      result = [...result].sort((a, b) => {
        const aTtl = a.ttl === -1 ? Number.POSITIVE_INFINITY : a.ttl;
        const bTtl = b.ttl === -1 ? Number.POSITIVE_INFINITY : b.ttl;
        return sortTtl === "asc" ? aTtl - bTtl : bTtl - aTtl;
      });
    }

    return result;
  }, [allKeys, filterText, sortTtl]);

  const cycleSortTtl = () => {
    setSortTtl((prev) => (prev === null ? "asc" : prev === "asc" ? "desc" : null));
  };

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["cache-stats"],
    queryFn: getCacheStatsQueryFn,
  });

  const { data: keysData, isLoading: keysLoading, refetch: refetchKeys } = useQuery({
    queryKey: ["cache-keys", pattern, cursor],
    queryFn: () => getCacheKeysQueryFn(pattern, cursor),
    enabled: false,
  });

  const { data: keyValueData, isLoading: valueLoading } = useQuery({
    queryKey: ["cache-key-value", viewKey],
    queryFn: () => getCacheKeyValueQueryFn(viewKey!),
    enabled: !!viewKey,
  });

  const { mutate: deleteKey_, isPending: deleteLoading } = useMutation({
    mutationFn: (key: string) => deleteCacheKeyMutationFn(key),
    onSuccess: () => {
      toast.success("Kalit o'chirildi");
      setDeleteKey(null);
      setAllKeys((prev) => prev.filter((k) => k.key !== deleteKey));
      queryClient.invalidateQueries({ queryKey: ["cache-stats"] });
    },
    onError: () => toast.error("Xatolik yuz berdi"),
  });

  const { mutate: deletePattern, isPending: patternDeleteLoading } = useMutation({
    mutationFn: (p: string) => deleteCacheByPatternMutationFn(p),
    onSuccess: (res) => {
      toast.success(`${res.data?.deleted ?? 0} ta kalit o'chirildi`);
      setShowPatternDelete(false);
      setPatternDeleteInput("");
      handleSearch();
      queryClient.invalidateQueries({ queryKey: ["cache-stats"] });
    },
    onError: () => toast.error("Xatolik yuz berdi"),
  });

  const handleSearch = async () => {
    setAllKeys([]);
    setCursor("0");
    setPattern(patternInput);
    setIsFirstLoad(true);
  };

  const loadKeys = async () => {
    const result = await refetchKeys();
    if (result.data?.data) {
      const { keys, nextCursor } = result.data.data;
      if (isFirstLoad) {
        setAllKeys(keys);
        setIsFirstLoad(false);
      } else {
        setAllKeys((prev) => [...prev, ...keys]);
      }
      setCursor(nextCursor);
    }
  };

  const handleLoadMore = () => {
    setIsFirstLoad(false);
    loadKeys();
  };

  const stats = statsData?.data;

  const columns = getCacheTableColumns({
    onView: (key) => setViewKey(key),
    onDelete: (key) => setDeleteKey(key),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cache boshqaruvi</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["cache-stats"] });
              handleSearch();
            }}
          >
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Yangilash
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowPatternDelete(true)}
          >
            <Trash2Icon className="w-4 h-4 mr-2" />
            Pattern bo'yicha o'chirish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DatabaseIcon className="w-4 h-4" />
              Jami kalitlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {statsLoading ? "..." : stats?.totalKeys ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <HardDriveIcon className="w-4 h-4" />
              Xotira
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {statsLoading ? "..." : stats?.usedMemory ?? "0B"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Pattern (masalan: products:* yoki user:123)"
          value={patternInput}
          onChange={(e) => setPatternInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="font-mono"
        />
        <Button onClick={handleSearch}>Pattern qidirish</Button>
        <Button variant="outline" onClick={loadKeys} disabled={keysLoading}>
          {keysLoading ? "Yuklanmoqda..." : "Yuklash"}
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Yuklangan kalitlar ichidan filterlash..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="pl-9 font-mono"
          />
        </div>
        <Button variant="outline" onClick={cycleSortTtl}>
          {sortTtl === "asc" ? (
            <ArrowUpIcon className="w-4 h-4 mr-2" />
          ) : sortTtl === "desc" ? (
            <ArrowDownIcon className="w-4 h-4 mr-2" />
          ) : (
            <ArrowUpDownIcon className="w-4 h-4 mr-2" />
          )}
          TTL bo'yicha
          {sortTtl === "asc" && " (kichikdan)"}
          {sortTtl === "desc" && " (kattadan)"}
        </Button>
      </div>

      <DataTable columns={columns} data={displayKeys} isLoading={keysLoading && isFirstLoad} />

      {keysData?.data?.hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleLoadMore} disabled={keysLoading}>
            Ko'proq yuklash
          </Button>
        </div>
      )}

      {allKeys.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          {filterText.trim()
            ? `${displayKeys.length} / ${allKeys.length} ta kalit ko'rsatilmoqda`
            : `${allKeys.length} ta kalit ko'rsatilmoqda`}
        </p>
      )}

      {/* View value dialog */}
      <Dialog open={!!viewKey} onOpenChange={(open) => !open && setViewKey(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kalit qiymati</DialogTitle>
            <DialogDescription className="font-mono text-xs break-all">
              {viewKey}
            </DialogDescription>
          </DialogHeader>
          {valueLoading ? (
            <p className="text-center py-4">Yuklanmoqda...</p>
          ) : keyValueData?.data ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                TTL:{" "}
                {keyValueData.data.ttl === -1
                  ? "∞ muddatsiz"
                  : `${keyValueData.data.ttl} soniya`}
              </p>
              <ScrollArea className="h-64 rounded border p-3 bg-muted">
                <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                  {JSON.stringify(keyValueData.data.value, null, 2)}
                </pre>
              </ScrollArea>
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">Ma'lumot topilmadi</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete key confirmation */}
      <Dialog open={!!deleteKey} onOpenChange={(open) => !open && setDeleteKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kalitni o'chirish</DialogTitle>
            <DialogDescription className="font-mono text-xs break-all">
              {deleteKey}
            </DialogDescription>
          </DialogHeader>
          <p>Bu kalitni o'chirishni tasdiqlaysizmi?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteKey(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              disabled={deleteLoading}
              onClick={() => deleteKey && deleteKey_(deleteKey)}
            >
              {deleteLoading ? "O'chirilmoqda..." : "O'chirish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pattern delete dialog */}
      <Dialog open={showPatternDelete} onOpenChange={setShowPatternDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pattern bo'yicha o'chirish</DialogTitle>
            <DialogDescription>
              Berilgan pattern mos keladigan barcha kalitlar o'chiriladi.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Masalan: products:shopId:* yoki analytics:*"
            value={patternDeleteInput}
            onChange={(e) => setPatternDeleteInput(e.target.value)}
            className="font-mono"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPatternDelete(false)}>
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              disabled={patternDeleteLoading || !patternDeleteInput.trim()}
              onClick={() => deletePattern(patternDeleteInput)}
            >
              {patternDeleteLoading ? "O'chirilmoqda..." : "O'chirish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CacheAdminPage;
