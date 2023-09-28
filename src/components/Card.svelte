<script>
  import LazyImg from "./LazyImg.svelte";
  import { icons } from "../icons";
  import gsap from '../helpers/gsap';
  import { createEventDispatcher, onMount } from "svelte";
  import Tag from "./Tag.svelte";
  import { events } from "../store";
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
</script>

<div
  class="card"
  use:gsap="{{
    from: { opacity: 0 },
    to: { opacity: 1 },
  }}"
  on:click="{() => dispatch('click', getInfo())}"
  on:keyup="{(e) =>
    (e.key === 'Enter' || e.key === 'Space') && dispatch('click', getInfo())}"
>
  <div class="top">
    <LazyImg src="{image}" />
  </div>
  <div class="meta">
    <h5 class="title">{title}</h5>
    <div class="tags">
      {#each tags as tag}
        <Tag tag="{tag}" light="{true}" />
      {/each}
    </div>
    <p class="description">
      {body}
    </p>
  </div>
  <div class="buttons">
    <button class="primary" on:click="{() => events.emit('open_url', { url })}"
      >View</button
    >
    <button
      class="secondary"
      on:click="{() => events.emit('open_url', { url: code })}">Code</button
    >
  </div>
</div>

<style lang="scss" scoped>
  @import "../main.scss";
  .card {
    &::before {
      content: "";
      position: absolute;
      inset: -4px;
      border-radius: 0.5rem;
      opacity: 0.2;
      $c: lighten($primary, 20);
      background: linear-gradient(45deg, $c, adjust-hue($c, 30));
      transition: inset 0.3s ease, opacity 0.8s ease;
      display: block;
      padding: 20px;
      z-index: -10;
    }
    &:hover::before {
      inset: -6px;
      opacity: 0.7;
      border-radius: 0.3rem;
    }
    &,
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    font-family: $font;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background: white;
    background-clip: border;
    color: $gray;
    $shadow_color: adjust-hue($primary, -30);
    $size: 10;
    box-shadow: 3px 4px calc($size * 2) + px calc(0 - ($size / 4)) + px
      $shadow_color;
    &:hover {
      $shadow_color: lighten($primary, 20);
      $size: 30;
      box-shadow: 3px 4px calc($size * 2) + px calc(0 - ($size / 4)) + px
        $shadow_color;
    }
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
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      transition: margin 0.3s ease, margin-bottom 0.5s ease;
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
        transition: margin 0.3s ease, opacity 0.5s ease, border-color 0.8s ease;
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
      button {
        @include button;
      }
    }
  }
</style>
