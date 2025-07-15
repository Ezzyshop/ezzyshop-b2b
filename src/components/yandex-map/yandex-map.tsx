import { useCallback, useState } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";

type Coordinates = [number, number];

interface IProps {
  className?: string;
  onLocationSelect: (data: {
    coordinates: Coordinates;
    address: string;
  }) => void;
  initialCoordinates?: Coordinates;
  height?: string;
  width?: string;
}

interface YandexMapEvent {
  get: (key: string) => Coordinates;
}

interface YandexMapInstance {
  geometry: {
    getCoordinates: () => Coordinates;
  };
}

interface YandexDragEvent {
  get: (key: string) => YandexMapInstance;
}

export const YandexMap = ({
  className,
  onLocationSelect,
  initialCoordinates = [41.2995, 69.2401],
  height = "200px",
  width = "100%",
}: IProps) => {
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<Coordinates | null>(initialCoordinates);

  const [mapInstance, setMapInstance] = useState<YMapsApi | null>(null);

  const getAddress = useCallback(
    async (coordinates: [number, number]) => {
      if (!mapInstance) return;
      setSelectedCoordinates(coordinates);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mapInstance.geocode(coordinates).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);

        const newAddress = [
          firstGeoObject.getLocalities().length
            ? firstGeoObject.getLocalities()
            : firstGeoObject.getAdministrativeAreas(),
          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          firstGeoObject.getPremiseNumber(),
        ]
          .filter(Boolean)
          .join(", ");

        if (onLocationSelect) {
          onLocationSelect({
            coordinates,
            address: newAddress,
          });
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapInstance]
  );

  const handleMapClick = (e: YandexMapEvent) => {
    const coordinates = e.get("coords") as [number, number];

    getAddress(coordinates);
  };

  const handleDragEnd = (e: YandexDragEvent) => {
    const coordinates = e.get("target").geometry.getCoordinates() as [
      number,
      number
    ];

    getAddress(coordinates);
  };

  return (
    <div className={className}>
      <Map
        defaultState={{
          center: initialCoordinates,
          zoom: 10,
        }}
        width={width}
        height={height}
        onClick={handleMapClick}
        onLoad={setMapInstance}
        options={{
          suppressMapOpenBlock: true,
        }}
        modules={["geolocation", "geocode"]}
      >
        {selectedCoordinates && (
          <Placemark
            geometry={selectedCoordinates}
            options={{
              draggable: true,
              iconColor: "var(--primary)",
            }}
            properties={{
              hintContent: "Drag to move",
            }}
            onDragEnd={handleDragEnd}
          />
        )}
      </Map>
    </div>
  );
};
