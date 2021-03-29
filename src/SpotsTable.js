import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useStore } from "./store";
import "./SpotsTable.css";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function SpotsTable() {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const store = useStore();
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "lat", headerName: "Latitude", width: 150 },
    { field: "long", headerName: "Longitude", width: 150 },
    { field: "month", headerName: "When to go", width: 180 },
    { field: "probability", headerName: "Probability (%)", width: 150 },
  ];
  useEffect(() => {
    let spots;
    spots = store.spots.map((spot) => {
      return {
        id: spot.id,
        country: spot.country,
        name: spot.name,
        lat: parseFloat(spot.lat), //parseInt(spot.lat),
        long: parseFloat(spot.long), //parseInt(spot.long),
        month: spot.month,
        probability: spot.probability,
      };
    });
    if (searchText) {
      spots = spots.filter((spot) => {
        const spotName = spot.name.toLowerCase();
        const spotCountry = spot.country.toLowerCase();
        return (
          spotName.includes(searchText.toLowerCase()) ||
          spotCountry.includes(searchText.toLowerCase())
        );
      });
    }

    setRows(spots);
  }, [store.spots, searchText]);
  //DE ADAUGAT STAR IN DREPTUL CELOR FAVORITE
  return (
    <div className="table__container">
      <SearchIcon />
      <TextField
        variant="outlined"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
      />
    </div>
  );
}

export default SpotsTable;
