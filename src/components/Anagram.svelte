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