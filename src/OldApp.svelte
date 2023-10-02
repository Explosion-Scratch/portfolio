<script>
  import { onMount } from "svelte";
  import Section from "./components/Section.svelte";
  import useGSAP from "./helpers/gsap";
  import { globals } from "./store";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#container .panels", {
      xPercent: -100,
      ease: "none",
      stagger: 0.5,
      scrollTrigger: {
        trigger: "#container",
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });
  });
</script>

<div id="container">
  <div class="panels">
    <div class="panel" style="background-color: red;">One</div>
    <div class="panel" style="background-color: blue;">Two</div>
    <div class="panel" style="background-color: red;">Three</div>
    <div class="panel" style="background-color: green;">Four</div>
  </div>
</div>
<div class='a'>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto tempore quos laudantium consequatur magnam saepe, autem, commodi excepturi reiciendis rerum dolores nisi ab beatae ducimus quibusdam sapiente tempora exercitationem esse!
</div>

<style>
  #container {
    height: 100vh;
    width: 100vw;
    border: 3px solid yellow;
    display: flex;
    overflow-x: hidden;
  }
  .panels {
    width: 150vw;
    display: flex;
  }
  .a {
    height: 100vh;
    width: 100vw;
    display: block;
    background: black;
    color: white;
    font-size: 3em;
  }
  .panel {
    min-width: 50vw;
    max-width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
  }
</style>
