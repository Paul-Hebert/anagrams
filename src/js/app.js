import { anagrams } from "./generated/anagrams.js";

const anagramKeys = Object.keys(anagrams);

const container = document.querySelector(".anagram-container");
const reloadButton = document.querySelector(".reload");

const drake = dragula([container]);

load();

function load() {
  const jumble = randomItemFromArray(anagramKeys);
  const matches = anagrams[jumble];
  console.log(jumble, matches);

  const jumbleArray = jumble.split("");

  let shuffledLetters = shuffle(jumbleArray).join("");

  while (matches.includes(shuffledLetters)) {
    shuffledLetters = shuffle(jumbleArray).join("");
  }

  container.innerHTML = shuffledLetters
    .split("")
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
