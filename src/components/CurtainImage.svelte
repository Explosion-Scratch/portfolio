<script>
  import { vs, fs } from "../helpers/shader";
  import { safeInterval } from "../utils";

  let elements = {
    img: null,
    canvas: null,
    plane: null,
    wrapper: null,
  };
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
  import { onDestroy, onMount } from "svelte";

  onDestroy(() => {
    for (const interval of intervals) {
      clearInterval(interval);
    }
  });
  onMount(() => {
    res.width = elements.img.clientWidth || elements.img.naturalWidth;
    res.height = elements.img.clientHeight || elements.img.naturalHeight;
    elements.img.style.display = "none";
    window.funcs = funcs;
    console.log({ res, src, isVideo, funcs });
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
          if (isVideo) {
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
      let parent = elements.wrapper;
      let rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
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
  });
</script>

<div
  class="wrapper"
  bind:this="{elements.wrapper}"
  on:mousemove="{funcs.mouse}"
  style="--width: {width}px; --height: {height}px;"
>
  <div id="canvas" bind:this="{elements.canvas}"></div>
  <div class="plane" bind:this="{elements.plane}">
    {#if isVideo}
      <video
        bind:this="{elements.img}"
        src="{src}"
        crossorigin=""
        data-sampler="simplePlaneVideoTexture"></video>
    {:else}
      <img
        bind:this="{elements.img}"
        src="{src}"
        crossorigin=""
        data-sampler="simplePlaneVideoTexture"
      />
    {/if}
  </div>
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
