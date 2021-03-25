import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import CustomMarker from "./CustomMarker";
// import "leaflet/dist/leaflet.css";

import "./Map.css";
import { useStore } from "./store";
const Map = observer(() => {
  const store = useStore();
  return (
    <div className="map">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""
      />
      <MapContainer center={[46.984, 9.247]} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {store.spots.map((spot) => (
          <CustomMarker spot={spot} key={`spot-${spot.id}`} />
        ))}
      </MapContainer>
    </div>
  );
});

export default Map;
