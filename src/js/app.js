import { words } from "./words.js";

const container = document.querySelector(".anagram-container");
const reloadButton = document.querySelector(".reload");

const drake = dragula([container]);

load();

reloadButton.addEventListener("click", load);

function load() {
  const word = randomItemFromArray(words);
  console.log(word);
  const wordArray = word.split("");

  let shuffledLetters = shuffle(wordArray);

  // TODO: infinite loop if there's only one way to sort the letters
  // (e.g. only one letter)
  // while (shuffledLetters === wordArray) {
  //   console.log("whoops, resorting");
  //   shuffledLetters = shuffle(wordArray);
  // }

  container.innerHTML = shuffledLetters
    .map((letter) => `<span class="letter">${letter}</span>`)
    .join("");

  drake.on("dragend", () => {
    if (container.textContent === word) {
      alert("You win!");

      load();
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
