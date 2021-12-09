<div class="glassmorphism_container">
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
