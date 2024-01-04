export const getLocationAutomplete = async (address)=> {
const url = `https://us1.locationiq.com/v1/autocomplete?q=${address.replace(" ", "%20")}&key=pk.890ec8939abd4b2dcc413d56b1213ba7`;
  let rValue = [];

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Data received:', data);
    rValue = [...data];
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('rValue:', rValue);
  return rValue;

}
