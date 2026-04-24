import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Map, Polygon, Placemark } from "@pbe/react-yandex-maps";
import { useTranslation } from "react-i18next";
import {
  createDeliveryZoneMutationFn,
  updateDeliveryZoneMutationFn,
} from "@/api/mutations";
import { IDeliveryZone } from "../utils/delivery-zone.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckIcon, UndoIcon, Eraser } from "lucide-react";
import { toast } from "sonner";

type Coords = [number, number];
const DEFAULT_CENTER: Coords = [41.2995, 69.2401];

interface YandexMapEvent {
  get: (key: string) => Coords;
}

interface ZoneFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialZone?: IDeliveryZone | null;
  shopId: string;
  onSuccess: () => void;
}

export const ZoneFormDialog = ({
  open,
  onOpenChange,
  initialZone,
  shopId,
  onSuccess,
}: ZoneFormDialogProps) => {
  const { t } = useTranslation();

  const [drawingPoints, setDrawingPoints] = useState<Coords[]>(() => {
    if (!initialZone) return [];
    return initialZone.polygon.coordinates[0]
      .slice(0, -1)
      .map(([lng, lat]) => [lat, lng] as Coords);
  });
  const [zoneName, setZoneName] = useState(initialZone?.name ?? "");
  const dblClickGuard = useRef(0);

  const isEdit = !!initialZone;

  const createMutation = useMutation({
    mutationFn: (payload: { name: string; coordinates: number[][] }) =>
      createDeliveryZoneMutationFn(shopId, payload),
    onSuccess: () => {
      toast.success(t("delivery_zone.created"));
      onSuccess();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: { name: string; coordinates: number[][] }) =>
      updateDeliveryZoneMutationFn(shopId, initialZone!._id, {
        name: payload.name,
        coordinates: payload.coordinates,
      }),
    onSuccess: () => {
      toast.success(t("delivery_zone.updated"));
      onSuccess();
    },
  });

  const handleMapClick = (e: YandexMapEvent) => {
    if (dblClickGuard.current > 0) {
      dblClickGuard.current--;
      return;
    }
    const coords = e.get("coords");
    setDrawingPoints((prev) => [...prev, coords]);
  };

  const removePoint = (index: number) => {
    dblClickGuard.current = 2;
    setDrawingPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!zoneName.trim()) {
      toast.error(t("delivery_zone.name_required"));
      return;
    }
    if (drawingPoints.length < 3) {
      toast.error(t("delivery_zone.min_points_error"));
      return;
    }
    const coordinates = drawingPoints.map(([lat, lng]) => [lng, lat]);
    if (isEdit) {
      updateMutation.mutate({ name: zoneName, coordinates });
    } else {
      createMutation.mutate({ name: zoneName, coordinates });
    }
  };

  const polygonCoords =
    drawingPoints.length >= 2
      ? [...drawingPoints, drawingPoints[0]]
      : drawingPoints;

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle>
            {isEdit
              ? t("delivery_zone.edit_zone")
              : t("delivery_zone.add_zone")}
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Map
            defaultState={{ center: DEFAULT_CENTER, zoom: 12 }}
            width="100%"
            height="580px"
            onClick={handleMapClick}
            options={{ suppressMapOpenBlock: true }}
          >
            {drawingPoints.length >= 3 && (
              <Polygon
                geometry={[polygonCoords]}
                options={{
                  fillColor: "#3b82f640",
                  strokeColor: "#3b82f6",
                  strokeWidth: 2,
                  fillOpacity: 1,
                }}
              />
            )}
            {drawingPoints.map((point, index) => (
              <Placemark
                key={index}
                geometry={point}
                options={{
                  preset:
                    index === 0
                      ? "islands#greenDotIcon"
                      : "islands#blueDotIcon",
                  hasBalloon: false,
                  hasHint: false,
                }}
                onDblClick={() => removePoint(index)}
              />
            ))}
          </Map>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs rounded-full px-3 py-1 pointer-events-none whitespace-nowrap">
            {t("delivery_zone.click_to_add_points")}
            {drawingPoints.length > 0 &&
              ` · ${drawingPoints.length} ${t("delivery_zone.points")}`}
            {drawingPoints.length > 0 &&
              ` · ${t("delivery_zone.dblclick_to_remove")}`}
          </div>

          <div className="absolute top-3 right-3 flex gap-1">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 shadow"
              disabled={drawingPoints.length === 0}
              onClick={() => setDrawingPoints((p) => p.slice(0, -1))}
              title={t("delivery_zone.undo")}
            >
              <UndoIcon className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 shadow"
              disabled={drawingPoints.length === 0}
              onClick={() => setDrawingPoints([])}
              title={t("delivery_zone.clear")}
            >
              <Eraser className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div className="px-5 py-4 space-y-4 border-t">
          <div className="space-y-1.5">
            <Label htmlFor="zone-name">{t("delivery_zone.zone_name")}</Label>
            <Input
              id="zone-name"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              placeholder={t("delivery_zone.zone_name_placeholder")}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t("delivery_zone.cancel")}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending || drawingPoints.length < 3}
            >
              <CheckIcon className="w-4 h-4 mr-1.5" />
              {isEdit ? t("delivery_zone.update") : t("delivery_zone.save")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
