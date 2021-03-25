import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import AddSpot from "./AddSpot";
import Map from "./Map";
import { useStore } from "./store";
import "./Dashboard.css";

const Dashboard = observer(() => {
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
  return (
    <div className="dashboard">
      <Map />
      <AddSpot />
    </div>
  );
});

export default Dashboard;
