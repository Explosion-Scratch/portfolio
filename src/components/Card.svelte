<script>
  import LazyImg from "./LazyImg.svelte";
  import { fly } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";
  import Tag from "./Tag.svelte";
  import { events } from "../store";
  import { getIcon, inView } from "../utils";
  import textEffect from "../helpers/textEffect";
  import tooltip from "../helpers/tooltip";
  export let title = "";
  export let body = "";
  export let tags = [];
  export let code = "";
  export let url = "";
  export let image = "";

  const dispatch = createEventDispatcher();

  function getInfo() {
    return { title, body, tags, code, url, image };
  }

  let card;
</script>

<div
  class="card"
  bind:this="{card}"
  on:click="{() => dispatch('click', getInfo())}"
  on:keyup="{(e) =>
    (e.key === 'Enter' || e.key === 'Space') && dispatch('click', getInfo())}"
>
  <div class="top">
    <LazyImg src="{image}" />
  </div>
  <div class="meta">
    <h5 class="title" use:textEffect="{{ iterations: 1 }}">{title}</h5>
    <div class="tags">
      {#each tags as tag}
        <Tag {tag} light="{true}" />
      {/each}
    </div>
    <p class="description">
      {body}
    </p>
  </div>
  {#if !url.includes("coding_backup")}
    <div class="buttons">
      <a
        class="primary"
        href="{url}"
        use:tooltip="{url}"
        target="code_win"
        on:click="{() => events.emit('open_url', { url })}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M227.32 28.68a16 16 0 0 0-15.66-4.08h-.15L19.57 82.84a16 16 0 0 0-2.42 29.84l85.62 40.55l40.55 85.62a15.86 15.86 0 0 0 14.42 9.15q.69 0 1.38-.06a15.88 15.88 0 0 0 14-11.51l58.2-191.94v-.15a16 16 0 0 0-4-15.66Zm-69.49 203.17l-.05.14l-39.36-83.09l47.24-47.25a8 8 0 0 0-11.31-11.31l-47.25 47.24L24 98.22h.14L216 40Z"
          ></path></svg
        >
        <span class="text">View</span>
      </a>
      <a
        use:tooltip="{code}"
        href="{code}"
        target="code_win"
        class="secondary"
        on:click="{() => events.emit('open_url', { url: code })}"
      >
        {@html getIcon(code)}
        <span class="text">Code</span>
      </a>
    </div>
  {:else}
    <div class="buttons">
      <a class="primary" use:tooltip={"Code private, email me for access"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M12 17.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
          ></path><path
            fill="currentColor"
            fill-rule="evenodd"
            d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5"
            clip-rule="evenodd"
          ></path></svg
        >
        <div class="text">More info</div>
      </a>
    </div>
  {/if}
</div>

<style lang="scss" scoped>
  @import "../main.scss";
  .card {
    @include card;
    $marginBottom: 0.3;
    .top {
      border-radius: 1em;
      position: relative;
      margin: 0 1em;
      margin-top: -2em;
      height: 40em;
      margin-bottom: $marginBottom + em;
      background: linear-gradient(to right, $primaryLight, $primaryDark);
      background-clip: border;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      transition:
        margin 0.3s ease,
        margin-bottom 0.5s ease;
      display: grid;
      place-items: center;
      :global(.img) {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        $offset: -0.8em;
        opacity: 0.5;
        margin-top: $offset;
        margin-right: $offset;
        border-radius: inherit;
        transition:
          margin 0.3s ease,
          opacity 0.5s ease,
          border-color 0.8s ease;
        border: 2px solid rgba($primaryLight, 0.2);
      }
      :global(.img .img_el) {
        width: 100%;
        transform: scale(2);
        transform-origin: center;
        height: 100%;
        $bounce: ease-in-out;
        transition: transform 0.1s $bounce;
        object-fit: cover;
      }
    }
    &:hover .top :global(.img_el) {
      transform: scale(1);
    }
    .top:hover :global(.img) {
      $offset: -1.3em;
      object-fit: cover;
      opacity: 0.9;
      border-color: $primaryDark;
      margin-top: $offset;
      margin-right: $offset;
    }
    &:hover .top {
      margin-top: -1.8em;
      margin-bottom: $marginBottom + 0.3 + em;
    }
    .meta {
      padding: 0.5em 2em;
      h5 {
        display: block;
        font-size: 1.2em;
        font-weight: 550;
        color: darken($primary, 30);
      }
      .tags {
        margin-top: 0.5em;
        display: block;
      }
      .description {
        margin-top: 1em;
        font-weight: 300;
        color: rgba(darken($primary, 40), 0.7);
      }
    }
    .buttons {
      margin-top: 1em;
      padding: 2em;
      padding-top: 0;
      display: flex;
      width: 100%;
      gap: 0.3em;
      flex-direction: column;
      @include bp("lg") {
        flex-direction: row;
      }
      a {
        @include button;
        flex: 1;
      }
    }
  }
</style>
