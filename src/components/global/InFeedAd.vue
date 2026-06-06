<template>
  <div
    v-if="isProduction"
    class="in-feed-ad"
  >
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-format="fluid"
      data-ad-layout-key="-hg-1+16-3y+52"
      data-ad-client="ca-pub-3633803003049248"
      data-ad-slot="1839955618"
    ></ins>
  </div>
</template>

<script>
export default {
  computed: {
    isProduction() {
      return process.env.NODE_ENV === 'production'
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
.in-feed-ad {
  margin: 0.8rem 0;
  overflow: hidden;
}
</style>
