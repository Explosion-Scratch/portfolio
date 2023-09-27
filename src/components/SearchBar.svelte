<script>
  import { onMount } from "svelte";
  import Tag from "./Tag.svelte";
  import { strip } from "../utils";
  import Fuse from "fuse.js";
  export let projects = [];
  let totalProjects = [];
  // Mock before load
  let fuse = {
    search: () => totalProjects.map((i) => ({ item: i })),
  };
  onMount(() => {
    totalProjects = [...projects];
    fuse = new Fuse(totalProjects, {
      keys: ["title", "description", "tags"],
    });
  });
  $: tags = [
    ...new Set(
      projects
        .map((project) => project.tags)
        .join(",")
        .split(",")
    ),
  ]
    .map((i) => i.toLowerCase())
    .sort();

  let query = "";

  function handle() {
    const q = query.trim().toLowerCase();
    if (!q) {
      projects = [...totalProjects];
      return;
    }
    console.log(fuse.search("spanish"));
    projects = fuse.search(q).map((i) => i.item);
  }
</script>

<div class="input_container">
  <div class="input">
    <div class="bg"></div>
    <input
      placeholder="Type here"
      bind:value="{query}"
      on:change="{handle}"
      on:keyup="{handle}"
      on:input="{handle}"
    />
  </div>
  <div class="tags">
    {#each tags as tag}
      <Tag tag="{tag}" />
    {/each}
  </div>
</div>

<style scoped lang="scss">
  @import "../main.scss";

  $secondary: adjust-hue(lighten($primary, 20), -10);
  $background: black;
  .tags {
    overflow-x: scroll;
    white-space: nowrap;
  }
  .input_container {
    width: 80vw;
    max-width: 1080px;
    margin: 0 auto;
    margin-bottom: 7em;
  }
  .input {
    display: flex;
    position: relative;
    margin-bottom: 1em;
    height: 3em;
    $border_size: 2px;
    $radius: 0.5em;
    border-radius: $radius;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
    .bg {
      overflow: hidden;
      position: absolute;
      inset: 0;
      border-radius: $radius;
      filter: blur(4px);
      &::before,
      &::after {
        content: "";
        $light: 0;
        $tertiary: $primary;
        $quat: $secondary;
        background: conic-gradient(
          lighten($primary, $light) 25%,
          lighten($secondary, $light) 25%,
          lighten($secondary, $light) 50%,
          lighten($tertiary, $light) 50%,
          lighten($tertiary, $light) 75%,
          lighten($quat, $light) 75%
        );
        $big: 3000px;
        width: $big;
        height: $big;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: rotate 15s linear infinite;
        z-index: -1;
      }
    }
    input {
      border: none;
      background: $background;
      color: white;
      border-radius: $radius;
      inset: $border_size;
      display: block;
      position: absolute;
      padding: 1em 2em;
      font-size: 1em;
      font-weight: 200;
    }
    &:focus-within {
      transform: scale(1.1);
      box-shadow: 0 0 0 0.2em rgba(lighten($secondary, 20), 0.2),
        0 0 2em -0.1em lighten($secondary, 20);
      input {
        outline: none;
      }
      .bg {
        filter: blur(0);
      }
    }
    // &:hover .bg {&::after, &::before {animation-duration: .8s}}
  }

  @keyframes rotate {
    100% {
      transform: translate(-50%, -50%) rotate(1turn);
    }
  }
</style>
