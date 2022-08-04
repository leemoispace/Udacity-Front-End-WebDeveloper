export async function getGeoCity(city) {
  const endpoint =
    "http://api.geonames.org/" +
    "searchJSON?formatted=true&q=" +
    city +
    "&style=full";

  try {
    const res = await fetch("http://localhost:8081/geo-name-locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: endpoint }),
    });
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
