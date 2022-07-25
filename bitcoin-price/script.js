const currencySymbols = {
  BRL: 'R$',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

function getBitcoinValue(currency) {
  fetch('https://blockchain.info/ticker')
    .then(response => response.json())
    .then(data => {
      updateUI(data[currency].buy, data[currency].symbol);
    })
    .catch(err => console.log(err));
}

function updateUI(value, symbol) {
  const result = document.querySelector('.result');
  result.textContent = `${currencySymbols[symbol]} ${value.toFixed(2)}`;
}

const selectForm = document.forms['select-currency-form'];
selectForm.addEventListener('submit', e => {
  e.preventDefault();
});

selectForm.addEventListener('change', () => {
  const currencySelected = document.querySelector('#select-currency').value;
  if (currencySelected !== 'default') {
    getBitcoinValue(currencySelected);
  }
});
