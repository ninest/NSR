<script>
import Default from '~/components/layouts/Default.vue'
import HubSection from '~/components/HubSection.vue'
import { createSeoHead } from '~/utils/seo'

export default {
  components: {
    Default,
    HubSection
  },
  async asyncData({ $content }) {
    const latestArticles = await $content("articles")
      .sortBy("updated", "desc")
      .sortBy("slug", "asc")
      .only(["title", "displayTitle", "slug", "tags", "created", "updated", "author"])
      .fetch();

    const featuredArticles = await $content("articles")
      .where({ featured: { $eq: true } })
      .sortBy("updated", "desc")
      .sortBy("slug", "asc")
      .only(["title", "displayTitle", "slug", "tags", "created", "updated", "author"])
      .fetch();

    return {
      latestArticles,
      featuredArticles,
    };
  },
  head() {
    return createSeoHead({
      siteConfig: this.siteConfig,
      route: this.$route,
      title: this.siteConfig.name,
      description: this.siteConfig.description,
      titleTemplate: "%s",
    });
  },
};
</script>

<template>
  <Default :showAddButton="true">
    <h1>
      <div class="title">NSR</div>
      <div class="long-title">National Service Resources</div>
    </h1>
    <p class="tagline">Your hub for everything NS in Singapore</p>

    <p class="start-here-cta">
      Unsure where to start? <nuxt-link to="/start-here">Click here</nuxt-link>
    </p>

    <HubSection />

    <section>
      <h2>Featured</h2>
      <ArticlePreviewList :articles="featuredArticles"></ArticlePreviewList>
    </section>

    <section>
      <h2>Latest</h2>
      <ArticlePreviewList
        :articles="latestArticles"
        :showInFeedAds="true"
        :inFeedAdFrequency="10"
      ></ArticlePreviewList>
    </section>
  </Default>
</template>

<style lang="scss" scoped>
.tagline {
  margin-top: -0.4rem;
  margin-bottom: 0.2rem;
  color: var(--nav-link);
  font-size: 0.95rem;
}

.start-here-cta {
  margin-top: 0;
  margin-bottom: 1.2rem;
  color: var(--nav-link);
  font-size: 0.95rem;

  a {
    color: #0e4500;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      background-color: #0e4500;
      color: white;
    }
  }
}

h1 {
  margin-top: 0;
  font-weight: 900;

  .title {
    font-style: italic;
  }

  .long-title {
    display: none;
  }

  &:hover {
    .title {
      display: none;
    }

    .long-title {
      display: block;
      font-style: none;

      color: #0e4500;

      animation: color-changer 3s infinite;
    }
  }
}

@keyframes color-changer {
  0% {
    color: #0e4500;
  }

  25% {
    color: #12115f;
  }

  75% {
    color: #006f68;
  }

  0% {
    color: #0e4500;
  }
}
</style>
