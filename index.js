const jokeDiv = document.querySelector('#joke-div');
const rateBtn = document.querySelector('#rate-btn');
const rateInput = document.querySelector('#rate-input');
const bestText = document.querySelector("#best > span");

// { text: '....', rating: 0 }
const jokes = [];

function displayRandomJoke() {
  if (jokes.length > 0) {
    if (rateInput.value.length > 0) {
      const rating = Number(rateInput.value); // trick
      jokes[jokes.length - 1].rating = rating;
      rateInput.value = "";
    }
  }

  console.log(JSON.stringify(jokes, null, 2));

  // get maximum of the array by rating
  // ???????????????????????
  // [ { text: '', rating: num }, {...}, {...} ]
  let max = 0;
  let text = '';
  for (let i = 0; i < jokes.length; i++) {
    const current = jokes[i].rating;

    if (current > max) {
      max = current;
      text = jokes[i].text;
    }
  }

  bestText.innerText = text;

  fetch('https://api.chucknorris.io/jokes/random')
    .then((res) => res.json())
    .then((res) => {
      jokeDiv.innerText = res.value;
      jokes.push({ text: res.value, rating: 0 });
    })
}

displayRandomJoke();

rateBtn.onclick = displayRandomJoke;

