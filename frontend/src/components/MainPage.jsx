import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LeafletMap = () => {
  const [map, setMap] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    Labs: true,
    Canteen: true,
    Classrooms: true,
    "Ground Floor": true,
    "First Floor": true,
    "Second Floor": true,
  });
  const [layerGroups, setLayerGroups] = useState({});

  useEffect(() => {
    // Define the bounding box coordinates
    const southWest = L.latLng(11.49128588728251, 77.27326626619613);
    const northEast = L.latLng(11.50151943736928, 77.2823433200042);
    const bounds = L.latLngBounds(southWest, northEast);

    const mapInstance = L.map("map", {
      attributionControl: false,
      zoomControl: false,
      zoomSnap: 1,
      zoomDelta: 1,
      wheelDebounceTime: 100,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    }).fitBounds(bounds);

    L.tileLayer("http://localhost:5173/map/{z}/{x}/{y}.png", {
      minZoom: 17,
      maxZoom: 19,
      bounds: bounds,
    }).addTo(mapInstance);

    // Add custom positioned zoom control
    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(mapInstance);

    // Custom scroll zoom handler
    const customZoomHandler = (e) => {
      e.preventDefault();
      const currentZoom = mapInstance.getZoom();
      const newZoom = e.deltaY < 0 ? currentZoom + 1 : currentZoom - 1;
      mapInstance.setZoom(newZoom);
    };

    // Add custom zoom handler
    mapInstance
      .getContainer()
      .addEventListener("wheel", customZoomHandler, { passive: false });

    const newLayerGroups = {
      "Ground Floor Classrooms": L.layerGroup().addTo(mapInstance),
      "First Floor Classrooms": L.layerGroup().addTo(mapInstance),
      "Second Floor Classrooms": L.layerGroup().addTo(mapInstance),
      "Ground Floor Labs": L.layerGroup().addTo(mapInstance),
      "First Floor Labs": L.layerGroup().addTo(mapInstance),
      "Second Floor Labs": L.layerGroup().addTo(mapInstance),
      "Ground Floor Canteens": L.layerGroup().addTo(mapInstance),
    };

    // Canteen on Ground Floor
    L.marker([11.496710184878154, 77.2771668434143])
      .addTo(newLayerGroups["Ground Floor Canteens"]) // Ground floor canteen layer
      .bindPopup("Main Canteen (Ground Floor)");

    // Lab on Second Floor
    L.marker([11.496710184878154, 77.27784276008606])
      .addTo(newLayerGroups["Second Floor Labs"]) // Second floor labs layer
      .bindPopup("Computer Lab (Second Floor)");

    // Classrooms on different floors
    L.marker([11.496447345397902, 77.27879762649538])
      .addTo(newLayerGroups["Ground Floor Classrooms"]) // Ground floor classrooms layer
      .bindPopup("Classroom 1 (Ground Floor)");

    L.marker([11.49619501926611, 77.27850794792177])
      .addTo(newLayerGroups["First Floor Classrooms"]) // First floor classrooms layer
      .bindPopup("Classroom 2 (First Floor)");

    L.marker([11.496152964888854, 77.27855086326599])
      .addTo(newLayerGroups["Second Floor Classrooms"]) // Second floor classrooms layer
      .bindPopup("Classroom 3 (Second Floor)");

    // Create custom filter control
    L.Control.FilterButton = L.Control.extend({
      onAdd: function () {
        const button = L.DomUtil.create(
          "button",
          "leaflet-bar leaflet-control leaflet-control-custom",
        );
        button.innerHTML = "🔍"; // Filter icon
        button.style.fontSize = "20px";
        button.style.width = "30px";
        button.style.height = "30px";
        button.style.cursor = "pointer";
        button.onclick = () => setShowFilters(!showFilters);
        return button;
      },
    });

    new L.Control.FilterButton({ position: "topright" }).addTo(mapInstance);

    // Add click event listener to log coordinates
    mapInstance.on("click", function (e) {
      console.log(`Clicked at: ${e.latlng.lat}, ${e.latlng.lng}`);
    });

    setMap(mapInstance);
    setLayerGroups(newLayerGroups);

    return () => {
      mapInstance
        .getContainer()
        .removeEventListener("wheel", customZoomHandler);
      mapInstance.off("click"); // Remove the click event listener
      mapInstance.remove();
    };
  }, [showFilters]);

  useEffect(() => {
    if (map && Object.keys(layerGroups).length > 0) {
      // Handle each floor and category combination
      ["Ground Floor", "First Floor", "Second Floor"].forEach((floor) => {
        // Handle classrooms
        if (filters.Classrooms && filters[floor]) {
          layerGroups[`${floor} Classrooms`].addTo(map);
        } else {
          layerGroups[`${floor} Classrooms`].removeFrom(map);
        }

        // Handle labs
        if (filters.Labs && filters[floor]) {
          layerGroups[`${floor} Labs`].addTo(map);
        } else {
          layerGroups[`${floor} Labs`].removeFrom(map);
        }

        // Handle canteens
        if (filters.Canteen && filters[floor] && floor === "Ground Floor") {
          layerGroups[`${floor} Canteens`].addTo(map);
        } else {
          layerGroups[`${floor} Canteens`]?.removeFrom(map); // Safely handle undefined
        }
      });
    }
  }, [filters, map, layerGroups]);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="relative w-full h-screen">
      <div id="map" className="w-full h-full"></div>
      {showFilters && (
        <div className="absolute top-2 right-12 bg-white p-3 rounded-md shadow-lg z-[1000]">
          <h3 className="font-bold mb-2">Filters</h3>
          {Object.entries(filters).map(([key, value]) => (
            <label key={key} className="block mb-1">
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleFilterChange}
                className="mr-2"
              />
              {key}
            </label>
          ))}
          <button
            onClick={() => setShowFilters(false)}
            className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
