import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useStore } from "./store";
import * as L from "leaflet";
import { observer } from "mobx-react-lite";
import { Button } from "@material-ui/core";
import "./CustomMarker.css";

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
        <div className="marker__wrapper">
          <div className="marker__top">
            <h3 className="marker__name"> {spot.name}</h3>
            {isFavorite ? (
              <div
                onClick={() => removeFromFavorites(spot.id)}
                className="marker__icon"
              >
                <img
                  src="\star-on.png"
                  alt="star-on"
                  width="20px"
                  height="20px"
                />
              </div>
            ) : (
              <div
                onClick={() => addToFavorites(spot.id)}
                className="marker__icon"
              >
                <img
                  src="\star-off.png"
                  alt="star-off"
                  width="20px"
                  height="20px"
                />
              </div>
            )}
          </div>
          <p className="marker__country"> {spot.country}</p>
          <p>
            Wind probability:<span> {spot.probability}%</span>
          </p>
          <p>
            Latitude:{" "}
            <span>
              {parseFloat(spot.lat).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 3,
              })}
              °{spot.lat < 0 ? "S" : "N"}
            </span>
          </p>

          <p>
            Longitude:{" "}
            <span>
              {parseFloat(spot.long).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 3,
              })}
              °{spot.long < 0 ? "W" : "E"}
            </span>
          </p>

          <p>
            When to go: <span>{spot.month}</span>
          </p>

          {isFavorite ? (
            <Button
              onClick={() => removeFromFavorites(spot.id)}
              variant="contained"
              color="secondary"
            >
              Remove from favorites
            </Button>
          ) : (
            <Button
              onClick={() => addToFavorites(spot.id)}
              variant="contained"
              color="primary"
            >
              Add to favorites
            </Button>
          )}
        </div>
      </Popup>
    </Marker>
  );
});

export default CustomMarker;
