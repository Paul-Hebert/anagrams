<script>
export let level;
export let points;
export let movesLeft;
export let wordsFound;
export let possibleWords;
</script>

<div class="info">
  <div class="levels">Level <b>{level}</b></div>
  <div class="points"><b>{points}</b> Points</div>
  <div class="moves"><b>{movesLeft}</b> moves left</div>
  <div class="possible-words">
    Words found:
    <b>{wordsFound.length}</b>/<b>{possibleWords.length}</b>

    <ul>
      {#each wordsFound as word}
        <li>{word}</li>
      {/each}
    </ul>
  </div>
</div>