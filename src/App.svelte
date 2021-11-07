<script>
import Hud from './components/Hud.svelte';
import Anagram from './components/Anagram.svelte';
import { pickAnagram } from "./js/pick-anagram.js";

// Game state
let level = 0;
let points = 0;
let movesLeft = 10;
let wordsFound = [];
let possibleWords = [];
let jumble = '';
let stuck = true;

loadLevel();

// Methods
function loadLevel() {
	level++;
	stuck = true;
	wordsFound = [];
	movesLeft = 10;

	({jumble, possibleWords} = pickAnagram());
}

function onSort(e) {
	movesLeft--;

  const {word} = e.detail;
  const wordMatches = possibleWords.includes(word);
  const wordAlreadyUsed = wordsFound.includes(word);

  if (wordMatches && !wordAlreadyUsed) {
    points++;
    wordsFound = [...wordsFound, word];

    stuck = false;

		if (wordsFound.length === possibleWords.length) {
			loadLevel();
		}
  } else if (movesLeft === 0) {
    alert("You lose!");
    level = 0;
    points = 0;
    loadLevel();
  }
}
</script>

<main>
	<Hud {level} {points} {possibleWords} {wordsFound} {movesLeft} />

	<Anagram {jumble} on:sort={onSort} />

	<button
		hidden={stuck}
		on:click={loadLevel}
	>
		Next Level
	</button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>