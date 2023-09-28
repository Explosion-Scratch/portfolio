<script>
  import { onMount } from "svelte";
  let container;
  onMount(() => {
    for (const path of container.querySelectorAll("path")) {
      path.setAttribute("pathLength", 1);
      // continue;
      //    let len = path.getTotalLength();
      //    const style = getComputedStyle(path);
      //    if (style.strokeLinecap !== "butt") {
      //      len += parseInt(style.strokeWidth);
      //    }
      //    path.closest('svg').style.setProperty("--length", len + 'px');
      //    console.log(path, len);
    }
  });
</script>

<span class="animated_icon" bind:this="{container}">
  <slot />
</span>

<style>
  .animated_icon :global(path) {
    --offset: 1;
    transition: stroke-dashoffset 2s ease;
    fill: currentColor;
    stroke: currentColor;
    stroke-dasharray: var(--offset);
    stroke-dashoffset: 0;
    stroke-width: 0;
  }
  .animated_icon:hover :global(path) {
    animation: animate 1s ease-in forwards;
  }
  :global(.hover) .animated_icon :global(path) {
    animation: animate 1s ease-in forwards;
  }
  @keyframes animate {
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
