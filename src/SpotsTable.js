import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import "./SpotsTable.css";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { observer } from "mobx-react-lite";
const SpotsTable = observer(() => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const store = useStore();
  const tableRef = useRef();
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
      })
      .catch((err) => console.log(err));
  };
  const removeFromFavorites = (id) => {
    let favorites = store.favorites;
    let favoriteObj; //id of 'favorite' object
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].spot == id) {
        favoriteObj = favorites[i].id;
        console.log(favorites[i].spot + " is favorite");
      }
    }
    fetch(`${store.url}/favourites/${favoriteObj}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        store.removeFavorite(id);
      })
      .catch((err) => console.log(err));
  };
  store.setTableRef(tableRef.current);
  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "country", headerName: "Country", width: 250 },
    {
      field: "lat",
      headerName: "Latitude",
      width: 150,
      renderCell: (params) =>
        params.row.lat.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 3,
        }),
    },
    {
      field: "long",
      headerName: "Longitude",
      width: 150,
      renderCell: (params) =>
        params.row.long.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 3,
        }),
    },
    { field: "month", headerName: "When to go", width: 180 },
    { field: "probability", headerName: "Probability (%)", width: 150 },
    {
      field: "isFavorite",
      headerName: "Favorite",
      width: 150,
      renderCell: (params) =>
        params.row.isFavorite === true ? (
          <StarIcon
            style={{ color: "rgb(255,204,0)", cursor: "pointer" }}
            onClick={() => removeFromFavorites(params.row.id)}
          />
        ) : (
          <StarOutlineIcon
            style={{ cursor: "pointer" }}
            onClick={() => addToFavorites(params.row.id)}
          />
        ),
    },
  ];
  const scrollToDiv = (ref) => window.scrollTo(0, ref.offsetTop);
  useEffect(() => {
    let spots;
    spots = store.spots.map((spot) => {
      let fav = store.favorites.some((item) => item.spot == spot.id);

      return {
        id: spot.id,
        country: spot.country,
        name: spot.name,
        lat: parseFloat(spot.lat),
        long: parseFloat(spot.long),
        month: spot.month,
        probability: spot.probability,
        isFavorite: fav,
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
  }, [store.spots, searchText, store.favorites]);

  return (
    <div className="table__container" ref={tableRef}>
      <h1 className="table__title">Locations</h1>
      <div className="table__search">
        {/* <SearchIcon /> */}
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
        id="table__datagrid"
      />
      <IconButton id="table__goUp" onClick={() => scrollToDiv(store.mapRef)}>
        <ArrowUpwardIcon />
      </IconButton>
    </div>
  );
});

export default SpotsTable;
