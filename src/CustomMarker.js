import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useStore } from "./store";
import * as L from "leaflet";
import { observer } from "mobx-react-lite";

const CustomMarker = observer(({ spot }) => {
  const store = useStore();
  const [isFavorite, setIsFavorite] = useState(null);
  const [favoriteObj, setFavoriteObj] = useState(null);
  const [loading, setLoading] = useState(true);

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
    if (loading) {
      let favorites = store.favorites;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].spot == spot.id) {
          setIsFavorite(true);
          setFavoriteObj(favorites[i].id);
          console.log(favorites[i].spot + " is favorite");
          setLoading(false);
        }
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
        setIsFavorite(true);
        setFavoriteObj(data.id);
      })
      .catch((err) => console.log(err));
  };
  const removeFromFavorites = (id) => {
    if (favoriteObj) {
      fetch(`${store.url}/favourites/${favoriteObj}`, {
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
    }
  };

  return (
    <Marker
      position={[spot.lat, spot.long]}
      icon={isFavorite ? yellowIcon : blueIcon}
    >
      <Popup>
        <div>
          <h3> {spot.name}</h3>
          {isFavorite ? (
            <div onClick={() => removeFromFavorites(spot.id)}>
              <img
                src="\star-on.png"
                alt="star-on"
                width="20px"
                height="20px"
              />
            </div>
          ) : (
            <div onClick={() => addToFavorites(spot.id)}>
              <img
                src="\star-off.png"
                alt="star-off"
                width="20px"
                height="20px"
              />
            </div>
          )}
          <p> {spot.country}</p>
          Wind probability: {spot.probability}% Latitude: {spot.lat}
          <br />
          Longitude: {spot.long}
          <br />
          When to go: {spot.month}
          <br />
          {isFavorite ? (
            <button onClick={() => removeFromFavorites(spot.id)}>
              Remove from favorites
            </button>
          ) : (
            <button onClick={() => addToFavorites(spot.id)}>
              Add to favorites
            </button>
          )}
        </div>
      </Popup>
    </Marker>
  );
});

export default CustomMarker;
