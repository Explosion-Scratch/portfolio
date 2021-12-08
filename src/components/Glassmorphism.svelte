<div {...$$props} data-glassmorphism><slot /></div>

<style lang="scss">
  div {
    backdrop-filter: blur(var(--blur, 2px)) saturate(200%);
    -webkit-backdrop-filter: blur(14px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.63);
    border: 1px solid rgba(255, 255, 255, 0.125);
    color: white;
  }
</style>
