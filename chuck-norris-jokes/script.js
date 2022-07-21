function fetchJoke() {
  const joke = document.querySelector('.joke');
  fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => {
      joke.textContent = data.value;
    })
    .catch(err => console.log(err));
}

fetchJoke();

const btn = document.querySelector('#next-btn');
btn.addEventListener('click', fetchJoke);
