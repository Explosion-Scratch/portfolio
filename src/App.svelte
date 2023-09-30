<script>
  // Components
  import Glitch from "./components/Text.svelte";
  import { typing } from "./components/typing.js";
  import Glassmorphism from "./components/Glassmorphism.svelte";
  import Matrix from "./components/Matrix.svelte";
  import CustomCursor from "./components/CustomCursor.svelte";
  import Icon from "@iconify/svelte";
  import Section from "./components/Section.svelte";
  import Meta from "./components/Meta.svelte";
  import Projects from "./components/Projects.svelte";
  import Profile from "./components/Profile.svelte";
  import ProjectModal from "./components/ProjectModal.svelte";
  import TippyStyles from "./components/TippyStyles.svelte";

  import { onMount } from "svelte";
  import Lenis from "@studio-freight/lenis";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";

  // Helpers
  import { hash } from "./utils";
  import { events, globals } from "./store";

  let modal = { showing: false, project: null };
  events.on("project", async (project) => {
    if (modal.showing) {
      modal.showing = false;
      await new Promise((r) => setTimeout(r, 10));
    }
    console.log("Showing project", project);
    modal.showing = true;
    modal.project = { ...project };
  });

  events.on("modal_close", () => {
    modal.showing = false;
  });

  onMount(() => {
    globals.timeline = gsap.timeline({});
    gsap.registerPlugin(ScrollTrigger);

    globals.readyRes();
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    lenis.on("scroll", () => {
      events.emit("scroll");
    });
    requestAnimationFrame(raf);
  });
</script>

<svelte:head>
  <Meta />
  <TippyStyles />
</svelte:head>
<Section>
  <Matrix settings={{
    height: () => window.innerHeight * (1 + globals.matrixOverlap),
  }}/>
  <div class="center">
    <Glitch>
      I am <span
        use:typing="{{
          items: ['--Explosion--', 'a developer', 'a designer', 'a creator'],
          loop: true,
        }}"></span>
    </Glitch>
    <Glassmorphism class="button"
      >Hello
      <Icon icon="bytesize:arrow-right" />
    </Glassmorphism>
  </div>
</Section>
<Section>
  <Profile />
</Section>
<Section>
  <Projects />
</Section>
{#if modal.showing}
  {#key hash(JSON.stringify(modal.project))}
    <ProjectModal project="{modal.project}" />
  {/key}
{/if}
<CustomCursor />

<style lang="scss">
  @import "main.scss";
  .center {
    font-family: $monospace_font;
  }
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: $background;
    font-family: $font;
  }
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: $font;
  }
  :global(#gradient-bg) {
    background: linear-gradient(to bottom, $background, darken($primary, 30));
    @include flex;
    & > .container {
      height: calc(100vh + 100px);
      width: 100vw;
      display: flex;
      & > :global(*) {
        flex: 1;
      }

      & > :global(.timeline) {
        padding: 20px;
        margin: 20px;
      }
      & > :global(.profile .wrapper) {
        max-width: 500px;
      }
    }
  }
  :global(.button) {
    @include flex;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
    :global(svg) {
      transition: margin 0.3s ease;
      margin-left: 3px;
    }
    &:hover {
      background-color: rgba(29, 39, 58, 0.63);
      :global(svg) {
        margin-left: 5px;
      }
    }
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
