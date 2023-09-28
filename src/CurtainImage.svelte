<script>
  let elements = {
    img: null,
    canvas: null,
    plane: null,
  };
  let funcs = {
    start: () => {},
  };
  export let src;
  export let isVideo = false;
  import { Curtains, Plane } from "curtainsjs";
  import { onMount } from "svelte";

  onMount(() => {
    const curtains = new Curtains({
      container: elements.canvas,
    });
    const params = {
      vertexShaderID: "plane-vs",
      fragmentShaderID: "plane-fs",
      uniforms: {
        time: {
          name: "uTime",
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
      })
      .onRender(() => {
        plane.uniforms.time.value++;
      });
  });
</script>

<div id="canvas" bind:this="{elements.canvas}"></div>
<div class="plane" bind:this="{elements.plane}">
  <img
    bind:this="{elements.img}"
    src="/project_images/0f975869b3fb62f329c67861ba56681aea8f0b2011273c023ee0bbefc9a5bff7.png"
    crossorigin=""
  />
</div>
<svelte:head>
  <script id="plane-vs" type="x-shader/x-vertex">
        precision mediump float;

        // default mandatory variables
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        
        // our texture matrix uniform
        uniform mat4 simplePlaneVideoTextureMatrix;

        // custom variables
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;

        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMousePosition;
        uniform float uMouseMoveStrength;


        void main() {

            vec3 vertexPosition = aVertexPosition;

            float distanceFromMouse = distance(uMousePosition, vec2(vertexPosition.x, vertexPosition.y));

            float waveSinusoid = cos(5.0 * (distanceFromMouse - (uTime / 75.0)));

            float distanceStrength = (0.4 / (distanceFromMouse + 0.4));

            float distortionEffect = distanceStrength * waveSinusoid * uMouseMoveStrength;

            vertexPosition.z +=  distortionEffect / 30.0;
            vertexPosition.x +=  (distortionEffect / 30.0 * (uResolution.x / uResolution.y) * (uMousePosition.x - vertexPosition.x));
            vertexPosition.y +=  distortionEffect / 30.0 * (uMousePosition.y - vertexPosition.y);

            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
            vTextureCoord = (simplePlaneVideoTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
            vVertexPosition = vertexPosition;
        }
  </script>
  <script id="plane-fs" type="x-shader/x-fragment">
     precision mediump float;

        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;

        uniform sampler2D simplePlaneVideoTexture;

        void main() {
            // apply our texture
            vec4 finalColor = texture2D(simplePlaneVideoTexture, vTextureCoord);

            // fake shadows based on vertex position along Z axis
            finalColor.rgb -= clamp(-vVertexPosition.z, 0.0, 1.0);
            // fake lights based on vertex position along Z axis
            finalColor.rgb += clamp(vVertexPosition.z, 0.0, 1.0);

            // handling premultiplied alpha (useful if we were using a png with transparency)
            finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);

            gl_FragColor = finalColor;
        }
  </script>
</svelte:head>

<style>
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
</style>
