import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY)
);

function onCountryInput(e) {
  const name = e.target.value.trim();
  if (name === '') {
    return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }

  fetchCountries(name)
    .then(countries => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      countries.length === 1
        ? (refs.countryList.innerHTML = createCountryList(countries)) &&
          (refs.countryInfo.innerHTML = createCountryCard(countries))
        : countries.length >= 10
        ? alertTooManyMatches()
        : (refs.countryList.innerHTML = createCountryList(countries));
    })
    .catch(alertNoName);
}

function createCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `;
    })
    .join('');
  return markup;
}

function createCountryCard(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><span><b>Capital: </b>${capital}</span></li>
            <li class="country-info__item"><span><b>Population: </b>${population}</span></li>
            <li class="country-info__item"><span><b>Languages: </b>${Object.values(
              languages
            ).join(', ')}</span></li>
        </ul>
        `;
    })
    .join('');
  return markup;
}

function alertNoName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatches() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
