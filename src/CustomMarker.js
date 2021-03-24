import React, { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useStore } from "./store";

function CustomMarker({ spot }) {
  const [isFavorite, setIsFavorite] = useState(null);
  const store = useStore();
  const addToFavorites = (id) => {
    const body = { spot: id };
    fetch(`${store.url}/favourites`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => store.pushFavorite(data))
      .catch((err) => console.log(err));
  };

  return (
    <Marker position={[spot.lat, spot.long]}>
      <Popup>
        {spot.name} <br /> {spot.country} <br />{" "}
        {/* {checkIsFavorite ? "FAVORITE" : ""} */}
        <br />
        Wind probability: {spot.probability}% Latitude: {spot.lat}
        <br />
        Longitude: {spot.long}
        <br />
        When to go: {spot.month}
        <br />
        <button onClick={() => addToFavorites(spot.id)}>
          Add to favorites
        </button>
      </Popup>
    </Marker>
  );
}

export default CustomMarker;
