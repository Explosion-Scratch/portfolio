<script>
  import { onMount } from "svelte";
  import { icons } from "../icons";
  import { events } from "../store";
  import { strip } from "../utils";
  import AnimatedIcon from "./AnimatedIcon.svelte";
  export let count = 0;
  export let tag;
  export let iconOnly = false;
  function getIcon(tag) {
    return icons.find((i) => strip(i.id) === strip(tag));
  }
  $: exists = tag && getIcon(tag);
  onMount(() => {
    if (!exists) {
      console.log("Non existant tag", { tag });
    }
  });

  export let light = false;
</script>

{#if exists}
  {#if iconOnly}
    <div class="_tag">
      <AnimatedIcon>
        {@html getIcon(tag)?.html}
      </AnimatedIcon>
    </div>
  {:else}
    <span
      class="tag pointer"
      class:light="{light}"
      on:click|stopPropagation="{() => events.emit('tag', tag)}"
    >
      <span class="icon">
        <AnimatedIcon>
          {@html getIcon(tag)?.html}
        </AnimatedIcon>
      </span>
      <span class="icon_text"
        >{tag[0].toUpperCase() + tag.slice(1)}{count > 0
          ? ` (${count})`
          : ""}</span
      >
    </span>
  {/if}
{/if}

<style lang="scss" scoped>
  @import "../main.scss";
  .tag {
    cursor: pointer;
    display: inline-flex;
    margin: 3px;
    justify-content: center;
    align-items: center;
    background: rgba(lighten($primary, 30), 0.3);
    border-radius: 0.3em;
    padding: 0.3em 0.5em;
    gap: 0.3em;
    width: fit-content;
    color: lighten(adjust-hue($primary, -20), 30);
    font-size: 0.8em;
    .icon {
      display: grid;
      place-items: center;
      $size: 1.4em;
      &,
      & :global(svg) {
        height: $size;
        width: $size;
      }
    }
    &:hover {
      background: rgba(lighten($primary, 30), 0.4);
    }
  }
  :global(.tag.light) {
    color: darken(adjust-hue($primary, -20), 10) !important;
    background: rgba($primary, 0.2);
    &:hover {
      background: rgba($primary, 0.3);
    }
  }
</style>
