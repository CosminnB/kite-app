import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";

import "./AddSpot.css";
function AddSpot() {
  const [countries, setCountries] = useState(null);
  const [countryValue, setCountryValue] = useState("");
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

      {/* <InputLabel htmlFor="select-native-label">Country</InputLabel>
      <NativeSelect
        value={countryValue}
        onChange={(e) => setCountryValue(e.target.value)}
        inputProps={{
          name: "country",
          id: "select-native-label",
        }}
      >
        <option value="" disabled>
          Select a country..
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect> */}
    </div>
  );
}

export default AddSpot;
