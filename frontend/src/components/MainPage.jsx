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
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      {showFilters && (
        <div style={styles.filterPopup}>
          <h3>Filters</h3>
          {Object.entries(filters).map(([key, value]) => (
            <label key={key} style={styles.filterLabel}>
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleFilterChange}
              />
              {key}
            </label>
          ))}
          <button
            onClick={() => setShowFilters(false)}
            style={styles.closeButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  filterPopup: {
    position: "absolute",
    top: "10px",
    right: "50px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
  filterLabel: {
    display: "block",
    marginBottom: "5px",
  },
  closeButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default LeafletMap;
