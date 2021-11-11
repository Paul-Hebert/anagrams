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
let lastWord = '';

// UI
let anagramContainer;

loadLevel();

// Methods
function loadLevel() {
	level++;
	wordsFound = [];
	movesLeft = 10;

	({jumble, possibleWords} = pickAnagram(3 + level));
	lastWord = jumble;
}

function onSort(e) {
  const {word} = e.detail;
	
	if(word === lastWord) return;
	lastWord = word;

	movesLeft--;
  const wordMatches = possibleWords.includes(word);
  const wordAlreadyUsed = wordsFound.includes(word);

  if (wordMatches && !wordAlreadyUsed) {
    points++;
    wordsFound = [...wordsFound, word];
		anagramContainer.showSuccess();
		
		if (wordsFound.length === possibleWords.length) {
			alert("You found all the words! Next level!")
			loadLevel();
			return;
		}
  } 
	
	if (movesLeft === 0) {
		if(wordsFound.length === 0) {
			alert("You lose! You missed " + possibleWords.filter(w => !wordsFound.includes(w)).join(', '));
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

	<Anagram {jumble} bind:this={anagramContainer} on:sort={onSort} />

	<div class="button-wrapper">
		<button
			class="button"
			hidden={wordsFound.length === 0}
			on:click={loadLevel}
		>
			Next Level
		</button>
	</div>
</main>
