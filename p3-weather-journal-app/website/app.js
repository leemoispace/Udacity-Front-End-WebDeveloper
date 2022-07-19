/* Global Variables */
const API_KEY = "appid=a491419e0509010bdef0e12219d465eb&units=metric";

//new api, key not working: https://openweathermap.org/api/one-call-3
//const baseURL = "https://api.openweathermap.org/data/3.0/onecall?";
//so use old api to move on first: https://openweathermap.org/api/one-call-api
const baseURL = "https://api.openweathermap.org/data/2.5/onecall?";

const cityURL="http://api.openweathermap.org/geo/1.0/direct?q="
let cords={}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Function to get Data from API
const getCityCords = async (cityURL, city, API_KEY) => {
    //get city coordinates: https://openweathermap.org/api/geocoding-api
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
    const url = `${baseURL}lat=${geodata[0].lat}&lon=${geodata[0].lon}&exclude=minutely,hourly,daily,alerts&${API_KEY}`;
    //const response = await fetch(url);
    const response = await fetch(url);
    let data = await response.json();
    return data
}
//getWeatherData(baseURL,'dubai',API_KEY)


document.getElementById("generate").addEventListener("click", startGenerate);

function startGenerate() {
	const city = document.getElementById("city").value;
	const feelings = document.getElementById("feelings").value;
    getWeatherData(baseURL,city,API_KEY)
        .then(function (data) {
                // Add data
                console.log("AllData from api: ", data);
                postDataApi("addWeatherData", {
                    temperature: data.current.temp,
                    date: convertDate(data.current.dt),
                    userResponse: feelings,
                });
            })
            .then(() => updateUI());
}


//Function to POST data
const postDataApi = async (url = "", data = {}) => {
	console.log("post weather data: ", data);
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});

	try {
		const newData = await response.json();
		console.log("post res: ", newData);
	} catch (error) {
		console.log("error", error);
	}
};

//Function to update UI 
const updateUI = async () => {
	const request = await fetch("all");
	try {
		const data = await request.json();
		console.log("updateUI: ", data);
		document.getElementById("date").innerHTML = `Date: ${data.date}`;
		document.getElementById("temp").innerHTML = `Temperature(°C): ${data.temperature}`;
		document.getElementById("content").innerHTML = `Feelings: ${data.userResponse}`;
	} catch (error) {
		console.log("error", error);
	}
};

// Convert date
function convertDate(unixtimestamp) {
	// Months array
	var months_array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// Convert timestamp to milliseconds
	var date = new Date(unixtimestamp * 1000);
	// Year
	var year = date.getFullYear();
	// Month
	var month = months_array[date.getMonth()];
	// Day
	var day = date.getDate();
	// Display date time in MM/dd/yyyy format
	var convertedTime = month + "/" + day + "/" + year;
	return convertedTime;
}