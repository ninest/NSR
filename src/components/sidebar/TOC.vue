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
    <div v-for="item in list" class="link-hover-block">
      <nuxt-link :to="`#${item.id}`">
        {{ item.text }}
      </nuxt-link>
    </div>
    <!-- {{ list }} -->
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 1.1em;
  font-weight: 600;
}
</style>