import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
