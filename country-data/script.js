const getCountryForm = document.querySelector('#get-country-form');

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
    <h2 class="county__title">${data.name.common}</h2>
    <h3 class="country__subtitle">${data.region}: ${data.subregion}</h3>
    <h3 class="country__subtitle">Capital: ${data.capital.join(', ')}</h3>
    <p class="country__row"><span>👫</span>${population} people</p>
    <p class="country__row"><span>🗣️</span>${languages.join(', ')}</p>
    <p class="country__row"><span>💰</span>${currencies.join(', ')}</p>    
  </div>`;
};

const capitalizeFirstLetter = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const renderError = msg => {
  const errorContainer = document.querySelector('.error-message');
  errorContainer.style.display = 'block';
  errorContainer.textContent = msg;
};

const getCountry = async country => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    if (!response.ok) {
      throw new Error(`Country not found. Try again. (${response.status})`);
    }

    const data = await response.json();

    if (data.length > 1) {
      const formattedCountry = capitalizeFirstLetter(country);
      const filteredData = data.filter(
        item =>
          item.name.common === formattedCountry ||
          item.name.official === formattedCountry
      );
      if (filteredData.length === 0) {
        throw new Error(`Country not found. Try writing the full name.`);
      }
      renderCountry(filteredData[0]);
      return;
    }

    renderCountry(data[0]);
  } catch (err) {
    console.error(err.message);
    renderError(`Something went wrong. ${err.message}`);
  }
};

getCountryForm.addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('.error-message').style.display = 'none';
  document.querySelector('.country').style.display = 'none';
  const country = document.querySelector('#country').value.trim();
  if (country) {
    getCountry(country);
  } else {
    alert('Please enter a country!');
  }
  e.target.reset();
});
