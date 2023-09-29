<script>
  const classes = [
    "flipY",
    "flipX",
    "flipZ",
    "right",
    "left",
    // Lots of rotate
    "rotate",
    "rotate2",
    "rotate",
    "rotate2",
    "scale",
    "up",
    "down",
    "skew1",
    "skew2",
    "skew3",
    "skew4",
  ];
  $: className = classes[Math.floor(Math.random() * classes.length)];
</script>

<span class="animated_icon {className}">
  <slot />
</span>

<style lang="scss" scoped>
  .animated_icon {
    display: inline-block;
    transition: transform 0.2s ease;
    &.flipY,
    &.flipX,
    &.flipZ,
    &.skew1,
    &.skew2 {
      transform-style: preserve-3d;
    }
  }
  .animated_icon:hover,
  :global(.tag:hover .animated_icon), :global(.hover_target:hover .animated_icon) {
    &.rotate {
      transform: rotate(1turn);
    }
    &.rotate2 {
      transform: rotate(2turn);
    }
    &.scale {
      transform: scale(1.5);
    }
    $amount: 3px;
    &.down {
      transform: translateY($amount);
    }
    &.up {
      transform: translateY(-$amount);
    }
    &.right {
      transform: translateX($amount);
    }
    &.left {
      transform: translateX(-$amount);
    }
    &.flipY {
      transform: rotateY(180deg);
    }
    &.flipX {
      transform: rotateX(180deg);
    }
    &.flipZ {
      transform: rotateZ(180deg);
    }
    &.skew1 {
      transform: skew(17deg, 13deg);
    }
    &.skew2 {
      transform: skew(-17deg, -13deg);
    }
    &.skew3 {
      transform: skewX(10deg);
    }
    &.skew4 {
      transform: skewY(10deg);
    }
  }
</style>
