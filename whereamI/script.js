const getLocationForm = document.querySelector('#get-location-form');

const renderCountry = data => {
  const countryContainer = document.querySelector('.country');
  countryContainer.style.display = 'block';
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies).map(item => item.name);
  const population =
    data.population > 1000000000
      ? `${(data.population / 1000000000).toFixed(1)}B`
      : +data.population > 1000000
      ? `${(data.population / 1000000).toFixed(1)}M`
      : data.population;
  countryContainer.innerHTML = `
  <div class="country__img">
    <img src=${data.flags.svg} alt="">
  </div>
  <div class="country__data">
    <h2 class="county__name">${data.name.common}</h2>
    <h3 class="country__region">${data.region}</h3>
    <p class="country__row"><span>👫</span>${population} people</p>
    <p class="country__row"><span>🗣️</span>${languages.join(', ')}</p>
    <p class="country__row"><span>💰</span>${currencies.join(', ')}</p>
  </div>`;
};

const showLocation = (city, country) => {
  const locationContainer = document.querySelector('.location');
  locationContainer.textContent = `You are in ${city}, ${country}`;
  locationContainer.style.display = 'block';
};

const renderError = msg => {
  const errorContainer = document.querySelector('.error-message');
  errorContainer.style.display = 'block';
  errorContainer.textContent = msg;
};

const whereAmI = (latitude, longitude) => {
  let country;
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${+latitude}&longitude=${+longitude}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Problem with geocoding. Please check the coordinates and try again! (${response.status}) `
        );
      }
      return response.json();
    })
    .then(data => {
      if (!data.city || !data.countryName) {
        throw new Error(
          `Country not found. Please check the coordinates and try again!`
        );
      }
      document.querySelector('.error-message').style.display = 'none';
      showLocation(data.city, data.countryName);
      country = data.countryName;
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country/information not found. (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      const filteredData = data.filter(
        item => item.name.common === country || item.name.official === country
      );
      renderCountry(filteredData[0]);
    })
    .catch(err => {
      console.error(err.message);
      renderError(`Something went wrong. ${err.message}`);
    });
};

getLocationForm.addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('.location').style.display = 'none';
  document.querySelector('.country').style.display = 'none';
  const latitude = document.querySelector('#latitude').value.trim();
  const longitude = document.querySelector('#longitude').value.trim();
  if (latitude && longitude) {
    whereAmI(latitude, longitude);
  } else {
    alert('Please enter the coordinates!');
  }
});
