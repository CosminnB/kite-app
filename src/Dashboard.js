import React, { useEffect } from "react";
import Map from "./Map";
import { useStore } from "./store";

function Dashboard() {
  const store = useStore();
  useEffect(() => {
    fetch(`${store.url}/spot`)
      .then((res) => res.json())
      .then((data) => store.setSpots(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="dashboard">
      <Map />
    </div>
  );
}

export default Dashboard;
