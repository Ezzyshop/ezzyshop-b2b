import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DownloadIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";

interface IProps {
  data: Record<string, unknown>[];
  filename?: string;
  chartRef?: React.RefObject<HTMLDivElement | null>;
}

export const MetricsExportButton = ({
  data,
  filename = "export",
  chartRef,
}: IProps) => {
  const { t } = useTranslation();

  const exportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const exportChartPNG = async () => {
    if (!chartRef?.current) return;
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(chartRef.current);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-chart.png`;
    a.click();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <DownloadIcon className="w-4 h-4 mr-2" />
          {t("common.download")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportXLSX}>
          {t("metrics.export.xlsx")}
        </DropdownMenuItem>
        {chartRef && (
          <DropdownMenuItem onClick={exportChartPNG}>
            {t("metrics.export.chart_png")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
