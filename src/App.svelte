<script>
import Hud from './components/Hud.svelte';
import Hint from './components/Hint.svelte';
import Anagram from './components/Anagram.svelte';
import { pickAnagram } from "./js/pick-anagram.js";
import { randomItemFromArray } from "./js/utils.js";

// Game state
let level = 0;
let points = 0;
let movesLeft = 0;
let hints = 0;
let wordsFound = [];
let possibleWords = [];
let jumble = '';
let key = '';
let lastWord = '';
let hintWord = null;
let wordsUsed = [];

const missingWords = () => {
	return possibleWords.filter(word => !wordsFound.includes(word));
}

// UI
let anagramContainer;

newGame();

// Methods
function loadLevel() {
	level++;
	wordsFound = [];
	hintWord = null;

	({jumble, possibleWords, key} = pickAnagram(3 + level, wordsUsed));
	lastWord = jumble;
	wordsUsed = [key, ...wordsUsed]
}

function newGame() {
	level = 0;
	points = 0;
	movesLeft = 5;
	hints = 1;
	wordsUsed = [];
	loadLevel();
}

function useHint() {
	hints--;
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
		movesLeft += 3;
    wordsFound = [...wordsFound, match];
		anagramContainer.showSuccess();

		if(match === hintWord) {
			hintWord = null;
		}
		
		if (wordsFound.length === possibleWords.length) {
			alert("You found all the words! Next level!");
			hints++;
			loadLevel();
			return;
		}
  } 
	
	if (movesLeft === 0) {
		const missedWords = missingWords().map(w => w.name).join(', ');
		alert("You lose! You missed " + missedWords);
		newGame();
  }
}
</script>

<main>
<Hud {level} {points} {possibleWords} {wordsFound} {movesLeft} {hints}/>

	<div class="hint-wrapper">
		{#if hintWord }
			<Hint meanings={hintWord.meanings} />
		{/if}
	</div>

	<Anagram {jumble} bind:this={anagramContainer} on:sort={onSort} />

	<div class="button-wrapper">
		{#if hints > 0}
			<button
				class="button"
				on:click={useHint}
			>
				Show Hint
			</button>
		{/if}
		
		{#if wordsFound.length > 0}
			<button
				class="button"
				on:click={loadLevel}
			>
				Next Level
			</button>
		{/if}
	</div>
</main>
