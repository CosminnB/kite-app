import React from "react";
import { useMap } from "react-leaflet";

function SetViewOnSelect({ coords }) {
  const map = useMap();
  map.setView(coords, 7);

  return null;
}

export default SetViewOnSelect;
