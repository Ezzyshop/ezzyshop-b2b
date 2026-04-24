import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Map, Polygon } from "@pbe/react-yandex-maps";
import { useShopContext } from "@/contexts";
import { useTranslation } from "react-i18next";
import { getDeliveryZonesQueryFn } from "@/api/queries";
import {
  deleteDeliveryZoneMutationFn,
  updateDeliveryZoneMutationFn,
} from "@/api/mutations";
import { IDeliveryZone } from "../utils/delivery-zone.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2Icon, MapPinIcon } from "lucide-react";
import { toast } from "sonner";
import { ZoneFormDialog } from "../components/zone-form-dialog";

type Coords = [number, number];
const DEFAULT_CENTER: Coords = [41.2995, 69.2401];

export const DeliveryZonePage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<IDeliveryZone | null>(null);

  const { data } = useQuery({
    queryKey: ["delivery-zones", shop._id],
    queryFn: () => getDeliveryZonesQueryFn(shop._id),
  });

  const zones = (data?.data ?? []).filter((z) => z.status !== "Deleted");

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

  const openCreate = () => {
    setEditingZone(null);
    setDialogOpen(true);
  };

  const openEdit = (zone: IDeliveryZone) => {
    setEditingZone(zone);
    setDialogOpen(true);
  };

  const handleDialogSuccess = () => {
    setDialogOpen(false);
    setEditingZone(null);
    queryClient.invalidateQueries({ queryKey: ["delivery-zones", shop._id] });
  };

  const getZoneDisplayCoords = (zone: IDeliveryZone): Coords[][] =>
    zone.polygon.coordinates.map((ring) =>
      ring.map(([lng, lat]) => [lat, lng] as Coords),
    );

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("delivery_zone.title")}</h1>
        <Button onClick={openCreate}>
          <MapPinIcon className="w-4 h-4 mr-2" />
          {t("delivery_zone.add_zone")}
        </Button>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden  min-h-[800px] relative">
        <Map
          defaultState={{ center: DEFAULT_CENTER, zoom: 12 }}
          width="100%"
          height="100%"
          style={{ minHeight: 760 }}
          options={{ suppressMapOpenBlock: true }}
        >
          {zones.map((zone) => (
            <Polygon
              key={zone._id}
              geometry={getZoneDisplayCoords(zone)}
              options={{
                fillColor: zone.status === "Active" ? "#3b82f640" : "#94a3b830",
                strokeColor: zone.status === "Active" ? "#3b82f6" : "#94a3b8",
                strokeWidth: 2,
                fillOpacity: 1,
                cursor: "pointer",
              }}
              onClick={() => openEdit(zone)}
            />
          ))}
        </Map>

        {zones.length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-col gap-2 max-h-64 overflow-y-auto">
            {zones.map((zone) => (
              <div
                key={zone._id}
                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border text-sm cursor-pointer hover:bg-white transition-colors"
                onClick={() => openEdit(zone)}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      zone.status === "Active" ? "#3b82f6" : "#94a3b8",
                  }}
                />
                <span className="font-medium truncate max-w-[160px]">
                  {zone.name}
                </span>
                <Badge
                  variant={zone.status === "Active" ? "default" : "secondary"}
                  className="text-xs cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatusMutation.mutate(zone);
                  }}
                >
                  {zone.status === "Active"
                    ? t("delivery_zone.active")
                    : t("delivery_zone.inactive")}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-destructive hover:text-destructive shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMutation.mutate(zone._id);
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2Icon className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {dialogOpen && (
        <ZoneFormDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditingZone(null);
          }}
          initialZone={editingZone}
          shopId={shop._id}
          onSuccess={handleDialogSuccess}
        />
      )}
    </div>
  );
};

export default DeliveryZonePage;
