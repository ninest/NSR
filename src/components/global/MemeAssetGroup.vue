<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    },
    lessdense: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<template>
  <div 
    class="meme-asset-group"
    :class="{ 'less-dense': lessdense }"
  >
    <div
      v-for="image in group.images"
      v-bind:key="image.path"
      class="meme"
    >
      <h3>{{ image.title }}</h3>
      <img 
        :src="require(`~/assets/articles/meme-assets/${image.path}`)" :alt="image.title" 
        :class="{ 'less-dense': lessdense }"
      />

      <a 
        :href="require(`~/assets/articles/meme-assets/${image.path}`)" 
        :download="image.path"
        class="button"
      >
        Download
      </a>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/main';

.meme-asset-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;

  &.less-dense {
    grid-template-columns: 1fr 1fr;
  }

  @include mobile-screen {
    grid-template-columns: 1fr !important;
  }

  .meme {
    display: flex;
    flex-direction: column;

    h3 {
      margin: 0;
    }

    img {
      margin: 2em;
      width: calc(100% - 2 * 2em);

      &.less-dense {
        margin: 1em;
        width: calc(100% - 2 * 1em);
      }
    }

    a {
      margin-top: auto;
    }
  }
}
</style>