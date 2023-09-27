<script>
  export let project = {};
</script>

<div class="modal_wrapper">
  <div class="modal">
    <div class="right">
      <img src="https://bijou.js.org/bijou.png" alt="" />
    </div>
    <div class="left">
      <div class="meta">
        <h2 class="title">Hello</h2>
      </div>
      <hr />
      <p class="desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illum
        error quae cupiditate? Quis illo ab doloremque dignissimos eos quos
        ipsam facilis labore explicabo, mollitia voluptas, facere quo
        repudiandae recusandae!
      </p>
      <div class="buttons">
        <button class="primary">View work</button>
        <button class="secondary">Code</button>
      </div>
    </div>
  </div>
</div>

<style lang="scss" scoped>
  @import "../main.scss";
  .modal_wrapper {
    border-radius: 0.5em;
    color: white;
    margin: 0 auto;
    $inset: 10px;
    width: calc(100vw - $inset);
    height: calc(100vh - $inset);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before {
      content: "";
      position: absolute;
      inset: -4px;
      border-radius: 0.5rem;
      opacity: 0.2;
      $c: lighten($primary, 20);
      background: linear-gradient(45deg, $c, adjust-hue($c, 30));
      transition: inset 0.3s ease, opacity 0.8s ease;
      display: block;
      padding: 20px;
      z-index: -10;
    }
    &:hover::before {
      inset: -6px;
      opacity: 0.7;
      border-radius: 0.3rem;
    }
    $shadow_color: rgba(lighten($primary, 30), 0.3);
    box-shadow: 0 10px 15px -3px $shadow_color, 0 4px 6px -4px $shadow_color;
    &:hover {
      box-shadow: 0 20px 25px -5px $shadow_color, 0 8px 10px -6px $shadow_color;
    }
    .modal {
      height: 100%;
      border-radius: 0.5em;
      overflow: hidden;
      position: relative;
      display: flex;
      background: lighten($background, 2);
      .right {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .buttons {
        margin-top: 3em;
        display: flex;
        width: 100%;
        gap: .7em;
        button {
          @include button;
        }
      }
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0.5em 1em;
        .meta {
          .title {
            font-size: 2em;
            white-space: nowrap;
            overflow-x: hidden;
            font-weight: 100;
            font-style: italic;
            color: lighten($primary, 40);
          }
        }
        hr {
          width: 100%;
          display: block;
          border: none;
          outline: none;
          height: 1px;
          background: linear-gradient(
            to right,
            $primary,
            adjust-hue($primary, 30)
          );
        }
        .desc {
          margin-top: 1em;
          line-height: 1.5em;
          font-weight: 300;
          font-size: 1.1em;
          color: rgba(lighten($primary, 60), 0.8);
        }
      }
    }
  }
</style>
