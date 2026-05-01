import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, Save } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const STORAGE_KEY = "ai_prompt_suffix";

export default function AiSettingsPage() {
  const { t } = useTranslation();
  const [promptSuffix, setPromptSuffix] = useState("");

  useEffect(() => {
    setPromptSuffix(localStorage.getItem(STORAGE_KEY) ?? "");
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, promptSuffix);
    toast.success(t("dashboard.ai_settings.saved"));
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.ai_settings.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("dashboard.ai_settings.description")}
        </p>
      </div>

      <div className="flex flex-col gap-4 p-6 rounded-xl border bg-card">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <h2 className="font-semibold">{t("dashboard.ai_settings.prompt_suffix_title")}</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("dashboard.ai_settings.prompt_suffix_description")}
        </p>
        <Textarea
          value={promptSuffix}
          onChange={(e) => setPromptSuffix(e.target.value)}
          placeholder={t("dashboard.ai_settings.prompt_suffix_placeholder")}
          rows={4}
          className="resize-none"
        />
        <div className="flex justify-end">
          <Button type="button" className="gap-2" onClick={handleSave}>
            <Save className="w-4 h-4" />
            {t("common.save")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-6 rounded-xl border bg-muted/40">
        <h2 className="font-semibold">{t("dashboard.ai_settings.tips_title")}</h2>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          {(t("dashboard.ai_settings.tips", { returnObjects: true }) as string[]).map(
            (tip, i) => (
              <li key={i}>{tip}</li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
