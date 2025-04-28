<template>
  <div class="base-layout">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import '~/styles/main';
@import '~/assets/styles/normalize.css';

.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>