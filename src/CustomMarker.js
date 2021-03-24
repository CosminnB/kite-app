import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useStore } from "./store";
import * as L from "leaflet";
import { observer } from "mobx-react-lite";

const CustomMarker = observer(({ spot }) => {
  const store = useStore();
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const yellowIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  });
  const blueIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  });
  const [isFavorite, setIsFavorite] = useState(null);
  const [favoriteObj, setFavoriteObj] = useState(null);
  useEffect(() => {
    store.favorites.map((item) => {
      if (item.spot == spot.id) {
        setIsFavorite(true);
        setFavoriteObj(item);
        console.log("is favorite");
      } else {
        setIsFavorite(false);
      }
    });
  }, [store.favorites]);

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
      .then((data) => {
        store.pushFavorite(data);
        setIsFavorite(true);
        setFavoriteObj(data);
      })
      .catch((err) => console.log(err));
  };
  const removeFromFavorites = (id) => {
    const body = { spot: id };
    fetch(`${store.url}/favourites/${favoriteObj.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        store.removeFavorite(id);
        setIsFavorite(false);
        setFavoriteObj(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Marker
      position={[spot.lat, spot.long]}
      icon={isFavorite ? yellowIcon : blueIcon}
    >
      <Popup>
        {spot.name} <br /> {spot.country} <br /> {isFavorite ? "FAVORITE" : ""}
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
        <button onClick={() => removeFromFavorites(spot.id)}>
          Remove from favorites
        </button>
      </Popup>
    </Marker>
  );
});

export default CustomMarker;
