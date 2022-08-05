export async function getWeatherForecast(latitude, longitude) {
  const endpoint =
    "https://api.weatherbit.io/v2.0/forecast/daily?" +
    `lat=${latitude}&lon=${longitude}`;
  try {
    const res = await fetch("http://localhost:8081/weather-bit-forecast", {
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
