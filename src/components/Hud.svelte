<script>
export let level;
export let points;
export let movesLeft;
export let wordsFound;
export let possibleWords;
</script>

<div class="hud">
  <div>
    <div class="levels">Level <b>{level}</b></div>
    <div class="points"><b>{points}</b> Points</div>
    <div class="moves"><b>{movesLeft}</b> moves left</div>
  </div>

  <div class="possible-words">
    Words found:
    <b>{wordsFound.length}</b>/<b>{possibleWords.length}</b>

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
  </div>
</div>

<style>
  .hud {
    display: flex;
    font-size: 1.5em;
    justify-content: space-between;
  }
</style>