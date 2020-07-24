<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    },
  },
}
</script>

<template>
  <div class="meme-asset-group">
    <div
      v-for="image in group.images"
      v-bind:key="image.path"
      class="meme"
    >
      <h3>{{ image.title }}</h3>
      <img :src="require(`~/assets/articles/meme-assets/${image.path}`)" :alt="image.title" />

      <a 
        :href="require(`~/assets/articles/meme-assets/${image.path}`)" 
        download
        class="button"
      >
        Download
      </a>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.meme-asset-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @include mobile-screen {
    grid-template-columns: 1fr;
  }
  grid-gap: 1em;

  .meme {
    display: flex;
    flex-direction: column;
    // background-color: red;

    h3 {
      margin: 0;
    }

    img {
      margin: 3em;
      width: calc(100% - 2 * 3em);
    }

    a {
      
      margin-top: auto;
    }
  }
}
</style>