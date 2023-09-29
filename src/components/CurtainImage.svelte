<script>
  import { vs, fs } from "../helpers/shader";
  import { safeInterval } from "../utils";

  export const elements = {
    img: null,
    canvas: null,
    plane: null,
    wrapper: null,
  };
  let time;

  safeInterval(() => {
    if (!isVideo) {
      return;
    }
    time = elements.img.currentTime;
  }, 500);

  export const funcs = {
    start: () => {},
    mouse: () => {},
    setResolution: () => {},
    interval: safeInterval(() => {}, 100),
  };
  export let width = 500;
  export let height = 500;
  const res = {
    width: 100,
    height: 100,
  };
  export let src;
  export let isVideo = false;
  import { Curtains, Plane, Vec2 } from "curtainsjs";
  import { onMount } from "svelte";

  let loadPRes;
  let loaded = new Promise((r) => (loadPRes = r));
  onMount(async () => {
    await loaded;
    console.log(
      "Img loaded",
      elements.img.naturalWidth,
      elements.img.naturalHeight,
      elements.img,
    );
    res.width = elements.img.clientWidth || elements.img.naturalWidth;
    res.height = elements.img.clientHeight || elements.img.naturalHeight;
    let aspectRatio = res.height / res.width;
    let originalRes = {
      width: res.width,
      height: res.height,
    };
    elements.img.style.display = "none";
    window.funcs = funcs;
    const mousePosition = new Vec2();
    // we will keep track of the last position in order to calculate the movement strength/delta
    const mouseLastPosition = new Vec2();

    const deltas = {
      max: 0,
      applied: 0,
    };

    const curtains = new Curtains({
      container: elements.canvas,
    });
    const params = {
      watchScroll: false,
      vertexShader: vs,
      fragmentShader: fs,
      widthSegments: 20,
      heightSegments: 20,

      uniforms: {
        resolution: {
          // resolution of our plane
          name: "uResolution",
          type: "2f", // notice this is an length 2 array of floats
          value: [res.width, res.height],
        },
        time: {
          // time uniform that will be updated at each draw call
          name: "uTime",
          type: "1f",
          value: 0,
        },
        mousePosition: {
          // our mouse position
          name: "uMousePosition",
          type: "2f", // again an array of floats
          value: mousePosition,
        },
        mouseMoveStrength: {
          // the mouse move strength
          name: "uMouseMoveStrength",
          type: "1f",
          value: 0,
        },
      },
    };
    const plane = new Plane(curtains, elements.plane, params);
    plane
      .onReady(() => {
        funcs.start = () => {
          if (isVideo || src.endsWith('.gif')) {
            plane.playVideos();
          }
        };
        funcs.start();
      })
      .onRender(() => {
        plane.uniforms.time.value++;
        deltas.applied += (deltas.max - deltas.applied) * 0.02;
        deltas.max += (0 - deltas.max) * 0.01;
        plane.uniforms.mouseMoveStrength.value = deltas.applied;
      })
      .onAfterResize(() => {
        const planeBoundingRect = plane.getBoundingRect();
        plane.uniforms.resolution.value = [
          planeBoundingRect.width,
          planeBoundingRect.height,
        ];
      });

    funcs.interval.set(() => {
      curtains.resize();
      let parent = elements.wrapper.parentElement;
      let rect = parent.getBoundingClientRect();

      // scale = min(dst.width/src.width, dst.height/src.height)

      let scale = Math.min(
        rect.width / originalRes.width,
        rect.height / originalRes.height
      );
      width = originalRes.width * scale;
      height = originalRes.height * scale;

      const planeBoundingRect = plane.getBoundingRect();
      plane.uniforms.resolution.value = [
        planeBoundingRect.width,
        planeBoundingRect.height,
      ];
      res.width = planeBoundingRect.width;
      res.height = planeBoundingRect.height;
    });
    funcs.mouse = (e) => {
      mouseLastPosition.copy(mousePosition);
      const mouse = new Vec2();
      if (e.targetTouches) {
        mouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
      } else {
        mouse.set(e.clientX, e.clientY);
      }
      mousePosition.set(
        curtains.lerp(mousePosition.x, mouse.x, 0.3),
        curtains.lerp(mousePosition.y, mouse.y, 0.3)
      );
      plane.uniforms.mousePosition.value =
        plane.mouseToPlaneCoords(mousePosition);
      if (mouseLastPosition.x && mouseLastPosition.y) {
        let delta =
          Math.sqrt(
            Math.pow(mousePosition.x - mouseLastPosition.x, 2) +
              Math.pow(mousePosition.y - mouseLastPosition.y, 2)
          ) / 30;
        delta = Math.min(4, delta);
        if (delta >= deltas.max) {
          deltas.max = delta;
        }
      }
    };
    funcs.click = (e) => {
      funcs.mouse(e);
      deltas.applied = Math.min(8, Math.max(5, deltas.applied * 2));
    };
  });

  function scrub(e) {
    const percent = e.offsetX / e.target.clientWidth;
    elements.img.currentTime = percent * elements.img.duration;
  }
</script>

<div
  class="wrapper pointer"
  bind:this="{elements.wrapper}"
  on:mousemove="{funcs.mouse}"
  on:click="{funcs.click}"
  style="--width: {width}px; --height: {height}px;"
>
  <div id="canvas" bind:this="{elements.canvas}"></div>
  <div class="plane" bind:this="{elements.plane}">
    {#if isVideo}
      <video
        bind:this="{elements.img}"
        src="{src}"
        crossorigin=""
        on:canplay="{loadPRes}"
        on:load="{loadPRes}"
        autoplay
        data-sampler="simplePlaneVideoTexture"></video>
    {:else}
      <img
        bind:this="{elements.img}"
        src="{src}"
        crossorigin=""
        on:load="{loadPRes}"
        data-sampler="simplePlaneVideoTexture"
      />
    {/if}
  </div>
  {#if isVideo}
    <div class="progress_bar pointer" on:click="{scrub}">
      <div
        class="progress"
        style:width="{(time / elements.img?.duration) * 100 + "%"}"
      ></div>
    </div>
  {/if}
</div>
<svelte:head />

<!-- <style>
  :global(body) {
    position: relative;
    width: 100%;
    height: 100vh;
    margin: 0;
    overflow: hidden;
  }
  #canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .plane {
    width: 80%;
    height: 80vh;
    margin: 10vh auto;
  }
  .plane img {
    display: none;
  }
</style> -->

<style lang="scss">
  @import "../main.scss";
  .wrapper {
    $size: 500px;
    width: var(--width, $size);
    overflow: hidden;
    height: var(--height, $size);
    position: relative;
    box-shadow: rgba($text, 0.3) 0px 6px 24px 0px;
    border: 1px dashed $primary;
    .progress_bar {
      $inset: 5px;
      border-radius: 10000px;
      right: $inset;
      left: $inset;
      bottom: 3px;
      position: absolute;
      display: block;
      height: 5px;
      background: rgba($primary, 0.3);
      transition: height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      &:hover {
        height: 13px;
      }
      .progress {
        display: block;
        height: 100%;
        transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border-radius: 10000px;
        background: linear-gradient(to right, $primaryLight, $secondaryLight);
      }
    }
  }
  #canvas {
    position: absolute;
    $inset: -20px;
    top: $inset;
    right: $inset;
    bottom: $inset;
    left: $inset;
  }
  .plane {
    $inset: -20px;
    width: calc(100% + $inset);
    height: calc(100% + $inset);
    margin-left: calc(0px - calc($inset / 2));
    margin-top: calc(0px - calc($inset / 2));
  }
</style>
