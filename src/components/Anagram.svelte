<script>
  export let jumble;

  import { onMount, createEventDispatcher } from "svelte";
  import Sortable from 'sortablejs';

  const dispatch = createEventDispatcher();

  let anagramContainer;
  let sortable;

  onMount(() => {
    sortable = Sortable.create(
      anagramContainer, 
      {
        onEnd: () => {
          dispatch('sort', {
            'word': anagramContainer.textContent.replace(/\s/g, "")
          });
        }
      }
    );
  });
</script>

<div class="anagram-container" bind:this={anagramContainer}>
  {#each jumble.split('') as letter}
    <div class="letter">
      <div class="letter-inner">
        {letter}
      </div>
    </div>
  {/each}
</div>

<style>
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