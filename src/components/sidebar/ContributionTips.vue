<script>
export default {
  data() {
    return {
      article: null
    }
  },
  async fetch() {
    const article = await this.$content('contribution-tips').fetch()

    this.article = article
  }
}
</script>

<template>
  <div class="contribution-tips">
    <div v-if="$fetchState.pending">
      Loading ...
    </div>
    <article v-else>
      <nuxt-content :document="this.article"></nuxt-content>
    </article>
  </div>
</template>