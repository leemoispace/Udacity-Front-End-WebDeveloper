var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const axios = require("axios");

// Set up API key.
const dotenv = require("dotenv");
dotenv.config();
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;

const trips = [];

// Server Setup
const app = express();
app.use(cors());

// to use url encoded values
app.use(bodyParser.urlencoded({ extended: true }));
// to use json
app.use(bodyParser.json());
// to use built files in dist folder
app.use(express.static("./dist"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// API key related
app.post("/geo-name-locations", async (req, res) => {
  const response = await axios.get(
    `${req.body.endpoint}&username=${GEONAMES_USERNAME}`
  );
  res.send(response.data);
});

app.post("/pixabay-images", async (req, res) => {
  const response = await axios.get(
    `${req.body.endpoint}&key=${PIXABAY_API_KEY}`
  );
  res.send(response.data);
});

app.post("/weather-bit-forecast", async (req, res) => {
  const response = await axios.get(
    `${req.body.endpoint}&key=${WEATHERBIT_API_KEY}`
  );
  res.send(response.data);
});

// designates what port the app will listen to for incoming requests
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

app.post("/saveData", (req, res) => {
  if (req.body !== " ") {
    const trip = req.body.trip;
    trips.push(trip);
    res.status(201).send(trip);
  } else {
    res.status(400).json("Bad Request");
  }
});

module.exports = app;
