import { createContext, useContext, useRef, useState } from "react";
import citiesData from "../../data/cities.json";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useLocalStorageState(citiesData.cities, "cities");
  const currentCity = useRef(null);

  function getCity(id) {
    const city = cities.find((el) => el.id === Number(id));
    currentCity.current = id;
    return city;
  }

  function handleAddCity(newCity) {
    setCities((cities) => [...cities, newCity]);
  }

  function handleDeleteCity(id) {
    setCities((cities) => cities.filter((city) => city.id !== id));
  }
  return (
    <CitiesContext.Provider
      value={{ cities, getCity, currentCity, handleAddCity, handleDeleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error(
      "The Cities Context is used outside of Cities Context Provider scope"
    );
  }
  return context;
}

export { CitiesProvider, useCities };
