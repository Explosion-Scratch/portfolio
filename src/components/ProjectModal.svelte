<script>
  import { onDestroy, onMount } from "svelte";
  import CurtainImage from "./CurtainImage.svelte";
  import projects from "../projects.json";
  import Tag from "./Tag.svelte";
  export let project = {};
  import { events } from "../store";
  import { getIcon, getInfo, safeInterval } from "../utils";
  import AnimatedIcon from "./AnimatedIcon.svelte";
  let w, h;
  let loading = true;
  onMount(() => {
    w = window.innerWidth / 2;
    h = window.innerHeight * 0.8;
    document.body.style.overflow = "hidden";
    let idx = projects.findIndex((i) => i.title === project.title);
    project = projects[idx];
    getInfo(project.image, projects).then((a) => {
      project.image = a.url;
      project.isVideo = a.isVideo;
      loading = false;
      console.log('Modal project: ', {...project})
    });
  });
  onDestroy(() => {
    document.body.style.overflow = "auto";
  });

  let closeHovered = false;
  $: projectIndex = projects.findIndex((i) => i.title === project.title);
  $: previousProject = projectIndex < 1 ? null : projects[projectIndex - 1];
  $: nextProject =
    projectIndex >= projects.length - 1 ? null : projects[projectIndex + 1];
</script>

<div class="project_modal_wrapper" class:closeHovered="{closeHovered}">
  <div
    class="closeWrapper"
    on:mouseenter="{() => (closeHovered = true)}"
    on:mouseleave="{() => (closeHovered = false)}"
  >
    <a href="#" on:click="{() => events.emit('modal_close')}" class="close"></a>
  </div>
  <div class="right">
    <div class="img_container">
      {#if !loading}
        <CurtainImage
          width="{w}"
          height="{h}"
          isVideo="{project.isVideo}"
          src="{project.image}"
        />
      {/if}
    </div>
  </div>
  <div class="left">
    <h1>{project.title}s</h1>
    <div class="tags">
      {#each project.tags.split(',') as tag}
        <Tag tag="{tag}" />
      {/each}
    </div>
    {#if project.description}
      <div class="desc">
        {project.description}
      </div>
    {/if}
    <div class="buttons">
      <a
        class="primary hover_target"
        href="{project.url}"
        target="code_win"
        on:click="{() => events.emit('open_url', { url: project.url })}"
      >
        <AnimatedIcon>
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
        </AnimatedIcon>
        <span class="text">View</span>
      </a>
      <a
        href="{project.code}"
        target="code_win"
        class="secondary hover_target"
        on:click="{() => events.emit('open_url', { url: project.code })}"
      >
        <AnimatedIcon>
          {@html getIcon(project.code)}
        </AnimatedIcon>
        <span class="text">Code</span>
      </a>
    </div>
  </div>
  <div class="next_previous">
    {#if nextProject}
      <div
        class="next move_btn"
        on:click="{() => events.emit('project', nextProject)}"
      >
        <div class="arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.85Z"
            ></path></svg
          >
        </div>
        <div class="meta">
          <span class="title">{nextProject.title}</span>
          <div class="icons">
            {#each nextProject.tags.split(",") as tag}<Tag
                tag="{tag}"
                iconOnly="{true}"
              />{/each}
          </div>
        </div>
      </div>
    {/if}
    {#if previousProject}
      <div
        class="previous move_btn"
        on:click="{() => events.emit('project', previousProject)}"
      >
        <div class="arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="M16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.313t.712.288L19.3 11.3q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7L16.15 13Z"
            ></path></svg
          >
        </div>
        <div class="meta">
          <span class="title">{previousProject.title}</span>
          <div class="icons">
            {#each previousProject.tags.split(",") as tag}<Tag
                tag="{tag}"
                iconOnly="{true}"
              />{/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss" scoped>
  @import "../main.scss";
  .project_modal_wrapper :global(*) {
    box-sizing: border-box;
  }
  .img_container {
    $color: white;
    box-shadow: rgba($color, 0.05) 0px 6px 24px 0px,
      rgba($color, 0.08) 0px 0px 0px 1px;
  }
  .project_modal_wrapper {
    .closeWrapper {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10000;
    }
    .next_previous {
      position: absolute;
      bottom: 10px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      .move_btn {
        display: flex;
        padding: 0.3em 0.5em;
        border-radius: 0.3em;
        gap: 0.5em;
        &.next {
          padding-right: 1.4em;
        }
        &.previous {
          padding-left: 1.4em;
        }
        .arrow {
          opacity: 0.5;
          transition: transform 0.4s cubic-bezier(0.95, 0.05, 0.795, 0.035);
        }
        &:hover .arrow {
          transform: translateX(-5px);
        }
        &.previous:hover .arrow {
          transform: translateX(5px);
        }
        &.previous {
          flex-direction: row-reverse;
        }
        &.previous .icons {
          justify-content: flex-end;
        }
        transition: box-shadow 0.6s cubic-bezier(0.23, -0.01, 0.36, 1.48);
        &:hover {
          box-shadow: 0 0 0 1px rgba($primary, 0.1), 1px 2px 0 1px $primary,
            4px 6px 0 1px $secondary,
            -3px -3px 0 1px rgba(adjust-hue($primary, -20), 0.1);
        }
        &:hover .meta .title {
          border-bottom-style: dashed;
          font-weight: 900;
        }
        .meta {
          display: flex;
          flex-direction: column;
          gap: 0.3em;
          .title {
            transition: font-weight .2s ease-out;
            border-bottom: 1px solid $primary;
            font-size: 1em;
            font-weight: 200;
          }
          .icons {
            margin-top: 0.2em;
            display: flex;
            width: 100%;
            gap: 0.3em;
            :global(svg) {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
    .close {
      color: white;
      transform: scale(1.1);
      @include close-button;
    }
    border: 1px solid transparent;
    &.closeHovered {
      inset: 50px;
      $shadow: $primary;
      box-shadow: 0 20px 25px -5px rgb($shadow, 0.4),
        0 8px 10px -6px rgb($shadow, 0.4);
    }
    font-family: $font;
    color: $text;
    position: fixed;
    inset: 0;
    transition: inset 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: linear-gradient(
      45deg,
      darken($primary, 20),
      darken($secondary, 10)
    );
    display: flex;
    flex-direction: column;
    padding: 5vmin;
    .right,
    .left {
      flex: 1;
      overflow: hidden;
    }
    .right {
      flex: 2;
      width: 100%;
      display: flex;
      flex-direction: column;
      .img_container {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
      }
    }
    .left {
      padding: 3em;
      max-width: 800px;
      margin: 0 auto;
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
    .buttons {
      margin-top: 1em;
      padding-top: 0;
      display: flex;
      width: 100%;
      gap: 0.3em;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      a {
        @include button;
        flex: 1;
        &.secondary {
          filter: brightness(200%);
        }
      }
    }
  }
</style>
