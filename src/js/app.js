import { words } from "./words.js";

const container = document.querySelector(".anagram-container");

init();

function init() {
  const word = randomItemFromArray(words);
  console.log(word);
  const wordArray = word.split("");
  console.log(wordArray);

  let shuffledLetters = shuffle(wordArray);

  // TODO: infinite loop if there's only one way to sort the letters
  // (e.g. only one letter)
  // while (shuffledLetters === wordArray) {
  //   console.log("whoops, resorting");
  //   shuffledLetters = shuffle(wordArray);
  // }

  console.log(shuffledLetters);

  container.innerHTML = shuffledLetters
    .map((letter) => `<span class="letter">${letter}</span>`)
    .join("");

  const drake = dragula([container]);

  drake.on("dragend", () => {
    console.log(container.textContent);

    if (container.textContent === word) {
      alert("You win!");
    }
  });
}

function randomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
