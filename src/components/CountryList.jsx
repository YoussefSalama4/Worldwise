import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function getUniqueCountries(cities) {
  let countries = [];
  for (let i = 0; i < cities.length; i++) {
    if (!countries.find((item) => item.country === cities[i].country)) {
      countries.push({ country: cities[i].country, emoji: cities[i].emoji });
    }
  }
  return countries;
}
function CountryList() {
  const { cities } = useCities();
  if (!cities?.length) {
    return (
      <Message message="add you first city by clicking on a city on the map" />
    );
  }
  const countries = getUniqueCountries(cities);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
