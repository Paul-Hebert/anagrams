<script>
import PossibleWords from './components/PossibleWords.svelte';
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
		const missedWords = missingWords().map(w => w.name).join(', ');
	  status = `You lose! You missed ${missedWords}`;
		failure = true;
		return;
  }

	status = null;
}
</script>

<main>
	<div class="level-points">
		<div>Level <b>{level}</b></div>
		<div><b>{points}</b> Points</div>
	</div>

	<div class="possible-words">
		<PossibleWords {possibleWords} {wordsFound}/>
	</div>

	<div class="hint">
		{#if hint }
			<Hint {hint} />
		{/if}
	</div>

	<div class="anagram">
		<Anagram {jumble} {success} {failure} bind:this={anagramContainer} on:sort={onSort} />
	</div>

	<div class="status">
		{#if status}
			<p>{status}</p>
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
	
	<div class="hint-count">
		{#if hints > 0}
			<button
				class="button button--inline"
				on:click={useHint}
			>
				Use Hint
			</button>
		{/if}
		<p><b>{hints}</b> hints available</p>
	</div>

	<div class="moves-left">
		<p><b>{movesLeft}</b> moves left</p>
	</div>
</main>

<style>
	main {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr var(--letter-size) 1fr 1fr;
		grid-template-areas:
			"level-points  possible-words"
			"hint          hint"
			"anagram       anagram"
			"status        status"
			"action        action"
			"hint-count    moves-left";
		width: 100%;
		height: 100%;
	}

	.level-points {
		grid-area: level-points;
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

	.anagram {
		display: grid;
		place-items: center;
		grid-area: anagram;
	}

	.hint-count {
		grid-area: hint-count;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
	}

	.status {
		grid-area: status;
		display: flex;
		justify-content: center;
		align-items: start;
	}

	.action {
		grid-area: action;
		display: flex;
		justify-content: center;
		align-items: start;
	}

	.moves-left {
		grid-area: moves-left;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
	}
</style>