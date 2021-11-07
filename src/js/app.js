import { randomItemFromArray, shuffle } from "./utils.js";
import { anagrams } from "./generated/anagrams.js";
const anagramKeys = Object.keys(anagrams);

const container = document.querySelector(".anagram-container");
const currentLevelEl = document.querySelector(".js-current-level");
const currentMovesEl = document.querySelector(".js-current-moves");
const currentPointsEl = document.querySelector(".js-current-points");
const possibleWordsEl = document.querySelector(".js-possible-words");

const drake = dragula([container]);

const state = {
  level: 1,
  points: 0,
};

loadLevel();

function loadLevel() {
  state.movesLeft = 10;
  currentMovesEl.textContent = state.movesLeft;

  currentLevelEl.textContent = state.level;

  state.jumble = randomItemFromArray(anagramKeys);
  state.matches = anagrams[state.jumble];
  possibleWordsEl.textContent = state.matches.length;
  console.log(state.jumble, state.matches);

  const jumbleArray = state.jumble.split("");

  let shuffledLetters = shuffle(jumbleArray).join("");

  while (state.matches.includes(shuffledLetters)) {
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
}

drake.on("dragend", () => {
  state.movesLeft--;
  currentMovesEl.textContent = state.movesLeft;

  if (state.matches.includes(container.textContent.replace(/\s/g, ""))) {
    container.querySelectorAll(".letter").forEach((letter, i) => {
      letter.style.setProperty("--index", i);
    });
    container.classList.add("is-success");

    state.points++;
    currentPointsEl.textContent = state.points;

    setTimeout(() => {
      container.classList.remove("is-success");
      state.level++;
      loadLevel();
    }, 2000);
  } else if (state.movesLeft === 0) {
    alert("You lose!");
    state = {
      level: 1,
      points: 0,
    };
    loadLevel();
  }
});
