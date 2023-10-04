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
    display: flex;
    width: calc(100vw - 40px);
    flex-wrap: wrap;
    $height: 550px;
    max-width: 1080px;
    margin: 0 auto;
    justify-content: center;
    border: 1px solid red;
    gap: 5em 2em;
    :global(.card) {
      height: $height;
      min-width: 300px;
      width: 25vw;
      max-width: 350px;
    }
  }
</style>
