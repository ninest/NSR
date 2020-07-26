<script>
export default {
  props: {
    type: {
      type: String,
      default: 'info'
    },
  },
}
</script>

<template>
  <div class="alert" :class="type">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  padding: 1em;
  border-radius: var(--b-r);

  color: var(--alert);
  font-weight: 600;
  p { margin: 0;}

  &.info {
    background-color: rgba(0, 128, 0, 0.24);
  }

  &.warning {
    background-color: rgba(255, 166, 0, 0.288);
  }

  &.error {
    background-color: rgba(255, 0, 0, 0.226);
  }

  &:first-child {
    // if an alert is the first item in a page, make sure it doesn't
    // stick to the author section
    margin-top: 1em;
  }
}
</style>