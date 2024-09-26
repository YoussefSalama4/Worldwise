import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

import flagemojiToPNG from "../Utils/flagEmojiToPNG";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;
  const { currentCity, handleDeleteCity } = useCities();
  function handleClick(e) {
    e.preventDefault();
    handleDeleteCity(id);
  }
  return (
    <>
      <li>
        <Link
          to={`${id}?lat=${lat}&lng=${lng}`}
          className={`${styles.cityItem} ${
            Number(currentCity.current) === id ? styles["cityItem--active"] : ""
          }`}
        >
          <span className={styles.emoji}>
            {<img src={flagemojiToPNG(emoji)} alt="emoji"></img>}
          </span>
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>{formatDate(date)}</time>
          <button onClick={handleClick} className={styles.deleteBtn}>
            &times;
          </button>
        </Link>
      </li>
    </>
  );
}

export default CityItem;
