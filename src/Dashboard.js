import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import AddSpot from "./AddSpot";
import Map from "./Map";
import { useStore } from "./store";
import "./Dashboard.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { IconButton, Menu, MenuItem, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import SpotsTable from "./SpotsTable";

const Dashboard = observer(() => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const store = useStore();
  useEffect(() => {
    fetch(`${store.url}/spot`)
      .then((res) => res.json())
      .then((data) => store.setSpots(data))
      .catch((err) => console.log(err));
    fetch(`${store.url}/favourites`)
      .then((res) => res.json())
      .then((data) => store.setFavorites(data))
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    store.setUser(null);
    history.push("/");
  };
  return (
    <div className="dashboard">
      <button onClick={() => store.setIsAddingSpot(true)}>Add Spot</button>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Map />
      {store.isAddingSpot ? <AddSpot /> : ""}
      {store.spots && <SpotsTable />}
    </div>
  );
});

export default Dashboard;
