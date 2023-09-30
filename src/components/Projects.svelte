<script>
  import Section from "./Section.svelte";
  import _projects from "../projects.json";
  import SearchBar from "./SearchBar.svelte";
  import Card from "./Card.svelte";
  import { events, globals } from "../store";
  import { onMount } from "svelte";
  import { hash } from "../utils";

  let projects = [..._projects];

  let elements = {
    projects_container: null,
  };
</script>

<Section>
  <SearchBar bind:projects="{projects}" />
  <div class="projects" bind:this="{elements.projects_container}">
    {#each projects as project (hash(JSON.stringify(project)))}
      <Card
        title="{project.title}"
        body="{project.description}"
        image="{project.image}"
        url="{project.link}"
        code="{project.code_link}"
        tags="{(project.tags || '').split(',')}"
        on:click="{(e) => events.emit('project', e.detail)}"
      />
    {/each}
  </div>
</Section>

<style scoped="" lang="scss">
  .projects {
    display: grid;
    width: 80vw;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    $height: 550px;
    max-width: 1080px;
    margin: 0 auto;
    grid-template-rows: $height;
    gap: 6em 3em;
    :global(.card) {
      height: $height;
    }
  }
</style>
