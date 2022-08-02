// At least one function should be imported.
// At least one event listener should be imported.
// styles referenced in html/css

//import functions
import { getGeoCity } from "./js/geoNamesApi";
import { getWeatherForecast } from "./js/weatherApi";
import { getCity, getTripStart, getTripEnd } from "./js/form";
import { showModal, recentTrip } from "./js/model";
import { getCountryInfo } from "./js/restCountriesApi";

//import style
import "./styles/style.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const $ = require("jquery");

const trip = {};

//functions
const handleSearch = async (e) => {
  e.preventDefault();
  trip.city = getCity();
  trip.start = getTripStart();
  trip.end = getTripEnd();
  const geocity = await getGeoCity(trip.city);
  trip.latitude = geocity.latitude;
  trip.longitude = geocity.longitude;
  trip.countryCode = geocity.countryCode;
  trip.weatherForecast = await getWeatherForecast(
    geocity.latitude,
    geocity.longitude
  );
  const countryInfo = await getCountryInfo(trip.countryCode);
  trip.country = countryInfo.name;
  trip.countryFlag = countryInfo.flag;
  trip.image = await getImageURL(trip.city, trip.country);
  showModal(trip);
};

const handleSave = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:8081/saveData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trip: trip }),
    });
    if (res.ok) {
      const data = await res.json();
      recentTrip(data);
      return data;
    }
  } catch (error) {
    console.warn(error);
  }
};

const handleCancel = (e) => {
  e.preventDefault();
  $("#tripModal").modal("toggle");
  document.querySelector(".caption").style.display = "block";
};

//add event listeners
document
  .getElementById("button_search")
  .addEventListener("click", handleSearch);

document.querySelector(".trip_save").addEventListener("click", handleSave);

document.querySelectorAll(".trip_cancel").forEach((element) => {
  element.addEventListener("click", handleCancel);
});
