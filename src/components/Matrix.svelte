<script>
  import { onMount } from "svelte";
  let CANVAS_EL = null; //Bind in dom
  export let settings = {};
  $: _settings = {
    el: CANVAS_EL,
    color: ({ x, y, width, height }) => {
      // Nice diagonal gradient:
      // y / height = percentage down, toString(16) = hex char
      return `#${Math.floor((y / height) * 16).toString(16)}f${Math.floor(
        (x / width) * 16
      ).toString(16)}`;
    },
    font: "8px monospace",
    fps: 20,
    size: 8,
    width: () => window.innerWidth,
    height: () => window.innerHeight,
    ...settings,
  };

  const resize = () => {
    matrix({
      ..._settings,
      height: _settings.height(),
      width: _settings.width(),
    });
  };

  onMount(() => {
    // We can just run the resize function =P
    resize();
    console.log(CANVAS_EL);
  });
  let timeout;
  function handleScroll() {
    let visible = inView(CANVAS_EL);
    if (window.MATRIX_INTERVAL && !visible) {
      timeout = setTimeout(() => {
        clearInterval(window.MATRIX_INTERVAL);
        window.MATRIX_INTERVAL = null;
      }, 5000);
    }
    if (!window.MATRIX_INTERVAL && visible) {
      clearTimeout(timeout);
      resize();
    }
  }
  function matrix({
    selector = "canvas",
    el = null,
    color = "#0e0",
    font = "15pt monospace",
    fps = 40,
    size = 20,
    width = null,
    height = null,
    getChar = () => String.fromCharCode(Math.random() * 128),
  } = {}) {
    const canvas = el || document.querySelector(selector);
    if (window.MATRIX_INTERVAL) {
      clearInterval(window.MATRIX_INTERVAL);
    }
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = width || canvas.parentElement.offsetWidth);
    const h = (canvas.height = height || canvas.parentElement.offsetHeight);
    const cols = Math.floor(w / size) + 1;
    const ypos = [
      ...Array(cols).fill(0),
      ...Array(Math.floor(cols)).fill(Math.random() * height * size),
    ];

    // Clear it
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    function _matrix() {
      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, w, h);
      ctx.font = font;
      ypos.forEach((y, ind) => {
        const x = (ind % cols) * size;
        // This is what gets passed to the functions
        const args = {
          x,
          y,
          width: w,
          height: h,
        };
        const text = getChar(args);
        let col;
        if (typeof color === "function") {
          col = color(args);
        } else {
          col = color;
        }
        ctx.fillStyle = col;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) {
          ypos[ind] =
            ind > cols ? Math.floor((1 - Math.pow(Math.random(), 3)) * height * size) : 0;
        } else {
          ypos[ind] = y + size;
        }
      });
    }

    window.MATRIX_INTERVAL = setInterval(_matrix, 1000 / fps);
  }
  function inView(elem) {
    let x = elem.getBoundingClientRect().left;
    let y = elem.getBoundingClientRect().top;
    let ww = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    let hw = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    let w = elem.clientWidth;
    let h = elem.clientHeight;
    return y < hw && y + h > 0 && x < ww && x + w > 0;
  }
</script>

<svelte:window on:resize="{resize}" on:scroll="{handleScroll}" />

<canvas bind:this="{CANVAS_EL}"></canvas>

<style lang="scss">
  @import "../main.scss";
  canvas {
    @include fade-out;
  }
</style>
