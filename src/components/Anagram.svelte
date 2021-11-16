<script>
  export let jumble;
  export let success;
  export let failure;

  import { onMount, createEventDispatcher } from "svelte";
  import Sortable from 'sortablejs/modular/sortable.core.esm.js';

  const dispatch = createEventDispatcher();

  let anagramContainer;

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
</script>

<div 
  class="anagram-container {success ? 'success' : ''} {failure ? 'failure' : ''}" 
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