<script>
  import Card from "./Card.svelte";
  export let cards = [];
</script>

<div class="container">
  {#each cards as card}
    <Card {...card} />
  {/each}
</div>

<style lang="scss">
  .container {
    display: flex;
  }
</style>
