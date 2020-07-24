<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div class="toc">
    <div class="title">On this page</div>
    <div class="list">
      <nuxt-link v-for="item in list"  v-bind:key="item.id"
        :class="`link-hover-block indent-${item.depth}`"
        :to="`#${item.id}`"
      >
          {{ item.text }}
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 1.1em;
  font-weight: 600;
}

.list {
  
  a {
    color: var(--toc-item);
    display: block;
    &.indent-3 {margin-left: 1em; }
    &.indent-4 { margin-left: 2em; }
    &.indent-5 { margin-left: 3em; }
  }

}
</style>