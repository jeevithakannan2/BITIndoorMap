import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LeafletMap = () => {
  useEffect(() => {
    const map = L.map("map", {
      attributionControl: false,
    }).setView([11.4956, 77.2777], 18);

    const tilesource_layer = L.tileLayer(
      "http://localhost:5173/map/{z}/{x}/{y}.png",
      {
        minZoom: 15,
        maxZoom: 19,
      },
    ).addTo(map);

    return () => {
      map.remove();
    };
  }, []);
  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}>
      {}
    </div>
  );
};

export default LeafletMap;
