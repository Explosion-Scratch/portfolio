<script>
  import { onMount } from "svelte";
  import CurtainImage from "./CurtainImage.svelte";
  import Tag from "./components/Tag.svelte";
  import { events } from "./store";
  let w, h;
  onMount(() => {
    w = window.innerWidth / 2;
    h = window.innerHeight * 0.8;
  });
</script>

<div class="project_modal_wrapper">
  <div class="right">
    <div class="img_container">
      <CurtainImage
        width="{w}"
        height="{h}"
        src="/project_images/0f975869b3fb62f329c67861ba56681aea8f0b2011273c023ee0bbefc9a5bff7.png"
      />
    </div>
  </div>
  <div class="left">
    <h1>{project.title}</h1>
    <div class="tags">
      {#each tags as tag}
        <Tag tag="{tag}" light="{true}" />
      {/each}
    </div>    <div class="desc">
      {project.description}
    </div>
    <div class="buttons">
      <a
        class="primary"
        href="{project.url}"
        target="code_win"
        on:click="{() => events.emit('open_url', { url: project.url })}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M227.32 28.68a16 16 0 0 0-15.66-4.08h-.15L19.57 82.84a16 16 0 0 0-2.42 29.84l85.62 40.55l40.55 85.62a15.86 15.86 0 0 0 14.42 9.15q.69 0 1.38-.06a15.88 15.88 0 0 0 14-11.51l58.2-191.94v-.15a16 16 0 0 0-4-15.66Zm-69.49 203.17l-.05.14l-39.36-83.09l47.24-47.25a8 8 0 0 0-11.31-11.31l-47.25 47.24L24 98.22h.14L216 40Z"
          ></path></svg
        >
        <span class="text">View</span>
      </a>
      <a
        href="{project.code}"
        target="code_win"
        class="secondary"
        on:click="{() => events.emit('open_url', { url: project.code })}"
      >
        {@html getIcon(project.code)}
        <span class="text">Code</span>
      </a>
    </div>
  </div>
</div>

<style lang="scss" scoped="">
  @import "./main.scss";
  .project_modal_wrapper :global(*) {
    box-sizing: border-box;
  }
  .project_modal_wrapper {
    font-family: $font;
    color: $text;
    width: 100vw;
    position: fixed;
    inset: 0;
    height: 100vh;
    background: linear-gradient(
      45deg,
      darken($primary, 20),
      darken($secondary, 10)
    );
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5vmin;
    .right,
    .left {
      overflow: hidden;
      flex: 1;
    }
    .left {
      padding: 3em;
      h1 {
        font-weight: 200;
        font-size: 2em;
      }
      .desc {
        margin-top: 1em;
        font-weight: 300;
        line-height: 1.7em;
      }
    }
  }
</style>
