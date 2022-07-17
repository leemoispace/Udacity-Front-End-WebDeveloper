/* Global Variables */
const API_KEY = "appid=a491419e0509010bdef0e12219d465eb";
const baseURL = "https://api.openweathermap.org/data/3.0/onecall?";
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
    const request = await fetch(url);
    tryCatchBlock(request)
};

//test get cords, can't get the data out of promise, need to use then chain
// getCityCords(cityURL,'dubai',API_KEY)
//         .then(function(data){
//             console.log("city cords from api:",data[0].lat,data[0].lon);
//             lat=data[0].lat;
//             lon=data[0].lon;
//         })



const getWeatherData = async (baseURL, city, API_KEY) => {
    //how to get lat and lon data from promise? put into then block.
    getCityCords(cityURL,city,API_KEY).then(data => 
        {
            //weather api: https://openweathermap.org/api/one-call-3
            //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
            const url = `${baseURL}lat=${data[0].lat}&lon=${data[0].lon}&${API_KEY}`;
            const request = await fetch(url);
            tryCatchBlock(request)
        });
};

//test nested promise
getWeatherData(baseURL,'dubai',API_KEY).then(data=>{
    console.log(data);
})


//helper for fetch promise
function tryCatchBlock(request){
    try {
        // Transform into JSON
        const allData = await request.json();
        if (allData.message) {
            alert(allData.message);
        } else {
            return allData;
        }
    } catch (error) {
        console.log("error", error);
    }
}
