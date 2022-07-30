// At least one function should be imported.
// At least one event listener should be imported.
// styles referenced in html/css

//import functions
import {getGeoCity} from './js/geoNamesApi';
import {getWeatherForecast} from './js/weatherApi';
import { getCity, getTripStart, getTripEnd } from "./js/form";

//import style
//import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";
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


//add event listeners
/* Add event listeners */
document
  .getElementById("button_search")
  .addEventListener("click", handleSearch);
