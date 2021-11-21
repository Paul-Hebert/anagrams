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
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat__count {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.1;
  }
</style>