import {
  Button,
  IconButton,
  InputLabel,
  Popover,
  TextField,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import "leaflet/dist/leaflet.css";

import "./Map.css";
import { useStore } from "./store";
const Map = observer(() => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [country, setCountry] = useState("");
  const [probability, setProbability] = useState("");
  const [filteredSpots, setFilteredSpots] = useState(null);
  const store = useStore();
  const mapRef = useRef(null);
  store.setMapRef(mapRef.current);
  const scrollToDiv = (ref) => window.scrollTo(0, ref.offsetTop);
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
    <div className="map" ref={mapRef}>
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

      <Button
        variant="contained"
        id="map__filterButton"
        onClick={(e) => {
          if (anchorEl) {
            setAnchorEl(null);
          } else {
            setAnchorEl(e.currentTarget);
          }
        }}
      >
        <img src="\filter.png" alt="filter-icon" id="filter-icon" />
        Filters
      </Button>
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
        <InputLabel id="filter__country-label">Country</InputLabel>
        <TextField
          id="country-input"
          variant="standard"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <InputLabel id="filter__probability-label">Wind Probability</InputLabel>
        <TextField
          id="probability-input"
          variant="standard"
          value={probability}
          onChange={(e) => setProbability(e.target.value)}
        />
        <div className="filter__button-group">
          <Button variant="contained" color="primary" onClick={filterSpots}>
            Apply Filters
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setCountry("");
              setProbability("");
              setFilteredSpots(null);
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Popover>
      <IconButton id="map__goDown" onClick={() => scrollToDiv(store.tableRef)}>
        <ArrowDownwardIcon />
      </IconButton>
    </div>
  );
});

export default Map;
