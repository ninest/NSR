<template>
  <div
    v-if="isProduction"
    :class="['ad-wrapper', placementClass]"
  >
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-3633803003049248"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
export default {
  props: {
    adSlot: {
      type: String,
      required: true,
    },
    placement: {
      type: String,
      required: false,
      default: 'default',
    },
  },
  computed: {
    isProduction() {
      return process.env.NODE_ENV === 'production'
    },
    placementClass() {
      return `ad-wrapper-${this.placement}`
    },
  },
  mounted() {
    if (!this.isProduction) return

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense error:', error)
    }
  },
}
</script>

<style lang="scss" scoped>
.ad-wrapper {
  margin-top: 1rem;
  overflow: hidden;
}

.ad-wrapper-sidebar {
  min-height: 250px;
}

.ad-wrapper-article-bottom {
  margin-top: 2.5rem;
  min-height: 90px;
}

@media screen and (max-width: 950px) {
  .ad-wrapper-sidebar {
    display: none;
  }
}
</style>
