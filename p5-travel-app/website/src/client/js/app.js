// There should be URLS and API Keys for at least 3 APIs, including Geonames, Weatherbit, and Pixabay. You can feel free to use more than 3 APIs.
// There should be a primary object with placeholder member value pairs.
// There should be a primary function that is exported to index.js.

const d = new Date();
const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Function to get Data from API
// Get city coordinates: https://openweathermap.org/api/geocoding-api
const getCityCords = async (cityURL, city, API_KEY) => {
  const url = `${cityURL}${city}&limit=1&${API_KEY}`;
  const response = await fetch(url);
  const geodata = await response.json();
  return geodata;
};

const getWeatherData = async (baseURL, city, API_KEY) => {
  const geodata = await getCityCords(cityURL, city, API_KEY);
  const url = `${baseURL}lat=${geodata[0].lat}&lon=${geodata[0].lon}&exclude=minutely,hourly,daily,alerts&${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Function to POST data
const postDataApi = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
  } catch (error) {
    console.warn("error:", error.message);
  }
};

// Function to convert date, get from: https://stackoverflow.com/a/6078873
function convertDate(unixtimestamp) {
  // Months array
  const months_array = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Convert timestamp to milliseconds
  const date = new Date(unixtimestamp * 1000);
  // Year
  const year = date.getFullYear();
  // Month
  const month = months_array[date.getMonth()];
  // Day
  const day = date.getDate();
  // Display date time in MM/dd/yyyy format
  const convertedTime = month + "/" + day + "/" + year;
  return convertedTime;
}

// Function to update UI
const updateUI = async () => {
  const request = await fetch("all");
  try {
    const data = await request.json();
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature(°C): ${data.temperature}`;
    document.getElementById(
      "content"
    ).innerHTML = `Feelings: ${data.userResponse}`;
  } catch (error) {
    console.warn("error:", error.message);
  }
};

document.getElementById("generate").addEventListener("click", startGenerate);

function startGenerate() {
  const city = document.getElementById("city").value;
  const feelings = document.getElementById("feelings").value;
  getWeatherData(baseURL, city, API_KEY)
    .then(function (data) {
      // Add data
      postDataApi("addWeatherData", {
        temperature: data.current.temp,
        date: convertDate(data.current.dt),
        userResponse: feelings,
      });
    })
    .then(() => updateUI());
}
