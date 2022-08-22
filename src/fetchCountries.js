// const BASE_URL = 'https://restcountries.com/v3.1/all';
// const searchFields = new URLSearchParams({
//   fields: ['name', 'capital', 'population', 'flags', 'languages'],
// });

// export function fetchCountries(name) {
//   return fetch(`${BASE_URL}/${name}?${searchFields}`)
//     .then(response => {
//       // console.log(response);
//       if (response.status === 404) {
//         throw new Error(response.status);
//       }

//       return response.json();
//     })
//     .catch(console.log('Error!'));
// }

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields = name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${fields}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

// export function fetchCountries(name) {
//   return fetch(`${BASE_URL}/${name}?${searchFields}`)
//     .then(response => {
//       // console.log(response);
//       if (response.status === 404) {
//         throw new Error(response.status);
//       }

//       return response.json();
//     })
//     .catch(console.log('Error!'));
// }
