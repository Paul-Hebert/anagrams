<script>
  export let possibleWords;
  export let wordsFound;
</script>

<p>
  Words found:
  <b>{wordsFound.length}</b>/<b>{possibleWords.length}</b>
</p>

<ul class="possible-words">
  {#each possibleWords as word}
    <li class="possible-word {wordsFound.includes(word) ? 'found' : ''}">
      {#each word.name.split("") as letter}
        <span class="letter">
          <span class="letter-inner">{letter}</span>
        </span>
      {/each}
    </li>
  {/each}
</ul>