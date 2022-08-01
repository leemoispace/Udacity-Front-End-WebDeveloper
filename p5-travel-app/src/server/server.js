const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");

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

/* Server Setup */
const app = express();
app.use(cors());

// to use url encoded values
app.use(bodyParser.urlencoded({ extended: true }));
// to use json
app.use(bodyParser.json());

// to use built files in dist folder
app.use(express.static("./dist"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

const trips = [];

// Routes

app.get("/", (req, res) => {
  res.status(200).send("./dist/index.html");
});

app.post("/forecast", async (req, res, next) => {
  if (req.body.endpoint !== " ") {
    const endpoint = req.body.endpoint;
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const jsonRes = await response.json();
        res.status(201).send(jsonRes);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json("Bad Request");
  }
});

module.exports = app;
