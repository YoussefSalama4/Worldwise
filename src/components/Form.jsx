// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { UseUrlPosition } from "../hooks/UseUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";

import flagemojiToPNG from "../Utils/flagEmojiToPNG";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = UseUrlPosition();
  const navigate = useNavigate();
  const [isLoadingCityData, setIsLoadingCityData] = useState(false);
  const [gettingCityError, setGettingCityError] = useState("");
  const { handleAddCity, currentCity } = useCities();
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getCityData() {
        try {
          setIsLoadingCityData(true);
          setGettingCityError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode) {
            throw new Error(
              "that doesn't look like a city click anywhere else 🤗"
            );
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setGettingCityError(error.message);
        } finally {
          setIsLoadingCityData(false);
        }
      }
      getCityData();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!date || !cityName) {
      return;
    }
    const city = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      id: Date.now() + Math.floor(Math.random() * 10000),
    };
    currentCity.current = city.id;
    handleAddCity(city);
    navigate("/app");
  }
  if (isLoadingCityData) return <Spinner />;
  if (gettingCityError) return <Message message={gettingCityError} />;
  if (!lat && !lng)
    return <Message message="start by clicking a city on the map" />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          {emoji && <img src={flagemojiToPNG(emoji)} alt="flag emoji"></img>}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          dateFormat={"dd/MM/yyyy"}
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
