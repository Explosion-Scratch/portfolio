<script>
  import { onMount } from "svelte";
  let CANVAS_EL = null; //Bind in dom
  const resize = () => {
    matrix({
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
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  onMount(() => {
    matrix({
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
      width: window.innerWidth,
      height: window.innerHeight,
    });
    console.log(CANVAS_EL);
  });
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
    const ypos = Array(cols).fill(0);

    // Clear it
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    function _matrix() {
      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, w, h);
      ctx.font = font;
      ypos.forEach((y, ind) => {
        const x = ind * size;
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
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + size;
      });
    }

    window.MATRIX_INTERVAL = setInterval(_matrix, 1000 / fps);
  }
</script>

<svelte:window on:resize={resize} />

<canvas bind:this={CANVAS_EL} />

<style>
  canvas {
    mask-image: linear-gradient(to bottom, #fff 90%, #000);
  }
</style>
