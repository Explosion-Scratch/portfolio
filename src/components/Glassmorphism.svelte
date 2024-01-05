<script>
  import {createEventDispatcher }from "svelte";
  const dispatch = createEventDispatcher();
</script>
<div class="glassmorphism_container" on:click="{() => dispatch('click')}">
  <div {...$$props} data-glassmorphism light={$$props.light || undefined}>
    <slot />
  </div>
</div>

<style lang="scss">
  @import "../main.scss";
  .glassmorphism_container > div {
    @include dark-glassmorphism;
  }
  .glassmorphism_container > :global(div[light]) {
    @include glassmorphism;
  }
</style>
