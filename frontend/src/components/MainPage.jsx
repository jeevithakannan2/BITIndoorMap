import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LeafletMap = () => {
  useEffect(() => {
    const map = L.map("map", {
      attributionControl: false,
      zoomSnap: 1,
      zoomDelta: 1,
      wheelDebounceTime: 100,
    }).setView([11.4956, 77.2777], 16);

    const tilesource_layer = L.tileLayer(
      "http://localhost:5173/map/{z}/{x}/{y}.png",
      {
        minZoom: 17,
        maxZoom: 19,
      },
    ).addTo(map);

    // Custom zoom handler
    const customZoomHandler = (e) => {
      const currentZoom = map.getZoom();
      const newZoom = e.deltaY < 0 ? currentZoom + 1 : currentZoom - 1;
      map.setZoom(newZoom);
    };

    // Add custom zoom handler
    map.getContainer().addEventListener('wheel', customZoomHandler, { passive: false });

    return () => {
      map.getContainer().removeEventListener('wheel', customZoomHandler);
      map.remove();
    };
  }, []);
  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}>
      { }
    </div>
  );
};

export default LeafletMap;
