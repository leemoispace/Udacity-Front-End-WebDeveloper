/* Global Variables */
const API_KEY = "appid=a491419e0509010bdef0e12219d465eb&units=metric";
//new api, key not working: https://openweathermap.org/api/one-call-3
// const baseURL = "https://api.openweathermap.org/data/3.0/onecall?";

//use old api to move on first: https://openweathermap.org/api/one-call-api
const baseURL = "https://api.openweathermap.org/data/2.5/onecall?";

const cityURL="http://api.openweathermap.org/geo/1.0/direct?q="
let cords={}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to get Data from API*/
const getCityCords = async (cityURL, city, API_KEY) => {
    //get city coordinates: https://openweathermap.org/api/geocoding-api
    //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    //http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid={API key}
    const url = `${cityURL}${city}&limit=1&${API_KEY}`;
    const response = await fetch(url);//fetch return promise
    let geodata = await response.json();
    //response format as above doc
    console.log(geodata[0].lat,geodata[0].lon);
    return geodata
};

const getWeatherData = async (baseURL, city, API_KEY) => {
    let geodata=await getCityCords(cityURL,city,API_KEY);
    //weather api: https://openweathermap.org/api/one-call-3
    //Format:   https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    const url = `${baseURL}lat=${geodata[0].lat}&lon=${geodata[0].lon}&exclude=minutely,hourly,daily,alerts&${API_KEY}`;
    //const response = await fetch(url);
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data
}
getWeatherData(baseURL,'dubai',API_KEY)


// const testGetData=async()=>{
//     // let testurl="https://api.openweathermap.org/data/3.0/onecall?lat=39.906217&lon=116.3912757&exclude=minutely,hourly,daily,alerts&appid=a491419e0509010bdef0e12219d465eb&units=metric"
//     //using old version api:https://openweathermap.org/faq   https://openweathermap.org/api/one-call-api
//     let testurl="http://api.openweathermap.org/data/2.5/weather?id=524901&appid=a491419e0509010bdef0e12219d465eb"
//     const response = await fetch(testurl);
//     let data = await response.json();
//     console.log(data);
//     return data
// }

// testGetData()

