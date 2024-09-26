import styles from "./CountryItem.module.css";
import flagemojiToPNG from "../Utils/flagEmojiToPNG";
function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        {<img src={flagemojiToPNG(country.emoji)} alt="flag emoji"></img>}
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
