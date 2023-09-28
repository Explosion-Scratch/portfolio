<script>
  import { onMount } from "svelte";

  let container;
  onMount(() => {
    for (const svg of container.querySelectorAll("svg")) {
      svg.style.setProperty(
        "--offset",
        svg.querySelector("path").getTotalLength()
      );
    }
  });
</script>

<span class="animated_icon" bind:this="{container}">
  <slot />
</span>

<style scoped="" lang="scss">
  .animated_icon {
    transition: stroke-dashoffset 1s ease;
    stroke-dasharray: var(--offset);
    stroke-dashoffset: 0;
    stroke-width: 0;
  }
  .animated_icon:hover :global(path) {
    animation: icon_animation 1s ease-in forwards;
  }
  @keyframes icon_animation {
    0% {
      stroke-dashoffset: var(--offset);
    }
    10% {
      fill: transparent;
      stroke-width: 1;
    }
    70% {
      stroke-dashoffset: 0;
      fill: transparent;
      stroke-width: 1;
    }
    100% {
      stroke-dashoffset: 0;
      fill: currentColor;
      stroke-width: 0;
    }
  }
</style>
