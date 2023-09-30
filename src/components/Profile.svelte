<script>
  import { onMount } from "svelte";
  import backgroundImage from "../helpers/backgroundImage";
  import useGSAP from "../helpers/gsap";
  import tooltip from "../helpers/tooltip";
  import Waves from "./Waves.svelte";
  import { globals } from "../store";

  const pfp = `https://avatars.githubusercontent.com/u/61319150?v=4`;
  const username = "Explosion-Scratch";

  let wrapper;
  onMount(() => {
    wrapper.style.marginTop = `-${globals.matrixOverlap * 100}vh`;
  });
</script>

<div
  class="wrapper"
  use:useGSAP="{{
    timeline: (tl, { node }) => {
      tl.from(node, { '--top': '30%' });
      tl.to(node, { '--top': '70%' });
      tl.from(node, {
        height: '100vh',
      });
      tl.to(node, { height: '90vh', ease: 'ease.out' }, '80%');
    },
    ease: 'ease.out',
    start: () => window.innerHeight * 0.8,
    end: () => window.innerHeight * 2,
  }}"
  bind:this="{wrapper}"
>
  <div class="card" use:useGSAP="{{ from: { opacity: 0 } }}">
    <div class="avatar">
      <img src="{pfp}" alt="My profile picture (@{username})" />
    </div>
    <div class="info">
      <div
        class="name"
        use:backgroundImage="{{
          url: pfp,
          opacity: 0.1,
        }}"
      >
        {username}
      </div>
      <div class="description">Fullstack JavaScript developer</div>
    </div>
    <div class="social">
      <a href="https://github.com/explosion-scratch" class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          ><g fill="currentColor"
            ><path
              d="M155.2 100.8c-23-23-55.57-27.63-72.8-10.4a34.21 34.21 0 0 0-7.61 11.66a16.23 16.23 0 0 1-14.72 10C48 112.44 37 116.61 28.8 124.8C7.6 146 13.33 186.12 41.6 214.4s68.39 34 89.6 12.8c8.19-8.2 12.36-19.2 12.8-31.27a16.23 16.23 0 0 1 10-14.72a34.21 34.21 0 0 0 11.66-7.61c17.17-17.23 12.51-49.82-10.46-72.8ZM112 168a24 24 0 1 1 24-24a24 24 0 0 1-24 24Z"
              opacity=".2"></path><path
              d="m245.66 42.34l-32-32a8 8 0 0 0-12.72 9.41l-60.42 60.41c-22.79-11.86-48.31-10.87-63.77 4.58a42.27 42.27 0 0 0-9.39 14.37a8.24 8.24 0 0 1-7.55 4.89c-14.59.49-27.26 5.72-36.65 15.11C11.08 131.22 6 148.6 8.74 168.07C11.4 186.7 21.07 205.15 36 220s33.34 24.56 52 27.22a71.13 71.13 0 0 0 10.1.78c15.32 0 28.83-5.23 38.76-15.16c9.39-9.39 14.62-22.06 15.11-36.65a8.24 8.24 0 0 1 4.92-7.55a42.22 42.22 0 0 0 14.37-9.39c15.45-15.46 16.44-41 4.58-63.77l60.41-60.42a8 8 0 0 0 9.41-12.72ZM200 68.68L187.32 56L212 31.31L224.69 44Zm-40 99.25a26.12 26.12 0 0 1-8.95 5.83a24.24 24.24 0 0 0-15 21.89c-.36 10.46-4 19.41-10.43 25.88c-8.44 8.43-21 11.95-35.36 9.89c-15.26-2.17-30.53-10.23-42.99-22.69S26.75 181 24.58 165.81c-2-14.37 1.46-26.92 9.89-35.36C40.94 124 49.89 120.38 60.35 120a24.22 24.22 0 0 0 21.89-15a26.12 26.12 0 0 1 5.83-9c5.49-5.49 13-8.13 21.38-8.13a49.38 49.38 0 0 1 19.13 4.19l-20.08 20.13a32 32 0 1 0 35.31 35.31l20.08-20.08c6.52 15.29 5.58 30.99-3.89 40.51Zm-10.4-61.48a72.9 72.9 0 0 1 5.93 6.75l-15.42 15.42a32.22 32.22 0 0 0-12.68-12.68l15.42-15.43a73 73 0 0 1 6.7 5.94ZM112 128a16 16 0 0 1 16 16a16 16 0 1 1-16-16Zm48.85-32.85a86.94 86.94 0 0 0-6.68-6L176 67.31L188.69 80l-21.83 21.82a86.94 86.94 0 0 0-6-6.68Zm-67.2 99.19a8 8 0 0 1-11.31 11.32l-32-32a8 8 0 0 1 11.32-11.31Z"
            ></path></g
          ></svg
        >
      </a>
      <a href="https://github.com/explosion-scratch" class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          ><g fill="currentColor"
            ><path
              d="M155.2 100.8c-23-23-55.57-27.63-72.8-10.4a34.21 34.21 0 0 0-7.61 11.66a16.23 16.23 0 0 1-14.72 10C48 112.44 37 116.61 28.8 124.8C7.6 146 13.33 186.12 41.6 214.4s68.39 34 89.6 12.8c8.19-8.2 12.36-19.2 12.8-31.27a16.23 16.23 0 0 1 10-14.72a34.21 34.21 0 0 0 11.66-7.61c17.17-17.23 12.51-49.82-10.46-72.8ZM112 168a24 24 0 1 1 24-24a24 24 0 0 1-24 24Z"
              opacity=".2"></path><path
              d="m245.66 42.34l-32-32a8 8 0 0 0-12.72 9.41l-60.42 60.41c-22.79-11.86-48.31-10.87-63.77 4.58a42.27 42.27 0 0 0-9.39 14.37a8.24 8.24 0 0 1-7.55 4.89c-14.59.49-27.26 5.72-36.65 15.11C11.08 131.22 6 148.6 8.74 168.07C11.4 186.7 21.07 205.15 36 220s33.34 24.56 52 27.22a71.13 71.13 0 0 0 10.1.78c15.32 0 28.83-5.23 38.76-15.16c9.39-9.39 14.62-22.06 15.11-36.65a8.24 8.24 0 0 1 4.92-7.55a42.22 42.22 0 0 0 14.37-9.39c15.45-15.46 16.44-41 4.58-63.77l60.41-60.42a8 8 0 0 0 9.41-12.72ZM200 68.68L187.32 56L212 31.31L224.69 44Zm-40 99.25a26.12 26.12 0 0 1-8.95 5.83a24.24 24.24 0 0 0-15 21.89c-.36 10.46-4 19.41-10.43 25.88c-8.44 8.43-21 11.95-35.36 9.89c-15.26-2.17-30.53-10.23-42.99-22.69S26.75 181 24.58 165.81c-2-14.37 1.46-26.92 9.89-35.36C40.94 124 49.89 120.38 60.35 120a24.22 24.22 0 0 0 21.89-15a26.12 26.12 0 0 1 5.83-9c5.49-5.49 13-8.13 21.38-8.13a49.38 49.38 0 0 1 19.13 4.19l-20.08 20.13a32 32 0 1 0 35.31 35.31l20.08-20.08c6.52 15.29 5.58 30.99-3.89 40.51Zm-10.4-61.48a72.9 72.9 0 0 1 5.93 6.75l-15.42 15.42a32.22 32.22 0 0 0-12.68-12.68l15.42-15.43a73 73 0 0 1 6.7 5.94ZM112 128a16 16 0 0 1 16 16a16 16 0 1 1-16-16Zm48.85-32.85a86.94 86.94 0 0 0-6.68-6L176 67.31L188.69 80l-21.83 21.82a86.94 86.94 0 0 0-6-6.68Zm-67.2 99.19a8 8 0 0 1-11.31 11.32l-32-32a8 8 0 0 1 11.32-11.31Z"
            ></path></g
          ></svg
        >
      </a>
      <a href="https://github.com/explosion-scratch" class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          ><g fill="currentColor"
            ><path
              d="M155.2 100.8c-23-23-55.57-27.63-72.8-10.4a34.21 34.21 0 0 0-7.61 11.66a16.23 16.23 0 0 1-14.72 10C48 112.44 37 116.61 28.8 124.8C7.6 146 13.33 186.12 41.6 214.4s68.39 34 89.6 12.8c8.19-8.2 12.36-19.2 12.8-31.27a16.23 16.23 0 0 1 10-14.72a34.21 34.21 0 0 0 11.66-7.61c17.17-17.23 12.51-49.82-10.46-72.8ZM112 168a24 24 0 1 1 24-24a24 24 0 0 1-24 24Z"
              opacity=".2"></path><path
              d="m245.66 42.34l-32-32a8 8 0 0 0-12.72 9.41l-60.42 60.41c-22.79-11.86-48.31-10.87-63.77 4.58a42.27 42.27 0 0 0-9.39 14.37a8.24 8.24 0 0 1-7.55 4.89c-14.59.49-27.26 5.72-36.65 15.11C11.08 131.22 6 148.6 8.74 168.07C11.4 186.7 21.07 205.15 36 220s33.34 24.56 52 27.22a71.13 71.13 0 0 0 10.1.78c15.32 0 28.83-5.23 38.76-15.16c9.39-9.39 14.62-22.06 15.11-36.65a8.24 8.24 0 0 1 4.92-7.55a42.22 42.22 0 0 0 14.37-9.39c15.45-15.46 16.44-41 4.58-63.77l60.41-60.42a8 8 0 0 0 9.41-12.72ZM200 68.68L187.32 56L212 31.31L224.69 44Zm-40 99.25a26.12 26.12 0 0 1-8.95 5.83a24.24 24.24 0 0 0-15 21.89c-.36 10.46-4 19.41-10.43 25.88c-8.44 8.43-21 11.95-35.36 9.89c-15.26-2.17-30.53-10.23-42.99-22.69S26.75 181 24.58 165.81c-2-14.37 1.46-26.92 9.89-35.36C40.94 124 49.89 120.38 60.35 120a24.22 24.22 0 0 0 21.89-15a26.12 26.12 0 0 1 5.83-9c5.49-5.49 13-8.13 21.38-8.13a49.38 49.38 0 0 1 19.13 4.19l-20.08 20.13a32 32 0 1 0 35.31 35.31l20.08-20.08c6.52 15.29 5.58 30.99-3.89 40.51Zm-10.4-61.48a72.9 72.9 0 0 1 5.93 6.75l-15.42 15.42a32.22 32.22 0 0 0-12.68-12.68l15.42-15.43a73 73 0 0 1 6.7 5.94ZM112 128a16 16 0 0 1 16 16a16 16 0 1 1-16-16Zm48.85-32.85a86.94 86.94 0 0 0-6.68-6L176 67.31L188.69 80l-21.83 21.82a86.94 86.94 0 0 0-6-6.68Zm-67.2 99.19a8 8 0 0 1-11.31 11.32l-32-32a8 8 0 0 1 11.32-11.31Z"
            ></path></g
          ></svg
        >
      </a>
    </div>
    <div class="buttons">
      <button class="primary" use:tooltip="{'Scroll down below!'}">
        View Projects
      </button>
      <button class="secondary" use:tooltip="{'@Explosion-Scratch'}">
        Visit GitHub
      </button>
    </div>
  </div>
  <Waves
    style="position absolute; bottom: 0; right: 0; top: calc(100% - 350px); left: 0;"
  />
