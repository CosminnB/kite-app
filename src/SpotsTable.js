import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { useStore } from "./store";
import "./SpotsTable.css";

function SpotsTable() {
  const store = useStore();
  const columns = [
    { field: "country", headerName: "Country", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "lat", headerName: "Latitude", width: 150 },
    { field: "long", headerName: "Longitude", width: 150 },
    { field: "month", headerName: "When to go", width: 180 },
    { field: "probability", headerName: "Probability", width: 150 },
  ];
  const rows = store.spots.map((spot) => {
    return {
      id: spot.id,
      country: spot.country,
      name: spot.name,
      lat: spot.lat,
      long: spot.long,
      month: spot.month,
      probability: spot.probability,
    };
  });

  return (
    <div className="table__container">
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
