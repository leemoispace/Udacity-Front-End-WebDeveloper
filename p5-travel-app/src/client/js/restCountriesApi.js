//https://restcountries.com/
export async function getCountryInfo(countryCode) {
  const endpoint = `https://restcountries.com/v3.1/alpha/${countryCode}`;
  try {
    const res = await fetch(endpoint);
    if (res.ok) {
      const data = await res.json();
      return {
        name: data[0].name.common,
        flag: data[0].flag,
      };
    }
  } catch (error) {
    console.warn(error);
  }
}
