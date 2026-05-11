import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import dayjs from "dayjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShopPipelineHistoryView } from "./shop-pipeline-history";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, PencilIcon, Trash2Icon, XIcon } from "lucide-react";
import { getShopCommentsQueryFn } from "@/api/queries/shops.query";
import {
  createShopCommentMutationFn,
  deleteShopCommentMutationFn,
  updateShopCommentMutationFn,
} from "@/api/mutations/shops.mutation";
import { IShop } from "../../utils";
import { useUserContext } from "@/contexts/user-context/user.context";

interface IProps {
  shop: IShop | null;
  onClose: () => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const ShopCommentsSheet = ({ shop, onClose }: IProps) => {
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const shopId = shop?._id ?? null;

  useEffect(() => {
    if (!shopId) {
      setDraft("");
      setEditingId(null);
      setEditingText("");
    }
  }, [shopId]);

  const { data, isLoading } = useQuery({
    queryKey: ["shop-comments", shopId],
    queryFn: () => getShopCommentsQueryFn(shopId!),
    enabled: !!shopId,
  });

  const comments = data?.data ?? [];

  const refresh = () => {
    if (!shopId) return;
    queryClient.invalidateQueries({ queryKey: ["shop-comments", shopId] });
  };

  const { mutate: addComment, isPending: isAdding } = useMutation({
    mutationFn: (text: string) => createShopCommentMutationFn(shopId!, text),
    onSuccess: () => {
      setDraft("");
      refresh();
    },
    onError: () => toast.error("Izoh qo'shishda xatolik"),
  });

  const { mutate: editComment, isPending: isEditing } = useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) =>
      updateShopCommentMutationFn(id, text),
    onSuccess: () => {
      setEditingId(null);
      setEditingText("");
      refresh();
    },
    onError: () => toast.error("Izohni yangilashda xatolik"),
  });

  const { mutate: removeComment } = useMutation({
    mutationFn: (id: string) => deleteShopCommentMutationFn(id),
    onSuccess: () => refresh(),
    onError: () => toast.error("Izohni o'chirishda xatolik"),
  });

  const handleSubmit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    addComment(trimmed);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    const trimmed = editingText.trim();
    if (!trimmed) return;
    editComment({ id: editingId, text: trimmed });
  };

  return (
    <Sheet open={!!shop} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>{shop?.name ?? ""}</SheetTitle>
          <SheetDescription>Mijozning izohlari va bosqich tarixi</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="comments" className="flex-1 flex flex-col min-h-0">
          <TabsList className="mx-4 mt-2 w-auto self-start">
            <TabsTrigger value="comments">Izohlar</TabsTrigger>
            <TabsTrigger value="history">Tarix</TabsTrigger>
          </TabsList>

          <TabsContent
            value="comments"
            className="flex-1 flex flex-col min-h-0 mt-2"
          >
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-10">
              Hozircha izohlar yo'q
            </div>
          ) : (
            comments.map((comment) => {
              const isOwn = comment.author._id === user._id;
              const isEditingThis = editingId === comment._id;

              return (
                <div
                  key={comment._id}
                  className="rounded-md border bg-card p-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      {comment.author.photo ? (
                        <AvatarImage src={comment.author.photo} />
                      ) : null}
                      <AvatarFallback className="text-[10px]">
                        {getInitials(comment.author.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium leading-tight truncate">
                        {comment.author.full_name}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {dayjs(comment.createdAt).format("DD.MM.YYYY HH:mm")}
                      </div>
                    </div>
                    {isOwn && !isEditingThis && (
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            setEditingId(comment._id);
                            setEditingText(comment.text);
                          }}
                        >
                          <PencilIcon className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeComment(comment._id)}
                        >
                          <Trash2Icon className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {isEditingThis ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingId(null);
                            setEditingText("");
                          }}
                        >
                          <XIcon className="w-3.5 h-3.5 mr-1" /> Bekor qilish
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={isEditing || !editingText.trim()}
                        >
                          <CheckIcon className="w-3.5 h-3.5 mr-1" /> Saqlash
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {comment.text}
                    </p>
                  )}
                </div>
              );
            })
          )}
            </div>

            <div className="border-t p-4 space-y-2 bg-background">
              <Textarea
                placeholder="Izoh yozish..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isAdding || !draft.trim()}
                >
                  Yuborish
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="history"
            className="flex-1 overflow-y-auto px-4 py-3 mt-2"
          >
            {shopId ? <ShopPipelineHistoryView shopId={shopId} /> : null}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
