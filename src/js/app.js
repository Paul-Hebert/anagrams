import { randomItemFromArray, shuffle } from "./utils.js";
import { anagrams } from "./generated/anagrams.js";
const anagramKeys = Object.keys(anagrams);

const containerEl = document.querySelector(".anagram-container");
const nextLevelButtonEl = document.querySelector(".js-next-level");
const currentLevelEl = document.querySelector(".js-current-level");
const currentMovesEl = document.querySelector(".js-current-moves");
const currentPointsEl = document.querySelector(".js-current-points");
const wordsFoundEl = document.querySelector(".js-found-words");
const wordsFoundCountEl = document.querySelector(".js-found-words-count");
const possibleWordsEl = document.querySelector(".js-possible-words");

const drake = dragula([containerEl]);

const state = {
  level: 0,
  points: 0,
};

loadLevel();

nextLevelButtonEl.addEventListener("click", loadLevel);

function loadLevel() {
  state.level++;
  state.movesLeft = 10;
  state.wordsFound = [];
  currentLevelEl.textContent = state.level;
  currentMovesEl.textContent = state.movesLeft;
  wordsFoundEl.textContent = "";
  wordsFoundCountEl.textContent = state.wordsFound.length;
  currentPointsEl.textContent = state.points;

  nextLevelButtonEl.setAttribute("hidden", "");

  state.jumble = randomItemFromArray(anagramKeys);
  state.matches = anagrams[state.jumble];
  state.possibleWords = state.matches.length;
  possibleWordsEl.textContent = state.possibleWords;

  console.log(state.jumble, state.matches);

  const jumbleArray = state.jumble.split("");

  let shuffledLetters = shuffle(jumbleArray).join("");

  while (state.matches.includes(shuffledLetters)) {
    shuffledLetters = shuffle(jumbleArray).join("");
  }

  containerEl.innerHTML = shuffledLetters
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

  const word = containerEl.textContent.replace(/\s/g, "");
  const wordMatches = state.matches.includes(word);
  const wordAlreadyUsed = state.wordsFound.includes(word);

  if (wordMatches && !wordAlreadyUsed) {
    containerEl.querySelectorAll(".letter").forEach((letter, i) => {
      letter.style.setProperty("--index", i);
    });
    containerEl.classList.add("is-success");

    state.points++;
    state.wordsFound.push(word);
    currentPointsEl.textContent = state.points;
    wordsFoundEl.textContent = state.wordsFound.join(", ");
    wordsFoundCountEl.textContent = state.wordsFound.length;

    nextLevelButtonEl.removeAttribute("hidden");

    setTimeout(() => {
      containerEl.classList.remove("is-success");
      state.level++;

      if (state.wordsFound.length === state.possibleWords) {
        loadLevel();
      }
    }, 2000);
  } else if (state.movesLeft === 0) {
    alert("You lose!");
    state.level = 0;
    state.points = 0;
    loadLevel();
  }
});
