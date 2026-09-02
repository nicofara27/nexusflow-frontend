import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

interface BusinessLocationProps {
  businessName: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function BusinessLocation({
  businessName,
  address,
  latitude,
  longitude,
}: BusinessLocationProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        Ubicación
      </h2>

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="relative h-[340px]">
          <MapContainer
            center={[latitude, longitude]}
            zoom={16}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <CircleMarker
              center={[latitude, longitude]}
              radius={9}
              pathOptions={{
                color: "#176b5b",
                fillColor: "#176b5b",
                fillOpacity: 1,
              }}
            >
              <Popup>{businessName}</Popup>
            </CircleMarker>
          </MapContainer>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-neutral-950">{businessName}</p>

            <p className="mt-1 text-sm text-neutral-500">{address}</p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-center text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-100"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </section>
  );
}
