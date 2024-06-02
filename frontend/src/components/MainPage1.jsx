import React from "react";
import { MapContainer } from "react-leaflet";
import { MbtilesLayer } from "react-leaflet-mbtiles";
import "leaflet/dist/leaflet.css";

function MapComponent() {
  const bounds = [
    [11.490242524, 77.270093448], // Southwest corner coordinates
    [11.50099234, 77.285327474], // Northeast corner coordinates
  ];

  return (
    <MapContainer
      center={[11.496488, 77.278001]}
      zoom={16}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      style={{ height: "100vh", width: "100%" }}
    >
      <MbtilesLayer
        mbtilesUrl="https://localhost:5173/file.mbtiles"
        zIndex={1} // Set the z-index of the layer
      />
    </MapContainer>
  );
}

export default MapComponent;
