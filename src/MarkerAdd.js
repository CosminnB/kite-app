import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

function MarkerAdd() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      console.log(newMarker);
      setPosition(newMarker);
    },
  }); //pt lat si lng
  return <Marker></Marker>;
}

export default MarkerAdd;
