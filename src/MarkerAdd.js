import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { useStore } from "./store";

function MarkerAdd() {
  const [position, setPosition] = useState(null);
  const store = useStore();

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      setPosition(newMarker);
      store.setPosition(newMarker);
    },
  });
  return position && <Marker position={[position.lat, position.lng]}></Marker>;
}

export default MarkerAdd;
