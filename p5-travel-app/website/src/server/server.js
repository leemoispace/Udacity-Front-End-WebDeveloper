const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

/* Server Setup */
const app = express();
app.use(cors());

// to use url encoded values
app.use(bodyParser.urlencoded({ extended: true }));
// to use json
app.use(bodyParser.json());

// to use built files in dist folder
app.use(express.static("./dist"));
