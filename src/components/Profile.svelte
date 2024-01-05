<script>
  import { onMount } from "svelte";
  import backgroundImage from "../helpers/backgroundImage";
  import useGSAP from "../helpers/gsap";
  import tooltip from "../helpers/tooltip";
  import Waves from "./Waves.svelte";
  import { events, globals } from "../store";

  const pfp = `https://avatars.githubusercontent.com/u/61319150?v=4`;
  const username = "Explosion-Scratch";

  let wrapper;
  onMount(() => {
    wrapper.style.marginTop = `-${globals.matrixOverlap * 100}vh`;
    events.on('about', () => {
      wrapper.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    })
  });

  const socials = [
    {
      title: "GitHub",
      url: "https://github.com/Explosion-Scratch",
      alt: "@Explosion-Scratch",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.035 5.257c.91 1.092 1.364 2.366 1.364 3.822c0 5.277-3.002 6.824-5.823 7.279c.364.637.455 1.365.455 2.093v3.73c0 .455-.273.728-.637.728a.718.718 0 0 1-.728-.728v-3.73a2.497 2.497 0 0 0-.728-2.093l.455-1.183c2.821-.364 5.733-1.274 5.733-6.187c0-1.183-.455-2.275-1.274-3.185l-.182-.727a4.04 4.04 0 0 0 .09-2.73c-.454.09-1.364.273-2.91 1.365l-.547.09a13.307 13.307 0 0 0-6.55 0l-.547-.09C7.57 2.71 6.66 2.437 6.204 2.437c-.273.91-.273 1.91.09 2.73l-.181.727c-.91.91-1.365 2.093-1.365 3.185c0 4.822 2.73 5.823 5.732 6.187l.364 1.183c-.546.546-.819 1.274-.728 2.002v3.821a.718.718 0 0 1-.728.728a.718.718 0 0 1-.728-.728V20.18c-3.002.637-4.185-.91-5.095-2.092c-.455-.546-.819-1.001-1.274-1.092c-.09-.091-.364-.455-.273-.819c.091-.364.455-.637.82-.455c.91.182 1.455.91 2 1.547c.82 1.092 1.639 2.092 4.095 1.547v-.364c-.09-.728.091-1.456.455-2.093c-2.73-.546-5.914-2.093-5.914-7.279c0-1.456.455-2.73 1.365-3.822c-.273-1.273-.182-2.638.273-3.73l.455-.364C5.749 1.073 7.023.8 9.66 2.437a13.673 13.673 0 0 1 6.642 0C18.851.708 20.216.98 20.398 1.072l.455.364c.455 1.274.546 2.548.182 3.821z"/></svg>`,
    },
    {
      title: "Email",
      url: "mailto:" + globals.info.email,
      alt: globals.info.email,
      icon: [
        `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="currentColor"><path d="m224 56l-96 88l-96-88Z" opacity=".2"/><path d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8Zm-20.57 16L128 133.15L52.57 64ZM216 192H40V74.19l82.59 75.71a8 8 0 0 0 10.82 0L216 74.19V192Z"/></g></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="currentColor"><path d="m224 96l-78.55 56h-34.9L32 96l96-64Z" opacity=".2"/><path d="m228.44 89.34l-96-64a8 8 0 0 0-8.88 0l-96 64A8 8 0 0 0 24 96v104a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V96a8 8 0 0 0-3.56-6.66ZM128 41.61l81.91 54.61l-67 47.78h-29.8l-67-47.78ZM40 200v-88.47l65.9 47a8 8 0 0 0 4.65 1.49h34.9a8 8 0 0 0 4.65-1.49l65.9-47V200Z"/></g></svg>`,
      ],
    },
    {
      title: "Keybase",
      alt: "@ExplosionScratch",
      url: "https://keybase.io/explosionscratch",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="currentColor"><path d="M232 96a72 72 0 0 1-98.83 66.83L120 176H96v24H72v24H32v-40l61.17-61.17A72 72 0 1 1 232 96Z" opacity=".2"/><path d="M160 16a80.07 80.07 0 0 0-76.09 104.78l-57.57 57.56A8 8 0 0 0 24 184v40a8 8 0 0 0 8 8h40a8 8 0 0 0 8-8v-16h16a8 8 0 0 0 8-8v-16h16a8 8 0 0 0 5.66-2.34l9.56-9.57A80 80 0 1 0 160 16Zm0 144a63.7 63.7 0 0 1-23.65-4.51a8 8 0 0 0-8.84 1.68L116.69 168H96a8 8 0 0 0-8 8v16H72a8 8 0 0 0-8 8v16H40v-28.69l58.83-58.82a8 8 0 0 0 1.68-8.84A64 64 0 1 1 160 160Zm32-84a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/></g></svg>`,
    },
    // {
    //   title: "Questions",
    //   id: "questions",
    //   alt: 'Ask me something',
    //   icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M225.9 102.8c-3.8-3.9-7.7-8-9.2-11.5s-1.4-8.7-1.5-14c-.1-9.7-.3-20.8-8-28.5s-18.8-7.9-28.5-8c-5.3-.1-10.7-.2-14-1.5s-7.6-5.4-11.5-9.2C146.3 23.5 138.4 16 128 16s-18.3 7.5-25.2 14.1c-3.9 3.8-8 7.7-11.5 9.2s-8.7 1.4-14 1.5c-9.7.1-20.8.3-28.5 8s-7.9 18.8-8 28.5c-.1 5.3-.2 10.7-1.5 14s-5.4 7.6-9.2 11.5C23.5 109.7 16 117.6 16 128s7.5 18.3 14.1 25.2c3.8 3.9 7.7 8 9.2 11.5s1.4 8.7 1.5 14c.1 9.7.3 20.8 8 28.5s18.8 7.9 28.5 8c5.3.1 10.7.2 14 1.5s7.6 5.4 11.5 9.2c6.9 6.6 14.8 14.1 25.2 14.1s18.3-7.5 25.2-14.1c3.9-3.8 8-7.7 11.5-9.2s8.7-1.4 14-1.5c9.7-.1 20.8-.3 28.5-8s7.9-18.8 8-28.5c.1-5.3.2-10.7 1.5-14s5.4-7.6 9.2-11.5c6.6-6.9 14.1-14.8 14.1-25.2s-7.5-18.3-14.1-25.2Zm-11.6 39.3c-4.8 5-9.7 10.2-12.4 16.5s-2.6 13.1-2.7 19.8s-.2 14.4-3.3 17.5s-10.4 3.2-17.5 3.3s-13.7.2-19.8 2.7s-11.5 7.6-16.5 12.4S132 224 128 224s-9.1-4.9-14.1-9.7s-10.2-9.7-16.5-12.4s-13.1-2.6-19.8-2.7s-14.4-.2-17.5-3.3s-3.2-10.4-3.3-17.5s-.2-13.7-2.7-19.8s-7.6-11.5-12.4-16.5S32 132 32 128s4.9-9.1 9.7-14.1s9.7-10.2 12.4-16.5s2.6-13.1 2.7-19.8s.2-14.4 3.3-17.5s10.4-3.2 17.5-3.3s13.7-.2 19.8-2.7s11.5-7.6 16.5-12.4S124 32 128 32s9.1 4.9 14.1 9.7s10.2 9.7 16.5 12.4s13.1 2.6 19.8 2.7s14.4.2 17.5 3.3s3.2 10.4 3.3 17.5s.2 13.7 2.7 19.8s7.6 11.5 12.4 16.5S224 124 224 128s-4.9 9.1-9.7 14.1ZM140 180a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm24-72a36 36 0 0 1-28 35.1v.9a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8a20 20 0 1 0-20-20a8 8 0 0 1-16 0a36 36 0 0 1 72 0Z"/></svg>`,
    // },
    // {
    //   title: 'Repl.it',
    //   alt: '@ExplosionScratc',
    //   url: 'https://replit.com/@ExplosionScratc',
    //   icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linejoin="round" d="M7.75 15.5v-9a2 2 0 0 1 2-2H22a2 2 0 0 1 2 2v11H9.75a2 2 0 0 1-2-2Zm16.25 2h14.25a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H24v-13Zm-16.25 24v-9a2 2 0 0 1 2-2H24v11a2 2 0 0 1-2 2H9.75a2 2 0 0 1-2-2Z"/></svg>`,
    // }
  ];

  let hovering = null;
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
      tl.to(
        node.querySelector('.card'),
        {
          x: '-100%',
          opacity: 0,
          rotate: '30deg'
        },
        '>'
      );
      tl.to(node, { height: '80vh', ease: 'ease.out' }, '80%');
    },
    ease: 'ease.out',
    start: () => window.innerHeight * 0.8,
    end: () => window.innerHeight * 2,
    scrollTrigger: {
      trigger: wrapper,
      pin: wrapper,
    }
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
          opacity: 0.3,
        }}"
      >
        {username}
      </div>
      <div class="description">Fullstack JavaScript developer</div>
    </div>
    <div class="social">
      {#each socials as s}
        <a
          href="{s.url}"
          class="icon"
          use:tooltip="{`${s.title} - ${s.alt || s.url}`}"
        >
          <div
            class="icon"
            on:mouseenter="{() => (hovering = s)}"
            on:mouseleave="{() => (hovering = null)}"
          >
            {@html Array.isArray(s.icon)
              ? hovering === s
                ? s.icon[1]
                : s.icon[0]
              : s.icon}
          </div>
        </a>
      {/each}
    </div>
    <div class="buttons">
      <button class="primary" on:click={() => events.emit('projects')} use:backgroundImage={{height: 200, url: globals.images.repo_count, opacity: .3}} use:tooltip="{'Scroll down below!'}">
        View Projects
      </button>
      <button class="secondary" use:backgroundImage={{height: 300, opacity: .3, url: globals.images.github_contribs }} use:tooltip="{'@Explosion-Scratch'}">
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
    min-height: 80vh;

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
        .icon {
          margin: 0.3em;
          width: 20px;
          height: 20px;
          :global(svg) {
            width: 100%;
            height: 100%;
          }
        }
        $count: 5;
        @for $i from 1 through $count {
          &:nth-child(#{$i}) {
            $themeColor: lighten(
              adjust-hue($primary, calc(($i - 1) * 30)),
              calc(($i - 1) * 10) + 20
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
