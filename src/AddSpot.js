import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "./AddSpot.css";
import MarkerAdd from "./MarkerAdd";
import SetViewOnSelect from "./SetViewOnSelect";
import { useStore } from "./store";
function AddSpot() {
  const store = useStore();
  const [countries, setCountries] = useState(null);
  const [countryValue, setCountryValue] = useState([46.984, 9.247]);
  const [countryName, setCountryName] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstSelectedDate, setFirstSelectedDate] = useState(new Date());
  const [secondSelectedDate, setSecondSelectedDate] = useState(new Date());
  const [name, setName] = useState("");
  const [optionValue, setOptionValue] = useState("");

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
  const handleCancel = () => {
    store.setIsAddingSpot(false);
  };
  const handleConfirm = () => {
    const date = new Date();
    const month1 = firstSelectedDate.toLocaleString("default", {
      month: "long",
    });
    const month2 = secondSelectedDate.toLocaleString("default", {
      month: "long",
    });
    let months;
    if (month1 === month2) {
      months = firstSelectedDate.toLocaleString("default", {
        month: "long",
      });
    } else {
      months =
        firstSelectedDate.toLocaleString("default", {
          month: "long",
        }) +
        " to " +
        secondSelectedDate.toLocaleString("default", {
          month: "long",
        });
    }

    const body = {
      createdAt: date.toISOString(),
      name: name,
      country: countryName,
      lat: store.position.lat.toString(),
      long: store.position.lng.toString(),
      month: months,
    };
    fetch(`${store.url}/spot`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Spot added successfully", response))
      .catch((err) => console.log(err));
    store.pushSpot(body);
    store.setIsAddingSpot(false);
  };
  return (
    <form onSubmit={handleConfirm}>
      <div className="add__container">
        <div className="add__name">
          <InputLabel id="name-label">Name</InputLabel>
          <TextField
            required
            id="filled-helperText"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="add__country">
          <InputLabel id="select-label">Country</InputLabel>
          <Select
            required
            labelId="select-label"
            id="select-country"
            value={optionValue}
            onChange={(e) => {
              setOptionValue(e.target.value);
              setCountryValue(e.target.value.value);
              setCountryName(e.target.value.label);
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a country..
            </MenuItem>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="add__dates">
          <InputLabel>Starting Date</InputLabel>
          <DatePicker
            required
            dateFormat="dd/MM/yyyy"
            id="date-picker1"
            selected={firstSelectedDate}
            onChange={(date) => setFirstSelectedDate(date)}
            selectsStart
            startDate={firstSelectedDate}
            endDate={secondSelectedDate}
          />
        </div>
        <div className="add__dates">
          <InputLabel>Ending Date</InputLabel>
          <DatePicker
            required
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
        <div className="add__season">
          <h4>High Season</h4>
          {firstSelectedDate.getMonth() !== secondSelectedDate.getMonth() ? (
            <p>
              {firstSelectedDate.toLocaleString("default", { month: "long" })}{" "}
              to{" "}
              {secondSelectedDate.toLocaleString("default", { month: "long" })}
            </p>
          ) : (
            <p>
              {firstSelectedDate.toLocaleString("default", { month: "long" })}
            </p>
          )}
        </div>
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
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Confirm
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddSpot;
