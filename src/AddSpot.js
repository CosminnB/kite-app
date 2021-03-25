import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./AddSpot.css";
function AddSpot() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;latlng")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.log(err));
  }, []);
  const options = countries?.map((country) => {
    return { value: country.latlng, label: country.name };
  });

  return (
    <div className="add__container">
      <label for="name">Name </label>
      <input type="text" placeholder="name" name="name" />

      <Select options={options} />
    </div>
  );
}

export default AddSpot;
