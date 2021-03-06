var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

articleData = {};

// Set up API key.
dotenv.config();
api_key = {
  api: process.env.API_KEY,
};

const app = express();
app.use(cors());
//Error: request entity too large: https://stackoverflow.com/questions/19917401/error-request-entity-too-large
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.static("dist"));

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function () {
  console.log(`Running on localhost: ${PORT}`);
});

// routes for client side functions
app.get("/getApiKey", function (req, res) {
  res.send(api_key);
});

app.post("/postData", function (req, res) {
  articleData = req.body;
  console.log("Data posted to server");
  return articleData;
});

app.get("/getData", function (req, res) {
  res.send(articleData);
});
