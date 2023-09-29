<script>
  import { safeInterval, safeRequestAnimationFrame } from "../utils";

  let innerCursor = null;
  let outerCursor = null;
  let doc = null;
  let outerCursorPos = {
    x: 0,
    y: 0,
  };
  let mouse = {
    x: 0,
    y: 0,
  };
  let FACTOR = 5;
  function moveCursor(e) {
    if (outerCursorPos.x === 0 && outerCursorPos.y === 0) {
      outerCursorPos.x = e.clientX;
      outerCursorPos.y = e.clientY;
    }

    let x = e.clientX;
    let y = e.clientY;
    Object.assign(mouse, { x, y });

    if (e.target.closest("a, button, .button, .pointer")) {
      FACTOR = 2;
      innerCursor.classList.add("grow");
      outerCursor.classList.add("grow");
    } else {
      FACTOR = 6;
      innerCursor.classList.remove("grow");
      outerCursor.classList.remove("grow");
    }
  }
  safeRequestAnimationFrame(() => {
    outerCursorPos.x += (mouse.x - outerCursorPos.x) / FACTOR;
    outerCursorPos.y += (mouse.y - outerCursorPos.y) / FACTOR;

    innerCursor.style.left = `${mouse.x}px`;
    innerCursor.style.top = `${mouse.y}px`;

    outerCursor.style.left = `${outerCursorPos.x}px`;
    outerCursor.style.top = `${outerCursorPos.y}px`;
  });
</script>

<svelte:body on:mousemove="{moveCursor}" />

<div class="inner-cursor" bind:this="{innerCursor}"></div>
<div class="outer-cursor" bind:this="{outerCursor}"></div>

<style lang="scss">
  $col: white;
  * {
    z-index: 10000;
  }
  $inner: 10px;
  $outer: 100px;
  $outer_nohover: calc($outer / 2);
  :global(*) {
    cursor: none !important;
  }
  .inner-cursor {
    position: fixed;
    left: 10px;
    width: $inner;
    height: $inner;
    transform: translate(-50%, -50%);
    background-color: $col;
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
    transition: width 0.5s, height 0.5s;
  }
  :global(.inner-cursor.grow) {
    width: $outer;
    height: $outer;
    transition: width 0.5 ease height 0.5s ease;
  }
  .outer-cursor {
    position: fixed;
    left: 10px;
    width: $outer_nohover;
    height: $outer_nohover;
    transform: translate(-50%, -50%);
    border: 1px solid $col;
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
  }
  :global(.outer-cursor.grow) {
    width: $inner;
    height: $inner;
    transition: width 0.5 ease height 0.5s ease;
  }
</style>
