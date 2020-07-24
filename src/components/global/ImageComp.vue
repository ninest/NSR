<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    fullwidth: {
      type: Boolean,
      required: false,
      default: true
    }
  },
}
</script>


<template>
  <div>
    <img :src="require(`~/assets/articles/${path}`)" :class="{ fullwidth: fullwidth }" ></img>
  </div>

</template>

<style lang="scss" scoped>
div {
  img {
    display: block;
    margin: 1em auto;
    max-width: 75%;
    &.fullwidth {
      max-width: 100%;
    }
  }
}
</style>