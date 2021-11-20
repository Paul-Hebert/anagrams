<script>
import PossibleWords from './components/PossibleWords.svelte';
import Hint from './components/Hint.svelte';
import Anagram from './components/Anagram.svelte';
import Stat from './components/Stat.svelte';
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

newGame();

// Methods
function loadLevel() {
	level++;
	wordsFound = [];
	hint = null;
	status = null;
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
			status = `You found the hint: ${word}`;
		} else {
			status = `You found a word: ${word}`
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
		<div class="level-points">
			<Stat label="Level" value={level} />
			<Stat label="Points" value={points} />
		</div>

		<div class="possible-words">
			<PossibleWords {possibleWords} {wordsFound}/>
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
				class="button button--inline"
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
		grid-template-rows: 1fr 1fr var(--letter-size) 1fr 1fr;
		grid-template-areas:
			"top-ui"
			"hint"
			"jumble"
			"status"
			"action"
			"bottom-ui";
		width: 100%;
		height: 100%;
	}

	.top-ui {
		grid-area: top-ui;
		display: flex;
		justify-content: space-between;
	}

	.level-points {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		gap: 0.5em;
	}

	.hint {
		grid-area: hint;
		display: grid;
		place-items: center;
	}

	.possible-words {
		grid-area: possible-words;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.jumble {
		display: grid;
		place-items: center;
		grid-area: jumble;
	}

	.bottom-ui {
		grid-area: bottom-ui;
		align-self: end;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.action {
		grid-area: action;
		display: flex;
		justify-content: center;
		align-items: start;
	}
	.status {
		grid-area: status;
		display: flex;
		justify-content: center;
		align-items: start;
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