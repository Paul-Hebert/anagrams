<script>
export let hint;
</script>

<div>
  <h2>Hint</h2>
  <p>
    <em>{hint.speechPart}</em>, {hint.definition}
  </p>
</div>

<style>
  div {
    text-align: center;
  }
  h2 {
    margin: 0 auto;
    display: inline-block;
    text-transform: uppercase;
    color: var(--color-subdued);
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--color-offset-dark);
    padding: 0 0.5em;
  }
  p {
    font-family: var(--font-display);
    font-size: 1.2rem;
    text-align: center;
  }
</style>