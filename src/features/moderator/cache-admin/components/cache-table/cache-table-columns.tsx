import { ColumnDef } from "@tanstack/react-table";
import { ICacheKey } from "@/api/queries/cache-admin.query";
import { Button } from "@/components/ui/button/button";
import { EyeIcon, Trash2Icon } from "lucide-react";

interface IColumnActions {
  onView: (key: string) => void;
  onDelete: (key: string) => void;
}

export const getCacheTableColumns = ({
  onView,
  onDelete,
}: IColumnActions): ColumnDef<ICacheKey>[] => [
  {
    header: "Kalit",
    accessorKey: "key",
    cell: ({ row }) => (
      <span className="font-mono text-sm break-all">{row.original.key}</span>
    ),
  },
  {
    header: "TTL (soniya)",
    accessorKey: "ttl",
    cell: ({ row }) => {
      const ttl = row.original.ttl;
      if (ttl === -1) return <span className="text-muted-foreground">∞ muddatsiz</span>;
      if (ttl === -2) return <span className="text-destructive">Muddati o'tgan</span>;

      const hours = Math.floor(ttl / 3600);
      const minutes = Math.floor((ttl % 3600) / 60);
      const seconds = ttl % 60;

      const parts = [];
      if (hours > 0) parts.push(`${hours}s`);
      if (minutes > 0) parts.push(`${minutes}d`);
      parts.push(`${seconds}s`);

      return <span className="font-mono text-sm">{parts.join(" ")}</span>;
    },
  },
  {
    header: "Amallar",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onView(row.original.key)}
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(row.original.key)}
        >
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
