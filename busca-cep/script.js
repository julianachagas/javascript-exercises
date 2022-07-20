function validateCEP(cep) {
  const regexCEP = /^[\d]{5}\-?[\d]{3}$/;
  return regexCEP.test(cep);
}

async function getAddress(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

const showResult = data => {
  const { logradouro, bairro, localidade, uf, cep } = data;
  document.querySelector('.result').classList.add('show');
  const result = document.querySelector('.result tbody');
  result.innerHTML = `<tr>
  <td data-th="Logradouro">${logradouro}</td>
  <td data-th="Bairro">${bairro}</td>
  <td data-th="Cidade/UF">${localidade}/${uf}</td>
  <td data-th="CEP">${cep}</td>
</tr>`;
};

const form = document.forms['cep-form'];
form.addEventListener('submit', e => {
  e.preventDefault();
  const cep = document.querySelector('#cep').value.trim();
  if (validateCEP(cep)) {
    getAddress(cep)
      .then(data => showResult(data))
      .catch(err => console.log(err));
    e.target.reset();
  } else {
    alert('Por favor insira um CEP válido!');
  }
});
