import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import AddSpot from "./AddSpot";
import Map from "./Map";
import { useStore } from "./store";
import "./Dashboard.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router";
import SpotsTable from "./SpotsTable";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
      <div className="dashboard__bar">
        <h3 className="dashboard__logo">Kite</h3>
        <div className="dashboard__controls">
          <Button
            onClick={() => {
              if (store.isAddingSpot) {
                store.setIsAddingSpot(false);
              } else {
                store.setIsAddingSpot(true);
              }
            }}
            variant="contained"
            color="primary"
          >
            Add Spot
          </Button>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <AccountCircleIcon id="dashboard__account" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            elevation={3}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleLogout} id="dashboard__logout">
              <ExitToAppIcon />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Map />
      {store.isAddingSpot ? <AddSpot /> : ""}
      {store.spots && <SpotsTable />}
    </div>
  );
});

export default Dashboard;
