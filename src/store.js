import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class KiteStore {
  user = null;
  url = "https://605a1211b11aba001745d7e0.mockapi.io";
  spots = [];
  favorites = [];
  constructor() {
    makeAutoObservable(this);
  }
  setUser(id) {
    this.user = id;
  }
  setSpots(data) {
    this.spots = data;
  }
  setFavorites(data) {
    this.favorites = data;
  }
  pushFavorite(item) {
    this.favorites.push(item);
  }
  removeFavorite(id) {
    this.favorites = this.favorites.filter((fav) => fav.spot !== id);
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
