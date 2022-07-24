import { checkForName } from "../js/nameChecker";
let formText;

//UI elements
let resultsId = document.getElementById("results");
let modelId = document.getElementById("model");
let agreementId = document.getElementById("agreement");
let subjectivityId = document.getElementById("subjectivity");
let confidenceId = document.getElementById("confidence");
let ironyId = document.getElementById("irony");
let scoreTagId = document.getElementById("score_tag");

// 1.Function to GET the api key from server side
async function getApiKey() {
  const response = await fetch("/getApiKey");
  try {
    const key = await response.json();
    return key;
  } catch (error) {
    console.warn("ERORR", error);
  }
}

// 2.Function to check the url if it's valid
function checkURL(url) {
  if (checkForName(url)) {
    return url;
  } else {
    console.log("Invalid url");
    return url;
  }
}

// 3.Function to fetch api data, https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/request
async function getApiCall(apiKey) {
  const apiCall = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=auto&url=${formText}`;
  const response = await fetch(apiCall);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("error: ", error);
  }
}

// 4.Function to POST data to server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
};

// 5.Function to update UI after server get the response, format in: https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/response
async function updateUI() {
  let request = await fetch("/getData");
  try {
    let result = await request.json();
    resultsId.innerHTML = "Results";
    modelId.innerHTML = "Model: " + result.model;
    agreementId.innerHTML = "Agreement: " + result.agreement;
    subjectivityId.innerHTML = "Subjectivity: " + result.subjectivity;
    confidenceId.innerHTML = "Confidence: " + result.confidence + "%";
    ironyId.innerHTML = "Irony: " + result.irony;
    scoreTagId.innerHTML = "Score tag: " + result.score_tag;
  } catch (error) {
    console.warn("Error updateUI:", error);
  }
}

// Main function to handle submitted input
function handleSubmit() {
  // check what text was put into the form field
  formText = document.getElementById("url").value;
  const urlCheck = checkURL(formText);

  if (urlCheck) {
    try {
      getApiKey()
        .then((apiKey) => {
          return getApiCall(apiKey.api);
        })
        .then((data) => {
          postData("/postData", data);
        })
        .then(() => {
          updateUI();
        });
    } catch (error) {
      console.warn("invalid url", error);
    }
  } else {
    alert("URL check failed, please check.");
  }
}

export { handleSubmit };
