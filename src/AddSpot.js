import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "./AddSpot.css";
import MarkerAdd from "./MarkerAdd";
import SetViewOnSelect from "./SetViewOnSelect";
function AddSpot() {
  const [countries, setCountries] = useState(null);
  const [countryValue, setCountryValue] = useState([46.984, 9.247]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstSelectedDate, setFirstSelectedDate] = useState(new Date());
  const [secondSelectedDate, setSecondSelectedDate] = useState(new Date());

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
      <div className="add__dates">
        <InputLabel>Starting Date</InputLabel>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          id="date-picker1"
          selected={firstSelectedDate}
          onChange={(date) => setFirstSelectedDate(date)}
          selectsStart
          startDate={firstSelectedDate}
          endDate={secondSelectedDate}
        />
        <InputLabel>Ending Date</InputLabel>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          id="date-picker2"
          selected={secondSelectedDate}
          onChange={(date) => setSecondSelectedDate(date)}
          selectsEnd
          startDate={firstSelectedDate}
          endDate={secondSelectedDate}
          minDate={firstSelectedDate}
        />
      </div>
      {firstSelectedDate.getMonth() !== secondSelectedDate.getMonth() ? (
        <p>
          {firstSelectedDate.toLocaleString("default", { month: "long" })} to{" "}
          {secondSelectedDate.toLocaleString("default", { month: "long" })}
        </p>
      ) : (
        <p>{firstSelectedDate.toLocaleString("default", { month: "long" })}</p>
      )}
      <MapContainer
        center={countryValue}
        zoom={3}
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
          minZoom={2}
        />
        <MarkerAdd />
        {countryValue !== [46.984, 9.247] ? (
          <SetViewOnSelect coords={countryValue} />
        ) : (
          ""
        )}
      </MapContainer>
      <div className="add__buttons">
        <button>Cancel</button>
        <button>Confirm</button>
      </div>
    </div>
  );
}

export default AddSpot;
