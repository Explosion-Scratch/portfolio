<div class="card">
  <h3 class="title">
    {#if $$slots.title}
      <slot name="title" />
    {:else if $$props.title}
      {#if $$props.html}
        {@html $$props.title}
      {:else}
        {$$props.title}
      {/if}
    {/if}
  </h3>
  <div class="bar">
    <div class="emptybar" />
    <div class="filledbar" />
  </div>
  <div class="body">
    {#if $$slots.body}
      <slot name="body" />
    {:else if $$props.body}
      {#if $$props.html}
        {@html $$props.body}
      {:else}
        {$$props.body}
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../main.scss";
  $background: #17141d;
  .card {
    @include glassmorphism;
    display: flex;
    min-height: 280px;
    margin: 0 auto;
    width: 100%;
    border-radius: 10px;
    transition: 0.4s ease-out;
    position: relative;
    left: 0px;
    color: #dcc;
    &:not(:first-child) {
      margin-left: -50px;
    }

    &:hover {
      transform: translateY(-20px);
      transition: 0.4s ease-out;

      ~ .card {
        position: relative;
        left: 50px;
        transition: 0.4s ease-out;
      }
    }
  }
  .card .body {
    position: absolute;
    top: 110px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .card .title {
    color: white;
    font-weight: 300;
    position: absolute;
    left: 20px;
    top: 15px;
  }

  .card .bar {
    position: absolute;
    top: 100px;
    left: 20px;
    height: 5px;
    width: 150px;
  }

  .card .emptybar {
    background-color: #fff1;
    width: 100%;
    height: 100%;
  }

  .card .filledbar {
    position: absolute;
    top: 0px;
    z-index: 3;
    width: 0px;
    height: 100%;
    background: rgb(0, 154, 217);
    background: linear-gradient(
      90deg,
      rgba(0, 154, 217, 1) 0%,
      rgba(217, 147, 0, 1) 65%,
      rgba(255, 186, 0, 1) 100%
    );
    transition: 0.6s ease-out;
  }

  .card:hover .filledbar {
    width: 100%;
    transition: 0.4s ease-out;
  }
</style>
