import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useStore } from "./store";
import * as L from "leaflet";
import { observer } from "mobx-react-lite";

const CustomMarker = observer(({ spot }) => {
  const store = useStore();
  const [isFavorite, setIsFavorite] = useState(null);
  const [favoriteObj, setFavoriteObj] = useState(null);
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

  useEffect(() => {
    let favorites = store.favorites;
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].spot == spot.id) {
        setIsFavorite(true);
        setFavoriteObj(favorites[i]);
        console.log(favorites[i].spot + " is favorite");
      }
    }
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
        setFavoriteObj(data);
      })
      .catch((err) => console.log(err));
    setIsFavorite(true);
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
        {spot.id}
        <br />
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
