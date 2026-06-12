<script>
import Default from '~/components/layouts/Default.vue'
import AdWrapper from '~/components/global/AdWrapper.vue'
import AnchorAd from '~/components/global/AnchorAd.vue'
import { createSeoHead } from '~/utils/seo'

export default {
  components: {
    Default,
    AdWrapper,
    AnchorAd
  },
  async asyncData({ $content, params, redirect, app }) {
    const slug = params.slug;

    let article;
    var similarArticles = [];

    let otherPages = [...app.siteConfig.pages];
    app.siteConfig.redirects.forEach((red) => {
      otherPages = [...otherPages, ...red.from];
    });

    if (!otherPages.includes(slug)) {
      article = await $content(`articles/${slug}`).fetch();

      // get similar articles
      const tags = article.tags;
      for (const tag of tags) {
        const articles = await $content("articles")
          .where({ tags: { $contains: tag } })
          .only(["slug", "title", "displayTitle", "created", "updated", "tags"])
          .fetch();
        similarArticles = similarArticles.concat(articles);
      }

      // remove current article
      similarArticles = similarArticles.filter((ea) => ea.slug != article.slug);
    } else {
      try {
        article = await $content(slug).fetch();
      } catch {
        // need to do some redirects
        for (const link of app.siteConfig.redirects) {
          if (link.from.includes(slug)) {
            return redirect(link.to);
          }
        }
        return redirect("/");
      }
    }

    // remove duplicates from similarArticles
    let removedDuplicates = [];
    let slugs = [];
    for (let article of similarArticles) {
      if (!slugs.includes(article.slug)) {
        removedDuplicates.push(article);
        slugs.push(article.slug);
      }
    }
    similarArticles = removedDuplicates;

    return {
      article,
      similarArticles,
    };
  },
  head() {
    return createSeoHead({
      siteConfig: this.siteConfig,
      route: this.$route,
      title: `${this.article.title}`,
      description: this.article.description,
      app: this.article.app,
      article: this.article.created
        ? {
            datePublished: this.article.created,
            dateModified: this.article.updated || this.article.created,
          }
        : undefined,
    });
  },
  computed: {
    showRelated() {
      return this.similarArticles.length > 0;
    },

    updatedLabel() {
      const date = this.article.updated || this.article.created;
      if (!date) return null;
      const parsed = new Date(date);
      if (isNaN(parsed)) return null;
      return parsed.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    },

    sortedSimilar() {
      return this.similarArticles.sort((first, second) => {
        return new Date(second.updated || second.created) - new Date(first.updated || first.created);
      });
    },
  },
};
</script>

<template>
  <Default
    :title="article.displayTitle || article.title"
    :showEditButton="true"
    :showAddButton="true"
    :toc="article.toc"
  >
    <Authors v-if="article.authors" :authors="article.authors"></Authors>

    <p v-if="updatedLabel" class="article-updated">Updated {{ updatedLabel }}</p>

    <article :class="`page-${article.slug}`">
      <nuxt-content :document="article"></nuxt-content>
    </article>

    <hr v-if="article.contributors" />

    <Authors
      v-if="article.contributors"
      title="Contributors"
      :authors="article.contributors"
    ></Authors>

    <hr v-if="this.showRelated" />

    <div>
      <AdWrapper
        ad-slot="6663230718"
        placement="article-bottom"
      />
    </div>

    <div v-if="this.showRelated" class="similar-articles">
      <section class="related">
        <h3>Related</h3>
        <ArticlePreviewList
          :articles="sortedSimilar"
          :showInFeedAds="true"
          :inFeedAdFrequency="5"
        ></ArticlePreviewList>
      </section>
    </div>

    <AnchorAd />
  </Default>
</template>

<style lang="scss" scoped>
.article-updated {
  margin-top: -0.3rem;
  margin-bottom: 1.4rem;
  font-size: 0.85rem;
  color: var(--nav-link);
}

hr {
  margin: 2.5em 0;
}

iframe {
  width: 100%;
}

.related {
  font-size: 1.1rem;
}
</style>
