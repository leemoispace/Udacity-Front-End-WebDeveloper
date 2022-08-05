export async function getImageURL(city, country) {
  const queryCity = `&q=${city}&image_type=photo&pretty=true&category=places`;
  const queryCountry = `&q=${country}&image_type=photo&pretty=true&category=places`;

  const cityEndpoint = "https://pixabay.com/api/?" + queryCity;
  const countryEndpoint = "https://pixabay.com/api/?" + queryCountry;
  try {
    let response = await fetch("http://localhost:8081/pixabay-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: cityEndpoint }),
    });
    if (response.ok) {
      let jsonRes = await response.json();
      if (jsonRes.totalHits === 0) {
        // If not, display pictures for the country
        response = await fetch("http://localhost:8081/pixabay-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: countryEndpoint }),
        });
        if (response.ok) {
          jsonRes = await response.json();
          return jsonRes.hits[0].largeImageURL;
        }
      }
      return jsonRes.hits[0].largeImageURL;
    }
  } catch (error) {
    console.warn(error);
  }
}
