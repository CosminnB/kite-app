import { InputLabel, Popover, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CustomMarker from "./CustomMarker";
// import "leaflet/dist/leaflet.css";

import "./Map.css";
import { useStore } from "./store";
const Map = observer(() => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [country, setCountry] = useState("");
  const [probability, setProbability] = useState("");
  const [filteredSpots, setFilteredSpots] = useState(null);
  const store = useStore();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const filterSpots = () => {
    let spots;

    spots = store.spots.filter((spot) => {
      let spotCountry;
      let spotProbability;
      if (country && probability) {
        spotCountry = spot.country.toLowerCase();
        spotProbability = spot.probability;
        return (
          spotCountry.includes(country.toLowerCase()) &&
          spotProbability == probability
        );
      } else if (country) {
        spotCountry = spot.country.toLowerCase();
        return spotCountry.includes(country.toLowerCase());
      } else if (probability) {
        spotProbability = spot.probability;
        return spotProbability == probability;
      }
    });
    setFilteredSpots(spots);
  };
  return (
    <div className="map">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""
      />
      <MapContainer
        center={[46.984, 9.247]}
        zoom={4}
        scrollWheelZoom={true}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        noWrap={true}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
          minZoom={3}
        />
        {filteredSpots
          ? filteredSpots.map((spot) => (
              <CustomMarker spot={spot} key={`spot-${spot.id}`} />
            ))
          : store.spots.map((spot) => (
              <CustomMarker spot={spot} key={`spot-${spot.id}`} />
            ))}
      </MapContainer>
      <button
        className="map__filterButton"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Filters
      </button>

      <Popover
        id={"filter-popover"}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <InputLabel id="country-label">Country</InputLabel>
        <TextField
          id="country-input"
          variant="standard"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <InputLabel id="probability-label">Wind Probability</InputLabel>
        <TextField
          id="probability-input"
          variant="standard"
          value={probability}
          onChange={(e) => setProbability(e.target.value)}
        />

        <button onClick={filterSpots}>Apply Filters</button>
        <button
          onClick={() => {
            setCountry("");
            setProbability("");
            setFilteredSpots(null);
          }}
        >
          Clear Filters
        </button>
      </Popover>
    </div>
  );
});

export default Map;
