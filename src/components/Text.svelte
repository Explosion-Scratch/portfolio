<script>
  import { onMount } from "svelte";
  import { globals } from "../store";
  let el = null;
  export let text = "";
  onMount(async () => {
    setInterval(() => {
      if (el) {
        text = el.innerText;
      }
    }, 100);
    await globals.ready;
    // globals.timeline.fromTo(
    //   el,
    //   {
    //     y: 40,
    //     opacity: 0,
    //     scaleY: 0.8,
    //     "clip-path": "polygon(30% 100%, 70% 100%, 100% 100%, 0% 100%)",
    //   },
    //   {
    //     scaleY: 1,
    //     "clip-path": `polygon(1% 1%, 99% 1%, 100% 100%, 0% 100%)`,
    //     y: 0,
    //     opacity: 1,
    //   }
    // );
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: el,
    //     start: "top center",
    //     end: "bottom center",
    //     scrub: true,
    //   }
    // });
    // tl.to(el, {
    //   x: 800,
    // });
  });
</script>

<h1 {...$$props} class="glitch" data-text="{text}" bind:this="{el}">
  <slot />
</h1>

<style scoped lang="scss">
  @import "../main.scss";
  // Important that this background color remains consistent with the background of the page

  $primaryColor: #fff;
  $secondaryColor: #000;
  $steps: 20;
  $accent1: blue;
  $accent2: red;
  :global(.glitch, .glitch *) {
    font-family: $monospace_font !important;
  }
  .glitch {
    position: relative;
    margin: 0 auto;
    color: $primaryColor;
    font-size: clamp(3rem, 10.7vw - 1.7rem, 5rem);
    white-space: nowrap;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.01em;
    transform: scale3d(1, 1, 1);

    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      background: $secondaryColor;
      color: $primaryColor;
      clip: rect(0, 900px, 0, 0);
    }

    &::before {
      left: 7px;
      text-shadow: 1px 0 $accent1;
      animation: glitch-effect 3s infinite linear alternate-reverse;
    }

    &::after {
      left: 3px;
      text-shadow: -1px 0 $accent2;
      animation: glitch-effect 2s infinite linear alternate-reverse;
    }
  }

  @keyframes glitch-effect {
    @for $i from 0 through $steps {
      #{percentage($i*calc(1/$steps))} {
        clip: rect(random(100) + px, 9999px, random(100) + px, 0);
      }
    }
  }
</style>
