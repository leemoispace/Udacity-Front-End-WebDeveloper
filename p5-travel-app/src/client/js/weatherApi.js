async function getWeatherKey() {
  const response = await fetch("/getWeatherKey");
  try {
    const key = await response.json();
    return key;
  } catch (error) {
    console.warn("ERORR", error);
  }
}
// TODO: will remove later

const weatherKey = "b3432a956d7b45a18ba374d67c837a2e";

export async function getWeatherForecast(latitude, longitude) {
  const endpoint =
    "https://api.weatherbit.io/v2.0/forecast/daily?" +
    `lat=${latitude}&lon=${longitude}&key=` +
    weatherKey;
  try {
    const res = await fetch("http://localhost:8080/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: endpoint }),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.warn(error);
  }
}
