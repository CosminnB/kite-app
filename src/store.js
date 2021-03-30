import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class KiteStore {
  user = localStorage.getItem("user")
    ? parseInt(localStorage.getItem("user"))
    : null;
  url = "https://605a1211b11aba001745d7e0.mockapi.io";
  spots = [];
  favorites = [];
  isAddingSpot = false;
  position = {};
  tableRef = null;
  mapRef = null;
  constructor() {
    makeAutoObservable(this);
  }
  setUser(id) {
    this.user = id;
  }
  setSpots(data) {
    this.spots = data;
  }
  pushSpot(spot) {
    this.spots.push(spot);
  }
  setFavorites(data) {
    this.favorites = data;
  }
  pushFavorite(item) {
    this.favorites = [...this.favorites, item];
  }
  removeFavorite(id) {
    this.favorites = this.favorites.filter((fav) => fav.spot !== id);
  }
  setIsAddingSpot(bool) {
    this.isAddingSpot = bool;
  }
  setPosition(pos) {
    this.position = pos;
  }
  setTableRef(ref) {
    this.tableRef = ref;
  }
  setMapRef(ref) {
    this.mapRef = ref;
  }
}

const StoreContext = createContext();

const StoreProvider = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
const useStore = () => {
  return useContext(StoreContext);
};

export { KiteStore, StoreProvider, useStore };
