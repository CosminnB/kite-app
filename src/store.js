import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class KiteStore {
  user = null;
  url = "https://605a1211b11aba001745d7e0.mockapi.io";
  constructor() {
    makeAutoObservable(this);
  }
  setUser(id) {
    this.user = id;
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
