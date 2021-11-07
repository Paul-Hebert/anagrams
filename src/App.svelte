<script>
import { onMount } from "svelte";
import { randomItemFromArray, shuffle } from "./js/utils.js";
import Sortable from 'sortablejs';
import { anagrams } from "./js/generated/anagrams.js";
const anagramKeys = Object.keys(anagrams);

// Game state
let level = 0;
let points = 0;
let movesLeft = 10;
let wordsFound = [];
let possibleWords = [];
let letters = [];
let stuck = true;

// UI references
let anagramContainer;
let sortable;

onMount(() => {
	sortable = Sortable.create(
		anagramContainer, 
		{
			onEnd: () => {
				onSort();
			}
		}
	);
	loadLevel();
});

// Methods
function loadLevel() {
	level++;
	stuck = true;
	wordsFound = [];
	movesLeft = 10;

	let jumble = randomItemFromArray(anagramKeys);
  possibleWords = anagrams[jumble];
	console.log(jumble, possibleWords);
	
	const jumbleArray = jumble.split("");

  let shuffledLetters = shuffle(jumbleArray).join("");

  while (possibleWords.includes(shuffledLetters)) {
    shuffledLetters = shuffle(jumbleArray).join("");
  }

	letters = shuffledLetters.split("");
}

function onSort() {
	console.log('onSort');
	movesLeft--;

  const word = anagramContainer.textContent.replace(/\s/g, "");
  const wordMatches = possibleWords.includes(word);
  const wordAlreadyUsed = wordsFound.includes(word);

  if (wordMatches && !wordAlreadyUsed) {
    points++;
    wordsFound = [...wordsFound, word];

		console.log(wordsFound);

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
	<div class="info">
		<div class="levels">Level <b>{level}</b></div>
		<div class="points"><b>{points}</b> Points</div>
		<div class="moves"><b>{movesLeft}</b> moves left</div>
		<div class="possible-words">
			Words found:
			<b>{wordsFound.length}</b>/<b>{possibleWords.length}</b>

			<ul>
				{#each wordsFound as word}
					<li>{word}</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="anagram-container" bind:this={anagramContainer}>
		{#each letters as letter}
			<div class="letter">
				<div class="letter-inner">
					{letter}
				</div>
			</div>
		{/each}
	</div>

	<button 
		class="js-next-level" 
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
	}

	main > * + * {
		margin-top: 1em;
	}

	.anagram-container {
		display: flex;
	}

	.letter-inner {
		background-color: #fff;
		border: 0.1em solid var(--color-background);
		cursor: grab;
		display: grid;
		font-family: sans-serif;
		font-size: 1.5em;
		font-weight: bold;
		width: var(--letter-size);
		height: var(--letter-size);
		place-items: center;
	}
</style>