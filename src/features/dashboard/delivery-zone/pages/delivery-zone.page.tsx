import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Map, Polygon, Placemark } from "@pbe/react-yandex-maps";
import { useShopContext } from "@/contexts";
import { useTranslation } from "react-i18next";
import { getDeliveryZonesQueryFn } from "@/api/queries";
import {
  createDeliveryZoneMutationFn,
  deleteDeliveryZoneMutationFn,
  updateDeliveryZoneMutationFn,
} from "@/api/mutations";
import { IDeliveryZone } from "../utils/delivery-zone.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trash2Icon,
  PencilIcon,
  MapPinIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Coords = [number, number];
const DEFAULT_CENTER: Coords = [41.2995, 69.2401];

interface YandexMapEvent {
  get: (key: string) => Coords;
}

export const DeliveryZonePage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPoints, setDrawingPoints] = useState<Coords[]>([]);
  const [zoneName, setZoneName] = useState("");
  const [editingZone, setEditingZone] = useState<IDeliveryZone | null>(null);
  const [highlightedZone, setHighlightedZone] = useState<string | null>(null);
  // guard against map click firing after placemark double-click
  const dblClickGuard = useRef(0);

  const { data, isLoading } = useQuery({
    queryKey: ["delivery-zones", shop._id],
    queryFn: () => getDeliveryZonesQueryFn(shop._id),
  });

  const zones = data?.data ?? [];

  const createMutation = useMutation({
    mutationFn: (payload: { name: string; coordinates: number[][] }) =>
      createDeliveryZoneMutationFn(shop._id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-zones", shop._id] });
      resetDrawing();
      toast.success(t("delivery_zone.created"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: {
      id: string;
      name: string;
      coordinates: number[][];
    }) =>
      updateDeliveryZoneMutationFn(shop._id, payload.id, {
        name: payload.name,
        coordinates: payload.coordinates,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-zones", shop._id] });
      resetDrawing();
      toast.success(t("delivery_zone.updated"));
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (zone: IDeliveryZone) =>
      updateDeliveryZoneMutationFn(shop._id, zone._id, {
        status: zone.status === "Active" ? "Inactive" : "Active",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-zones", shop._id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDeliveryZoneMutationFn(shop._id, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-zones", shop._id] });
      toast.success(t("delivery_zone.deleted"));
    },
  });

  const resetDrawing = () => {
    setIsDrawing(false);
    setDrawingPoints([]);
    setZoneName("");
    setEditingZone(null);
  };

  const startDrawing = (zone?: IDeliveryZone) => {
    if (zone) {
      setEditingZone(zone);
      setZoneName(zone.name);
      // GeoJSON ring is [lng, lat]; convert to Yandex [lat, lng]
      const points = zone.polygon.coordinates[0]
        .slice(0, -1)
        .map(([lng, lat]) => [lat, lng] as Coords);
      setDrawingPoints(points);
    } else {
      setEditingZone(null);
      setZoneName("");
      setDrawingPoints([]);
    }
    setIsDrawing(true);
  };

  const handleMapClick = (e: YandexMapEvent) => {
    if (!isDrawing) return;
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

  const undoLastPoint = () => {
    setDrawingPoints((prev) => prev.slice(0, -1));
  };

  const saveZone = () => {
    if (drawingPoints.length < 3) {
      toast.error(t("delivery_zone.min_points_error"));
      return;
    }
    if (!zoneName.trim()) {
      toast.error(t("delivery_zone.name_required"));
      return;
    }

    const coordinates = drawingPoints.map(([lat, lng]) => [lng, lat]);

    if (editingZone) {
      updateMutation.mutate({
        id: editingZone._id,
        name: zoneName,
        coordinates,
      });
    } else {
      createMutation.mutate({ name: zoneName, coordinates });
    }
  };

  const polygonCoords =
    drawingPoints.length >= 2
      ? [...drawingPoints, drawingPoints[0]]
      : drawingPoints;

  const getZoneDisplayCoords = (zone: IDeliveryZone): Coords[][] => {
    return zone.polygon.coordinates.map((ring) =>
      ring.map(([lng, lat]) => [lat, lng] as Coords),
    );
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4 md:space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("delivery_zone.title")}</h1>
        {!isDrawing && (
          <Button onClick={() => startDrawing()}>
            <MapPinIcon className="w-4 h-4 mr-2" />
            {t("delivery_zone.add_zone")}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[500px]">
            <CardContent className="p-0 h-full relative">
              {isDrawing && (
                <div className="absolute top-3 left-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="zone-name">
                      {t("delivery_zone.zone_name")}
                    </Label>
                    <Input
                      id="zone-name"
                      value={zoneName}
                      onChange={(e) => setZoneName(e.target.value)}
                      placeholder={t("delivery_zone.zone_name_placeholder")}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("delivery_zone.click_to_add_points")} ({drawingPoints.length} {t("delivery_zone.points")})
                    {drawingPoints.length > 0 && (
                      <span className="block text-xs mt-0.5">{t("delivery_zone.dblclick_to_remove")}</span>
                    )}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      onClick={saveZone}
                      disabled={isPending || drawingPoints.length < 3}
                    >
                      <CheckIcon className="w-3 h-3 mr-1" />
                      {editingZone
                        ? t("delivery_zone.update")
                        : t("delivery_zone.save")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={undoLastPoint}
                      disabled={drawingPoints.length === 0}
                    >
                      {t("delivery_zone.undo")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDrawingPoints([])}
                    >
                      {t("delivery_zone.clear")}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={resetDrawing}>
                      <XIcon className="w-3 h-3 mr-1" />
                      {t("delivery_zone.cancel")}
                    </Button>
                  </div>
                </div>
              )}

              <Map
                defaultState={{ center: DEFAULT_CENTER, zoom: 12 }}
                width="100%"
                height="100%"
                style={{ minHeight: 500 }}
                onClick={handleMapClick}
                options={{ suppressMapOpenBlock: true }}
              >
                {zones
                  .filter((z) => z.status !== "Deleted")
                  .map((zone) => (
                    <Polygon
                      key={zone._id}
                      geometry={getZoneDisplayCoords(zone)}
                      options={{
                        fillColor:
                          zone.status === "Active"
                            ? highlightedZone === zone._id
                              ? "#3b82f680"
                              : "#3b82f640"
                            : "#94a3b840",
                        strokeColor:
                          zone.status === "Active" ? "#3b82f6" : "#94a3b8",
                        strokeWidth: highlightedZone === zone._id ? 3 : 2,
                        fillOpacity: 1,
                      }}
                    />
                  ))}

                {isDrawing && drawingPoints.length >= 3 && (
                  <Polygon
                    geometry={[polygonCoords]}
                    options={{
                      fillColor: "#22c55e40",
                      strokeColor: "#22c55e",
                      strokeWidth: 2,
                      strokeStyle: "dash",
                      fillOpacity: 1,
                    }}
                  />
                )}

                {isDrawing &&
                  drawingPoints.map((point, index) => (
                    <Placemark
                      key={index}
                      geometry={point}
                      options={{
                        preset:
                          index === 0
                            ? "islands#greenDotIcon"
                            : "islands#blueDotIcon",
                        iconColor: index === 0 ? "#22c55e" : "#3b82f6",
                      }}
                      onDblClick={() => removePoint(index)}
                    />
                  ))}
              </Map>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? t("delivery_zone.loading")
              : `${zones.filter((z) => z.status !== "Deleted").length} ${t("delivery_zone.zones_count")}`}
          </p>

          {zones
            .filter((z) => z.status !== "Deleted")
            .map((zone) => (
              <Card
                key={zone._id}
                className={cn(
                  "cursor-pointer transition-colors",
                  highlightedZone === zone._id && "ring-2 ring-blue-500",
                )}
                onMouseEnter={() => setHighlightedZone(zone._id)}
                onMouseLeave={() => setHighlightedZone(null)}
              >
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base truncate">
                      {zone.name}
                    </CardTitle>
                    <Badge
                      variant={
                        zone.status === "Active" ? "default" : "secondary"
                      }
                      className="cursor-pointer shrink-0"
                      onClick={() => toggleStatusMutation.mutate(zone)}
                    >
                      {zone.status === "Active"
                        ? t("delivery_zone.active")
                        : t("delivery_zone.inactive")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => startDrawing(zone)}
                  >
                    <PencilIcon className="w-3 h-3 mr-1" />
                    {t("delivery_zone.edit")}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(zone._id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2Icon className="w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}

          {!isLoading &&
            zones.filter((z) => z.status !== "Deleted").length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground text-sm">
                  {t("delivery_zone.no_zones")}
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryZonePage;
