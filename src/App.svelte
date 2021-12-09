<script>
  import Glitch from "./components/Text.svelte";
  import Glassmorphism from "./components/Glassmorphism.svelte";
  import Matrix from "./components/Matrix.svelte";
  import CustomCursor from "./components/CustomCursor.svelte";
  import Icon from "@iconify/svelte";
  import Timeline from "./components/Timeline.svelte";
  import Section from "./components/Section.svelte";
  import Profile from "./components/Profile.svelte";
  let timeline = [
    "Created this timeline",
    "Published my second chrome extension to the chrome webstore",
    "Published my first extension to the chrome webstore",
    "Created a fast and end to end encrypted file sharing service called OnDrop",
    "Created a library of useful JavaScript functions called Bijou.js and designed a website for it",
  ];
</script>

<Section>
  <Matrix />
  <div class="center">
    <Glitch>--Explosion--</Glitch>
    <Glassmorphism class="button"
      >Hello
      <Icon icon="bytesize:arrow-right" />
    </Glassmorphism>
  </div>
</Section>
<Section id="gradient-bg">
  <div class="container">
    <Timeline items={timeline} />
    <Profile />
  </div>
</Section>
<CustomCursor />

<style lang="scss">
  @import "main.scss";
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: black;
  }
  :global(#gradient-bg) {
    background: linear-gradient(to bottom, black, #1f005c);
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
