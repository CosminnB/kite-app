import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "./AddSpot.css";
import MarkerAdd from "./MarkerAdd";
function AddSpot() {
  const [countries, setCountries] = useState(null);
  const [countryValue, setCountryValue] = useState([46.984, 9.247]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstSelectedDate, setFirstSelectedDate] = useState(new Date());

  useEffect(() => {
    if (loading) {
      fetch("https://restcountries.eu/rest/v2/all?fields=name;latlng")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      let sorted = countries?.map((country) => {
        return { value: country.latlng, label: country.name };
      });
      setOptions(sorted);
    }
  }, [loading]);

  return (
    <div className="add__container">
      <InputLabel id="name-label">Name</InputLabel>
      <TextField labelId="name" id="filled-helperText" placeholder="Name" />
      <InputLabel id="select-label">Country</InputLabel>
      <Select
        labelId="select-label"
        id="select-country"
        value={countryValue}
        onChange={(e) => setCountryValue(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select a country..
        </MenuItem>
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>Starting Date</InputLabel>
      <DatePicker
        id="date-picker"
        selected={firstSelectedDate}
        onChange={(date) => setFirstSelectedDate(date)}
      />
      <MapContainer center={countryValue} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerAdd />
      </MapContainer>
    </div>
  );
}

export default AddSpot;
