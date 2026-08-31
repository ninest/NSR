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

    <div class="start-here-panel">
      <div class="panel-card">
        <nuxt-link to="/start-here" class="panel-head">
          <div class="text">
            <h2>Start here</h2>
            <p>New to NS? A map to everything on this site.</p>
          </div>
          <div class="arrow">&rarr;</div>
        </nuxt-link>
        <div class="personas">
          <nuxt-link to="/start-here#if-you-are-a-pre-enlistee">Pre-enlistee</nuxt-link>
          <nuxt-link to="/start-here#if-you-are-an-nsf">NSF</nuxt-link>
          <nuxt-link to="/start-here#if-you-are-an-nsman">NSMan</nuxt-link>
          <nuxt-link to="/start-here#if-you-are-a-parent">Parent</nuxt-link>
        </div>
      </div>
    </div>

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

.start-here-panel {
  margin-bottom: 1.2rem;

  a {
    text-decoration: none;
    color: inherit;
  }

  .panel-card {
    padding: 0.9rem 1.1rem;
    background-color: rgba(14, 69, 0, 0.07);
    border-radius: var(--b-r);
    transition: 0.15s background-color;

    &:hover {
      background-color: rgba(14, 69, 0, 0.12);
    }
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    .text {
      h2 {
        margin: 0;
        font-size: 1.3rem;
        color: #0e4500;
        border-bottom: none;
      }

      p {
        margin: 0.2rem 0 0;
        font-size: 0.9rem;
        color: var(--nav-link);
      }
    }

    .arrow {
      font-size: 1.4rem;
      color: #0e4500;
    }
  }

  .personas {
    margin-top: 0.7rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.9rem;

    a {
      font-size: 0.9rem;
      font-weight: 600;
      color: #0e4500;
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        background-color: #0e4500;
        color: white;
      }
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
