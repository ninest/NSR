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
    <div class="title">Contents</div>
    <div class="list">
      <div v-for="item in list" 
        :class="`link-hover-block indent-${item.depth}`"
      >
        <nuxt-link :to="`#${item.id}`">
          {{ item.text }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 1.1em;
  font-weight: 600;
}

.list {
  color: var(--toc-item);
  .indent-3 {margin-left: 1em; }
  .indent-4 { margin-left: 2em; }
  .indent-5 { margin-left: 3em; }
}
</style>