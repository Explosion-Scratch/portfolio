<script>
  export let title = "";
  export let body = "";
  export let tags = [];
  export let code = "";
  export let url = "";
  export let image = "";

  let isVideo = false;

  // Check if the image is a video
  $: {
    isVideo = /\.(mp4|mpv|avi|mkv)$/i.test(image);
  }
</script>

<div class="card">
  <div class="media">
    {#if isVideo}
      <video controls>
        <source src="{image}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    {:else}
      <img src="{image}" alt="Card Image" />
    {/if}
  </div>
  <div class="content">
    <h5>{title}</h5>
    <p>{body}</p>
  </div>
  <div class="button">
    <button data-ripple-light="true">Read More</button>
  </div>
</div>

<style scoped lang="scss">
  $primary: #3498db;
  $lightPrimary: lighten($primary, 10%);
  $darkPrimary: darken($primary, 10%);

  .card {
    @apply relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md;

    .header {
      @apply relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600;
    }

    .content {
      @apply p-6;

      h5 {
        @apply mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased;
      }

      p {
        @apply block font-sans text-base font-light leading-relaxed text-inherit antialiased;
      }
    }

    .button {
      @apply p-6 pt-0;

      button {
        @apply select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all;

        &:hover {
          @apply shadow-lg shadow-blue-500/40;
        }

        &:active {
          @apply opacity-85 shadow-none;
        }

        &:focus {
          @apply opacity-85 shadow-none;
        }

        &:disabled {
          @apply pointer-events-none opacity-50 shadow-none;
        }
      }
    }

    .media {
      @apply w-full rounded-xl overflow-hidden;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      img,
      video {
        @apply w-full h-auto;
      }
    }
  }
</style>
