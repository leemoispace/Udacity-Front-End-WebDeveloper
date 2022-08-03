var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");
//https://bobbyhadz.com/blog/javascript-error-err-require-esm-of-es-module-node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


const trips = [];

// Set up API key.
dotenv.config();
pixabayKey = {
  api: process.env.pixabayKey,
};
weatherKey = {
  api: process.env.weatherKey,
};
username = {
  api: process.env.username,
};

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

app.post("/forecast", async (req, res) => {
  if (req.body.endpoint !== " ") {
    const endpoint = req.body.endpoint;
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const jsonRes = await response.json();
        res.status(201).send(jsonRes);
      }
    } catch (error) {
      console.warn(error);
    }
  } else {
    res.status(400).json("Bad Request");
  }
});

module.exports = app;
