import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const houses = [
  { id: 1, name: "Demo House A", pos: [-17.8292, 31.0522] },
  { id: 2, name: "Demo House B", pos: [-17.825, 31.05] },
  { id: 3, name: "Demo House C", pos: [-17.82, 31.055] },
];

export default function MapPage() {
  return (
    <div style={{ height: "90vh" }}>
      <MapContainer center={[-17.8292, 31.0522]} zoom={13} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {houses.map(h => (
          <Marker key={h.id} position={h.pos}>
            <Popup>{h.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
