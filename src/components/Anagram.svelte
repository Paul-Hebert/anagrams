<script>
  export let jumble;

  import { onMount, createEventDispatcher } from "svelte";
  import Sortable from 'sortablejs';

  const dispatch = createEventDispatcher();

  let anagramContainer;
  let success;

  onMount(() => {
    Sortable.create(
      anagramContainer, 
      {
        animation: 150,
        forceFallback: true,
        onEnd: () => {
          dispatch('sort', {
            'word': anagramContainer.textContent.replace(/\s/g, "")
          });
        }
      }
    );
  });

  export function showSuccess() {
    success = true;
    setTimeout(() => {
      success = false;
    }, 500);
  }
</script>

<div 
  class="anagram-container {success ? 'success' : ''}" 
  bind:this={anagramContainer}
  style="--count: {jumble.split('').length}"
>
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
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;

    --gutter: 0.1rem;
    --letter-max-size: 6rem;
    --letter-min-size: 3rem;
    --app-width: calc(100vw - var(--app-padding) * 2);
    --letter-computed-size: calc(var(--app-width) / var(--count) - var(--gutter) * 2);
    --letter-size: clamp(
      var(--letter-min-size), 
      var(--letter-computed-size), 
      var(--letter-max-size)
    );
	}

  .anagram-container.success .letter-inner {
    background:hsl(200, 100%, 90%)
  }

  .letter {
    margin: var(--gutter);
  }

	.letter-inner {
    background-color: #fff;
		display: grid;
    cursor: grab;
		place-items: center;
		font-family: sans-serif;
		font-size: 1.5em;
		font-weight: bold;
    transition-property: opacity, box-shadow, background-color;
    transition-duration: var(--animation-speed);
    transition-timing-function: ease-out;
		width: var(--letter-size);
		height: var(--letter-size);
	}

  :global(.sortable-ghost .letter-inner) {
    opacity: 0;
    cursor: grabbing;
  }

  :global(.sortable-fallback) {
    opacity: 1 !important;
  }

  :global(.sortable-fallback .letter-inner) {
    transform: scale(1.1);
    box-shadow: 0 2px 3px 1px hsla(0, 0%, 0%, 0.1);
  }
</style>