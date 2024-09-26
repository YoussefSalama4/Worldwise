import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { cities } = useCities();
  if (!cities?.length) {
    return (
      <Message message="add your first city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.date} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
