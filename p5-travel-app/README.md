# Udacity Front End Development Nonodegree-Capstone-Travel-App

[project rubics](https://learn-udacity.top/fewd586261/Front%20End%20Web%20Developer%20v5.0.0/Part%2007-Module%2001-Lesson%2001_Project%20FEND%20Capstone%20-%20Travel%20App/Project%20Rubric%20-%20FEND%20Capstone%20-%20Travel%20App.html)

## Table of Contents

1. [About the Project](#about-the-project)
2. [API(s) Used](<#apis(s)-used>)
3. [Development Strategy](#development-strategy)
4. [Getting Started](#getting-started)
5. [Built With](#built-with)
6. [Test](#test)

## About the Project

In most cases of personal projects, it is very common to pull basic data from an external API. This is what we have accomplished so far in this nanodegree. However, many production-level applications do not rely on only a single source of data, they usually pull multiple data from various resources and make them available to different parts of the app asynchronously, so one API can use the data gathered from another API.
This app will get data from several API and show you the weather forecast for the destination u will go.

## API(s) Used

- [Geonames API](http://www.geonames.org/export/web-services.html) - Geographical database from which the location data is pulled
- [WeatherBit API](https://www.weatherbit.io/) - Weather API for current and future weather data
- [Pixabay API](https://pixabay.com/api/docs/) - RESTful interface for searching and retrieving free images and videos
- [REST COUNTRIES API](https://restcountries.com/) - Get information about countries via a RESTful API

## Development strategy

1. Setup Webpack Development Enviroment.
2. Setup a form where users can enter the trip destination and the dates.
3. Pull data including lattitude, longtitude and country code from Geonames API using form input.
4. Pass this data to Weather API with user entered dates to obtain weather information.
5. Introduce a countdown to find out how many days to the trip.
6. Use country code to pull country name and national flag using REST Countries API.
7. Use location and country name to pull images from Pixabay API.

## Getting Started

1. Download or clone the project:

```
git clone 

```

2. Install dependencies

```
npm install --save-dev
```

3. Start the server

```
npm start
```

4. Setup the environment development or production

```
npm run build-dev
```

or

```
npm run build-prod
```

5. Test with Jest

```
npm run test
```

## Built With Modules:

- [Bootstrap](https://getbootstrap.com/) - The CSS framework used
- [Sass](https://sass-lang.com/documentation) - The web framework used
- [Webpack](https://webpack.js.org/concepts/) - Asset Management
- [Babel](https://babeljs.io/) - JavaScript Compiler
- [Node.js](https://nodejs.org/en/) - JavaScript Runtime
- [Express.js](https://expressjs.com/) - Server Framework for Node.js
- [Jest](https://jestjs.io/) - Testing suit
- [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) - For offline capability

## Tips to make your project standout check:

At least one of these is required, but the rest are great additional ways to further customize and improve your project!

- [x] Add end date and display length of trip.
- [x] Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- [x] Allow user to add multiple destinations on the same trip.Pull in weather for additional locations.
  Allow the user to add hotel and/or flight data.Multiple places to stay? Multiple flights?
- [x] Integrate the REST Countries API to pull in data for the country being visited.
- [x] Allow the user to remove the trip.
- [x] Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
  Instead of just pulling a single day forecast, pull the forecast for multiple days.
  Incorporate icons into forecast.
  Allow user to Print their trip and/or export to PDF.
  Allow the user to add a todo list and/or packing list for their trip.
  Allow the user to add additional trips (this may take some heavy reworking, but is worth the challenge).
    Automatically sort additional trips by countdown.
    Move expired trips to bottom/have their style change so it’s clear it’s expired.
