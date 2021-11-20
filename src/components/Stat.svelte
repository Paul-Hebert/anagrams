<script>
  export let label;
  export let value;
</script>

<div class="stat">
  <div class="stat__count">
    {value}
  </div>
  <div class="stat__label">
    {label}
  </div>
</div>

<style>
  .stat {
    background-color: var(--color-subdued);
    border-radius: var(--letter-radius);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.2em;
    width: 3em;
    height: 3em;
  }

  .stat__label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat__count {
    margin-bottom: 0.2em;
    font-size: 1rem;
    font-weight: bold;
  }
</style>