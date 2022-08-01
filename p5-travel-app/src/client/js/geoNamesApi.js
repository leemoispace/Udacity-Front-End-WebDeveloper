async function getUsername() {
  const response = await fetch("/getUsername");
  try {
    const key = await response.json();
    return key;
  } catch (error) {
    console.warn("ERORR", error);
  }
}
// TODO: will remove later
const username = "leemoispace";

export async function getGeoCity(city) {
  const dataUrl =
    "http://api.geonames.org/" +
    "searchJSON?formatted=true&q=" +
    city +
    "&username=" +
    username +
    "&style=full";
  try {
    const res = await fetch(dataUrl);
    if (res.ok) {
      const city = {};
      const data = await res.json();
      city.latitude = data.geonames[0].lat;
      city.longitude = data.geonames[0].lng;
      city.population = data.geonames[0].population;
      city.countryCode = data.geonames[0].countryCode;
      return city;
    }
  } catch (error) {
    console.warn(error);
  }
}
