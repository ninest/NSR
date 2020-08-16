<script>

export default {
  async asyncData({$content, params, redirect, app}) {
    const slug = params.slug

    let article
    var similarArticles = []

    let otherPages = [
      ...app.siteConfig.pages
    ]
    app.siteConfig.redirects.forEach((red) => {
      otherPages = [
        ...otherPages,
        ...red.from
      ]
    })


    if (!otherPages.includes(slug)) {
      article = await $content(`articles/${slug}`).fetch()

      // get similar articles
      const tags = article.tags
      for (const tag of tags) {
        const articles = await $content('articles')
          .where({'tags': {$contains: tag}})
          .only(['slug','title', 'created', 'tags'])
          .fetch()
        similarArticles = similarArticles.concat(articles)
      }

      // remove current article
      similarArticles = similarArticles
        .filter((ea) => ea.slug != article.slug)

    } else {
      try {
        article = await $content(slug)
        .fetch()
      } catch {
        // need to do some redirects
        for (const link of app.siteConfig.redirects) {
          if (link.from.includes(slug)) {
            return redirect(link.to)
          }
        }
        return redirect('/')
      }
        
    }   

    // remove duplicates from similarArticles
    let removedDuplicates = []
    let slugs = []
    for (let article of similarArticles) {
      if (!slugs.includes(article.slug)) {
        removedDuplicates.push(article)
        slugs.push(article.slug)
      }
    }
    similarArticles = removedDuplicates

    return {
      article,
      similarArticles
    }
  

  },
  head() {
    return {
      title: `${this.article.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.article.description}`,
        },
      ]
    }
  },
  computed: {
    showRelated() {
      return this.similarArticles.length > 0
    },

    sortedSimilar() {
      return this.similarArticles.sort((first, second) => {
        return new Date(first.created) < new Date(second.created)
      })
    }
  },
}
</script>

<template>
  <Default
    :title="article.title"
    :showEditButton="true"
    :showAddButton="true"
    :toc="article.toc"
  > 

    <Authors
      v-if="article.authors"
      :authors="article.authors"
    ></Authors>

    
    <article :class="`page-${article.slug}`">
      <nuxt-content :document="article"></nuxt-content>
    </article>

    <hr v-if="article.contributors" />

    <Authors 
      v-if="article.contributors" 
      title="Contributors" :authors="article.contributors"
    ></Authors>

    <hr v-if="this.showRelated" />

    <div v-if="this.showRelated" class="similar-articles">
      <section class="related">
        <h3>Related</h3>
        <ArticlePreviewList :articles="sortedSimilar"></ArticlePreviewList>
      </section>
    </div>
  </Default>
</template>

<style lang="scss" scoped>


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