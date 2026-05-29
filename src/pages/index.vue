<script>
import Default from '~/components/layouts/Default.vue'
import AdWrapper from '~/components/global/AdWrapper.vue'
import HubSection from '~/components/HubSection.vue'
import { createSeoHead } from '~/utils/seo'

export default {
  components: {
    Default,
    AdWrapper,
    HubSection
  },
  async asyncData({ $content }) {
    const latestArticles = await $content("articles")
      .sortBy("created", "desc")
      .only(["title", "slug", "tags", "created", "author"])
      .fetch();

    const featuredArticles = await $content("articles")
      .where({ featured: { $eq: true } })
      .sortBy("created", "desc")
      .only(["title", "slug", "tags", "created", "author"])
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

    <HubSection />

    <section>
      <h2>Featured</h2>
      <ArticlePreviewList :articles="featuredArticles"></ArticlePreviewList>
    </section>

    <section>
      <h2>Latest</h2>
      <ArticlePreviewList :articles="latestArticles"></ArticlePreviewList>
    </section>
    
    <AdWrapper />
    
  </Default>
</template>

<style lang="scss" scoped>
.tagline {
  margin-top: -0.4rem;
  margin-bottom: 1.2rem;
  color: var(--nav-link);
  font-size: 0.95rem;
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
