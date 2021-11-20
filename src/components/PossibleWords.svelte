<script>
  export let possibleWords;
  export let wordsFound;
</script>

<p>
  Words found:
</p>

<ol>
  {#each possibleWords as word}
    <li class="possible-word {wordsFound.includes(word) ? 'found' : ''}">
      {#each word.name.split("") as letter}
        <span class="letter">
          <span class="letter-inner">{letter}</span>
        </span>
      {/each}
    </li>
  {/each}
</ol>

<style>
  .possible-word {
    display: flex;
    --letter-size: 1.5rem;
    --gutter: 0.1rem;
  }

  .possible-word .letter {
    background-color: var(--color-offset);
  }

  .possible-word .letter-inner {
    opacity: 0;
    transition-property: opacity;
    background-color: var(--color-accent);
    font-weight: 400;
    font-size: 1em;
    color: var(--color-white);
    visibility: hidden;
  }

  .possible-word.found .letter-inner {
    opacity: 1;
    visibility: visible;
  }

  .possible-word + .possible-word {
    margin-top: 0.2em;
  }
</style>