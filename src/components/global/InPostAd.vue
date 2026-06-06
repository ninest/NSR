<template>
  <div
    v-if="isProduction"
    class="in-post-ad"
  >
    <ins
      class="adsbygoogle"
      style="display:block; text-align:center;"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-3633803003049248"
      data-ad-slot="8680696134"
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
.in-post-ad {
  margin: 2.5rem 0;
  overflow: hidden;
}
</style>
