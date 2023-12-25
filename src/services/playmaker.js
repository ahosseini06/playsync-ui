import pluralize from "pluralize";

const base = 'http://localhost:1337/api';

export const getEntities = async(arg) => {
  const {name} = arg;
  let response;

  await fetch(`${base}/${name}?populate=*`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON data
    })
    .then(jsonResponse => {
      console.log("jsonResponse")
      console.log(jsonResponse); // Handle the JSON response here
      response = jsonResponse;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
    
    return response;
}