</div>

<style lang="scss" scoped="">
  @import "../main.scss";
  $maxWidth: 500px;
  // Fade out
  :global(.waves) {
    $MASK: linear-gradient(to bottom, black, transparent);
    -webkit-mask-image: $MASK;
    mask-image: $MASK;
  }

  .wrapper {
    position: relative;
    min-height: 90vh;

    $w: calc($maxWidth / 2);
    $left: calc(50vw - $w);
    $right: calc(100vw - $left);
    $shift: 0%;
    &::before,
    &::after {
      content: "";
      $size: 10em;
      width: $size;
      height: $size;
      position: absolute;
      top: calc(clamp(30%, var(--top, 70%), 70%) - $shift);
      left: $left;
      border-radius: 50%;
      @include glow;
      z-index: -100;
      transform: translate(-50%, -50%);
      opacity: 0.5;
      // transition: top 1s cubic-bezier(0.23, -0.01, 0.36, 1.48);
      background: linear-gradient(to right, $primaryLight, $primaryDark);
      // animation: before 15s ease-in-out infinite alternate-reverse;
    }
    &::after {
      left: $right;
      top: calc(100% - clamp(30%, var(--top, 30%), 100%) - $shift);
      // animation-name: after;
    }
    // &:hover::after {
    //   top: 70%;
    // }
    // &:hover::before {
    //   top: 20%;
    // }
    @keyframes after {
      from {
        top: 20%;
      }
      to {
        top: 70%;
      }
    }
    @keyframes before {
      from {
        top: 70%;
      }
      to {
        top: 20%;
      }
    }
  }
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5em 1em;
    max-width: $maxWidth;
    width: 80vw;
    margin: 0 auto;
    border-radius: 0.5em;
    $avatar_size: 7em;
    .avatar {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      width: $avatar_size;
      height: $avatar_size;
      border-radius: 1000px;
      overflow: hidden;
      box-shadow: 0 0 0 3px $primaryLight, 0 3px 10px 5px $primaryDark;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      margin-top: calc($avatar_size / 1.6);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .name {
        font-weight: 200;
        font-size: 2em;
      }
      .description {
        font-size: 1.2em;
        font-weight: 200;
        margin-top: 1em;
        color: rgba($text, 0.6);
      }
    }
    .social {
      margin-top: 0.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.3em;
      a {
        text-decoration: none;
        border-radius: 10000px;
        padding: 0.4em;
        display: grid;
        place-items: center;
        svg {
          margin: 0.3em;
        }
        $count: 3;
        @for $i from 1 through $count {
          &:nth-child(#{$i}) {
            $themeColor: lighten(
              adjust-hue($primary, calc(($i - 1) * 30)),
              calc(($i - 1) * 15) + 20
            );
            border: 2px solid rgba($themeColor, 0.1);
            &::before {
              @include glow_sharp {
                $color: $themeColor;
              }
              background: linear-gradient(
                20deg,
                $themeColor,
                adjust-hue($themeColor, 30)
              );
            }
          }
        }
        color: $text;
        position: relative;
        &::before {
          transition: opacity 0.5s ease-in-out;
          content: "";
          border-radius: inherit;
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.4;
        }
        &:hover::before {
          opacity: 1;
        }
      }
    }
    @include glow_intense;
    @include dark_glassmorphism;

    transition: backdrop-filter 0.3s ease;
    &:hover {
      backdrop-filter: blur(5px) saturate(200%);
      -webkit-backdrop-filter: blur(5px) saturate(200%);
    }

    .buttons {
      margin-top: 1em;
      margin-bottom: 1.5em;
      gap: 0.5em;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        z-index: 10;
        $themeColor: rgba(lighten($primary, 30), 0.5);
        font-size: 16px;
        font-weight: 200;
        border-radius: 0.3em;
        letter-spacing: 1px;
        padding: 13px 20px 13px;
        outline: 0;
        border: 1px dashed $themeColor;
        color: $text;
        cursor: pointer;
        position: relative;
        background-color: transparent;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        @include glow_sharp {
          $color: rgba($themeColor, 0.1);
        }

        &:after {
          content: "";
          background: linear-gradient(
            30deg,
            $themeColor,
            adjust-hue($themeColor, 10)
          );
          width: 100%;
          z-index: -1;
          position: absolute;
          height: 100%;
          top: 2px;
          left: 2px;
          transition: 0.2s;
          border-radius: inherit;
          transition-timing-function: cubic-bezier(0.23, -0.01, 0.36, 1.48);
        }
        &:hover {
          border-color: $text;
          border-style: solid;
        }
        &:hover:after {
          top: 7px;
          left: 7px;
        }
      }
    }
  }
</style>
