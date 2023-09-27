<script>
  import { onDestroy, onMount } from "svelte";
  import Tag from "./Tag.svelte";
  import { strip } from "../utils";
  import Fuse from "fuse.js";
  export let projects = [];
  let totalProjects = [];
  // Mock before load
  let fuse = {
    search: () => totalProjects.map((i) => ({ item: i })),
  };
  let placeholderInt;
  let placeholder = "Search";
  onMount(() => {
    totalProjects = [...projects];
    let placeholders = totalProjects.map((i) => `Search for "${i.title}""`);
    fuse = new Fuse(totalProjects, {
      keys: ["title", "description", "tags"],
    });
    placeholderInt = setInterval(() => {
      placeholder =
        placeholders[Math.floor(Math.random() * placeholders.length)];
    }, 1000);
  });
  onDestroy(() => {
    clearInterval(placeholderInt);
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

  let tagsExpanded = false;
  let inputFocused = false;
</script>

<div class="input_container">
  <div class="input">
    <div class="bg"></div>
    <input
      on:focus="{() => (inputFocused = true)}"
      on:blur="{() => (inputFocused = false)}"
      placeholder="{inputFocused ? placeholder : 'Search...'}"
      bind:value="{query}"
      on:change="{handle}"
      on:keyup="{handle}"
      on:input="{handle}"
    />
  </div>
  <div class="tags_container" class:expanded="{tagsExpanded}">
    <div class="tags" class:expanded="{tagsExpanded}">
      {#each tags as tag}
        <Tag tag="{tag}" />
      {/each}
    </div>
    <button
      class="icon pointer chevron"
      on:click="{() => (tagsExpanded = !tagsExpanded)}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
        ></path></svg
      >
      {tagsExpanded ? "Collapse" : "Expand"}
    </button>
  </div>
</div>

<style scoped lang="scss">
  @import "../main.scss";

  $secondary: adjust-hue(lighten($primary, 20), -10);
  $background: black;
  .icon {
    cursor: pointer;
    color: white;
    opacity: 0.6;
    font-size: 0;
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.4s ease;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      transform: scale(0.95);
    }
    svg {
      transition: transform 0.5s ease;
    }
    background: transparent;
  }
  .tags_container {
    display: flex;
    &.expanded {
      flex-direction: column;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1em;
        margin-top: 0.5em;
        border: 2px dashed rgba($primary, 0.5);
        color: rgba(lighten($primary, 45), 0.8);
        svg {
          transform: rotate(180deg);
        }
        &:hover {
          border-style: solid;
          border-radius: 0.3em;
        }
      }
    }
  }
  .tags:not(.expanded) {
    overflow-x: scroll;
    white-space: nowrap;
    $mask: linear-gradient(to right, black 80%, transparent);
    -webkit-mask-image: $mask;
    mask-image: $mask;
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
