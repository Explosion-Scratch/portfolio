<script>
  import GridSection from "./GridSection.svelte";
  import Cards from "./Cards.svelte";
  import projects from "../projects.json";
  import Card from "./Card.svelte";
</script>

<GridSection>
  <div class="container">
    <div class="grid">
      {#each projects as project}
        <Card title="{project.title}" />
      {/each}
    </div>
  </div>
</GridSection>

<style scoped lang="scss">
  .container {
    padding: 1rem;
    width: 80vw;
    margin: 0 auto;
  }
  .grid {
    display: grid;
justify-content: center;
align-items: center;
flex-direction: column;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
  }
</style>
