import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LeafletMap = () => {
  useEffect(() => {
    // Define the bounding box coordinates
    const southWest = L.latLng(11.49128588728251, 77.27326626619613);
    const northEast = L.latLng(11.50151943736928, 77.2823433200042);
    const bounds = L.latLngBounds(southWest, northEast);

    const map = L.map("map", {
      attributionControl: false,
      zoomSnap: 1,
      zoomDelta: 1,
      wheelDebounceTime: 100,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0
    }).fitBounds(bounds);

    const tilesource_layer = L.tileLayer(
      "http://localhost:5173/map/{z}/{x}/{y}.png",
      {
        minZoom: 17,
        maxZoom: 19,
        bounds: bounds
      },
    ).addTo(map);

    // Custom zoom handler
    const customZoomHandler = (e) => {
      e.preventDefault();
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
      {}
    </div>
  );
};

export default LeafletMap;