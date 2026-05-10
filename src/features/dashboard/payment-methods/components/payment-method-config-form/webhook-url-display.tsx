import { Button } from "@/components/ui/button/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface IProps {
  label: string;
  url: string;
  description?: string;
}

export const WebhookUrlDisplay = ({ label, url, description }: IProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(t("common.copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("common.copy_failed"));
    }
  };

  return (
    <div className="space-y-1">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <code className="flex-1 truncate rounded border bg-muted px-3 py-2 text-xs">
          {url}
        </code>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="size-9 shrink-0"
          onClick={handleCopy}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
