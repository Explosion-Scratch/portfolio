<script>
  import Glitch from "./components/Text.svelte";
  import Glassmorphism from "./components/Glassmorphism.svelte";
  import Matrix from "./components/Matrix.svelte";
  import CustomCursor from "./components/CustomCursor.svelte";
  import Icon from "@iconify/svelte";
  import Section from "./components/Section.svelte";
</script>

<Section>
  <Matrix />
  <div class="center">
    <Glitch text="--Explosion--" />
    <Glassmorphism class="button"
      >Hello
      <Icon icon="bytesize:arrow-right" />
    </Glassmorphism>
  </div>
</Section>
<Section id="gradient-bg" style="height: 60vh" />
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
    background: linear-gradient(
      90deg,
      #184e77,
      #005b83,
      #007c97,
      #00a59f,
      #73cb97,
      #bbe492,
      #d9ed92
    );
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
