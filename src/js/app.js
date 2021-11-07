import { words } from "./words.js";

const container = document.querySelector(".anagram-container");
const reloadButton = document.querySelector(".reload");

const drake = dragula([container]);

load();

reloadButton.addEventListener("click", load);

function load() {
  const word = randomItemFromArray(words);
  const sortedWord = word.split("").sort().join("");
  const matches = words.filter((match) => {
    if (match.length !== word.length) {
      return false;
    }

    const sortedMatch = match.split("").sort().join("");

    return sortedWord === sortedMatch;
  });

  const wordArray = word.split("");

  let shuffledLetters = shuffle(wordArray);

  // TODO: Confirm the shuffled letters don't match one of the matches

  container.innerHTML = shuffledLetters
    .map(
      (letter, i) => /* html */ `
        <span class="letter">
          <span class="letter-inner">${letter}</span>
        </span>
      `
    )
    .join("");

  drake.on("dragend", () => {
    if (matches.includes(container.textContent.replace(/\s/g, ""))) {
      container.querySelectorAll(".letter").forEach((letter, i) => {
        letter.style.setProperty("--index", i);
      });
      container.classList.add("is-success");

      setTimeout(() => {
        container.classList.remove("is-success");
        load();
      }, 2000);
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
