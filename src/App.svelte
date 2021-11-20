<script>
import PossibleWords from './components/PossibleWords.svelte';
import Hint from './components/Hint.svelte';
import Anagram from './components/Anagram.svelte';
import Stat from './components/Stat.svelte';
import { pickAnagram } from "./js/pick-anagram.js";
import { onMount } from 'svelte';
import { randomItemFromArray, initVHCalculator } from "./js/utils.js";

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
let hint = null;
let jumblesUsed = [];
let status = null;
let failure = false;
let success = false;

const missingWords = () => {
	return possibleWords.filter(word => !wordsFound.includes(word));
}

// UI
let anagramContainer;

onMount(async () => {
	initVHCalculator();

	newGame();
});

// Methods
function loadLevel() {
	level++;
	wordsFound = [];
	hint = null;
	status = level === 1 ? 'Rearrange the letters to spell words.' : null;
	failure = false;
	success = false;

	({jumble, possibleWords, key} = pickAnagram(3 + level, jumblesUsed));
	lastWord = jumble;
	jumblesUsed = [key, ...jumblesUsed]
}

function newGame() {
	level = 0;
	points = 0;
	movesLeft = 5;
	hints = 1;
	jumblesUsed = [];
	loadLevel();
}

function useHint() {
	hints--;
	const hintWord = randomItemFromArray(missingWords());
	hint = randomItemFromArray(hintWord.meanings);
	console.log(hint);
}

function onSort(e) {
  const {word} = e.detail;
	
	if(word === lastWord) return;
	lastWord = word;

	movesLeft--;

  const match = possibleWords.find(w => w.name === word);
  const wordAlreadyUsed = wordsFound.find(w => w.name === word);

	if(wordAlreadyUsed) {
		status = 'You already found this word!';
		return;
	} else if (match) {
    points++;
		movesLeft += 3;
    wordsFound = [...wordsFound, match];
		success = true;

		// TODO: This isn't working
		if(match === hint) {
			hint = null;
			status = `You found the hint: &ldquo;${word}&rdquo;`;
		} else {
			status = `You found a word: &ldquo;${word}&rdquo;`
		}
		
		if (wordsFound.length === possibleWords.length) {
			status = "You found all the words and unlocked a hint!";
			hints++;
			return;
		}

		setTimeout(() => { success = false }, 500);
		return;
  } 
	
	if (movesLeft === 0) {
		const missedWords = missingWords().map(w => `&ldquo;${w.name}&rdquo;`).join(', ');
	  status = `You lose! You missed ${missedWords}.`;
		failure = true;
		return;
  }

	status = null;
}
</script>

<main>
	<div class="top-ui">
		<div class="possible-words">
			<PossibleWords {possibleWords} {wordsFound}/>
		</div>

		<div class="level-points">
			<Stat label="Level" value={level} />
			<Stat label="Points" value={points} />
		</div>
	</div>

	<div class="hint">
		{#if hint }
			<Hint {hint} />
		{/if}
	</div>

	<div class="jumble">
		<Anagram {jumble} {success} {failure} bind:this={anagramContainer} on:sort={onSort} />
	</div>

	<div class="status">
		{#if status}
			<p>{@html status}</p>
		{/if}
	</div>

	<div class="action">
		{#if failure}
			<button
				class="button"
				on:click={newGame}
			>
				New Game
			</button>
		{:else if wordsFound.length > 0}
			<button
				class="button"
				on:click={loadLevel}
			>
				Next Level
			</button>
		{/if}
	</div>
	
	<div class="bottom-ui">
		<div class="hint-count">
			<Stat label="Hints" value={hints} />
		</div>

		{#if hints > 0}
			<button
				class="button button--small"
				on:click={useHint}
			>
				Use a Hint
			</button>
		{/if}

		<div class="moves-left">
			<Stat label="Moves" value={movesLeft} />
		</div>
	</div>
</main>

<style>
	main {
		display: grid;
		gap: 1vw;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: 
			auto
			minmax(0, 2fr) 
			minmax(0, 2fr) 
			minmax(0, 1fr) 
			minmax(0, 1fr) 
			minmax(0, 1fr);
		grid-template-areas:
			"top-ui"
			"hint"
			"jumble"
			"status"
			"action"
			"bottom-ui";
  	padding: var(--app-padding);
		width: 100%;
  	height: calc(100 * var(--vh, 1vh));
	}

	.top-ui {
		align-self: start;
		grid-area: top-ui;
		display: flex;
		justify-content: space-between;
	}

	.level-points {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.5em;
	}

	.possible-words {
		grid-area: possible-words;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.hint {
		grid-area: hint;
		display: grid;
		place-items: center;
	}

	.jumble {
		align-self: center;
		display: grid;
		place-items: center;
		grid-area: jumble;
	}
	
	.status {
		grid-area: status;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: start;
	}

	.action {
		align-self: start;
		grid-area: action;
		display: flex;
		justify-content: center;
	}

	.bottom-ui {
		align-self: end;
		grid-area: bottom-ui;
		align-self: end;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hint-count {
		grid-area: hint-count;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.moves-left {
		grid-area: moves-left;
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
	}
</style>