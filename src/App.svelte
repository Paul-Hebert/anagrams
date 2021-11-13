<script>
import Hud from './components/Hud.svelte';
import Hint from './components/Hint.svelte';
import Anagram from './components/Anagram.svelte';
import { pickAnagram } from "./js/pick-anagram.js";
import { randomItemFromArray } from "./js/utils.js";

// Game state
let level = 0;
let points = 0;
let movesLeft = 10;
let wordsFound = [];
let possibleWords = [];
let jumble = '';
let lastWord = '';
let hintWord = null;

const missingWords = () => {
	return possibleWords.filter(word => !wordsFound.includes(word));
}

// UI
let anagramContainer;

loadLevel();

// Methods
function loadLevel() {
	level++;
	wordsFound = [];
	movesLeft = 10;
	hintWord = null;

	({jumble, possibleWords} = pickAnagram(3 + level));
	lastWord = jumble;
}

function showHint() {
	hintWord = randomItemFromArray(missingWords())
}

function onSort(e) {
  const {word} = e.detail;
	
	if(word === lastWord) return;
	lastWord = word;

	movesLeft--;

  const match = possibleWords.find(w => w.name === word);
  const wordAlreadyUsed = wordsFound.find(w => w.name === word);

  if (match && !wordAlreadyUsed) {
    points++;
    wordsFound = [...wordsFound, match];
		anagramContainer.showSuccess();

		if(match === hintWord) {
			hintWord = null;
		}
		
		if (wordsFound.length === possibleWords.length) {
			alert("You found all the words! Next level!")
			loadLevel();
			return;
		}
  } 
	
	if (movesLeft === 0) {
		if(wordsFound.length === 0) {
			const missedWords = missingWords().map(w => w.name).join(', ');
			alert("You lose! You missed " + missedWords);
			level = 0;
			points = 0;
			loadLevel();
			return;
		}

		alert("You ran out of moves but found words. Next level!")
		loadLevel();
  }
}
</script>

<main>
	<Hud {level} {points} {possibleWords} {wordsFound} {movesLeft} />

	<div class="hint-wrapper">
		{#if hintWord }
			<Hint meanings={hintWord.meanings} />
		{/if}
	</div>

	<Anagram {jumble} bind:this={anagramContainer} on:sort={onSort} />

	<div class="button-wrapper">
		{#if wordsFound.length > 0}
			<button
				class="button"
				on:click={loadLevel}
			>
				Next Level
			</button>
		{:else if !hintWord}
			<button
				class="button"
				on:click={showHint}
			>
				Show Hint
			</button>
		{/if}
	</div>
</main>
