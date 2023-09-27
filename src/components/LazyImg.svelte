<script>
  import { onDestroy, onMount } from "svelte";
  import Loader from "./Loader.svelte";

  export let src;
  let isVideo = false;
  let is_vid_override = false;
  let loadImg = false;
  let el;

  let loading = true;
  export let hoverPlay = true;
  export let title = "Project";

  // Check if the image is a video
  $: {
    isVideo = /\.(mp4|mpv|avi|mkv)$/i.test(src) || is_vid_override;
  }

  function inView(el, percentVisible) {
    let rect = el.getBoundingClientRect(),
      windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

    return !(
      Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) <
        percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) <
        percentVisible
    );
  }

  function HANDLESCROLL() {
    if (inView(el, 1)) {
      loadImg = true;
    } else {
      loadImg = false;
    }
  }

  function MOUSEENTER() {
    loadImg = true;
    if (!hoverPlay) {
      return;
    }
    if (!isVideo) {
      return;
    }
    let video = el.querySelector("video");
    if (!video) {
      return;
    }
    video.currentTime = 0;
    video.play();
  }

  function MOUSELEAVE() {
    if (!hoverPlay) {
      return;
    }
    if (!isVideo) {
      return;
    }
    let video = el.querySelector("video");
    if (!video) {
      return;
    }
    video.currentTime = 0;
    video.pause();
  }

  onMount(() => {
    HANDLESCROLL();
    window.addEventListener("scroll", HANDLESCROLL);
    el.addEventListener("mouseenter", MOUSEENTER);
    el.addEventListener("mouseleave", MOUSELEAVE);
  });
  onDestroy(() => {
    window.removeEventListener("scroll", HANDLESCROLL);
    el.removeEventListener("mouseenter", MOUSEENTER);
    el.removeEventListener("mouseleave", MOUSELEAVE);
  });

  let errored = false;
  function error() {
    if (errored) {
      return;
    }
    loading = true;
    loadImg = false;
    console.log("Error loading", src);
    setTimeout(() => (loadImg = true), 50);
    setTimeout(() => {
      errored = true;
    }, 2000);
  }
</script>

<div class="img" bind:this="{el}">
  {#if loadImg}
    {#if isVideo}
      <video
        src="{src}"
        alt="Video for {title}"
        autoplay
        muted
        loop
        class="img_el"
        class:loading="{loading}"
        on:load="{() => (loading = false)}"
        on:canplay="{() => (loading = false)}"
        on:error="{error}"
      >
        ></video
      >
    {:else}
      <img
        on:error="{() => (is_vid_override = true)}"
        src="{src}"
        alt="Image for {title}"
        class="img_el"
        class:loading="{loading}"
        on:load="{() => (loading = false)}"
        on:error="{error}"
      />
    {/if}
  {/if}
  {#if loading && !errored}
    <Loader />
  {/if}
  {#if loading && errored && loadImg}
    <div class="error_container">
      <div class="error_icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M120 136V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm112-44.45v72.9a15.86 15.86 0 0 1-4.69 11.31l-51.55 51.55a15.86 15.86 0 0 1-11.31 4.69h-72.9a15.86 15.86 0 0 1-11.31-4.69l-51.55-51.55A15.86 15.86 0 0 1 24 164.45v-72.9a15.86 15.86 0 0 1 4.69-11.31l51.55-51.55A15.86 15.86 0 0 1 91.55 24h72.9a15.86 15.86 0 0 1 11.31 4.69l51.55 51.55A15.86 15.86 0 0 1 232 91.55Zm-16 0L164.45 40h-72.9L40 91.55v72.9L91.55 216h72.9L216 164.45ZM128 160a12 12 0 1 0 12 12a12 12 0 0 0-12-12Z"
          ></path></svg
        >
      </div>
      <div class="error_msg">Whoops! That failed to load! Sorry!</div>
      <a href="{src}" alt="Go to {src}" class="link"
        >Go to {src?.split("://")[1]?.split("/")?.[0]}</a
      >
      <a
        href="#"
        alt="Retry loading"
        on:click="{() => ((errored = false), error())}">Retry</a
      >
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../main.scss";
  .img {
    display: grid;
    place-items: center;
  }
  .img_el.loading {
    display: none;
  }
  .error_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    max-width: 200px;
    text-align: center;
    margin: 0 auto;
    a {
      margin-top: 0.5em;
      color: lighten($primary, 40);
    }
  }
</style>
