<script>
import InFeedAd from '~/components/global/InFeedAd.vue'

export default {
  components: {
    InFeedAd,
  },
  props: {
    articles: {
      type: Array,
      required: true,
    },
    showInFeedAds: {
      type: Boolean,
      required: false,
      default: false,
    },
    inFeedAdFrequency: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  data() {
    return {
      tags: {},
      colors: {}
    }
  },
  async fetch() {
    const tags = (await this.$content('tags').fetch()).tags
    this.tags = tags
    
    // keys are the slugs
    const keys = Object.keys(tags);

    for (var i = 0; i < keys.length; i++) {
      const tagSlug = keys[i]
      this.colors[tagSlug] = tags[tagSlug].color
    }
  },
  methods: {
    shouldShowInFeedAd(index) {
      return this.showInFeedAds &&
        this.inFeedAdFrequency > 0 &&
        (index + 1) % this.inFeedAdFrequency === 0 &&
        index < this.articles.length - 1
    },
  }
}
</script>

<template>
  <div class="article-list">
    <div v-if="$fetchState.pending">Loading articles ...</div>
    <template v-else>
      <template v-for="(article, index) in articles">
        <ArticlePreview
          v-bind:key="article.slug"
          :title="article.displayTitle || article.title"
          :slug="article.slug"
          :date="article.created"
          :tags="article.tags"
          :colors="colors"

          :tagsObject="tags"
        >
        </ArticlePreview>
        <InFeedAd
          v-if="shouldShowInFeedAd(index)"
          v-bind:key="`in-feed-ad-${article.slug}`"
        />
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.article-list {
  // spacing between articles above/below each other
  a + a,
  a + .in-feed-ad,
  .in-feed-ad + a {
    margin-top: 0.4rem;
  }
}
</style>
