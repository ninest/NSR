<script>

export default {
  async asyncData({$content, params}) {
    const slug = params.slug

    let article
    var similarArticles = []

    try {
      article = await $content(`articles/${slug}`)
        .fetch()

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

    } catch (e) {

      console.log("NOT ARTICLE")
      article = await $content(slug)
        .fetch()
        
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
    <div 
      v-for="author in article.authors"
      class="authors"
    >
      <div v-if="author" class="author">
        <div class="name">
          <a :href="author.link" target=_blank>{{ author.name }}</a>
        </div>

        <div class="via">via</div>

        <div class="origin">
          <a :href="author.origin.link" target=_blank>{{ author.origin.title }}</a>
        </div>
      </div>
    </div>
    <article :class="`page-${article.slug}`">
  
      <nuxt-content :document="article"></nuxt-content>
    </article>

    <hr v-if="this.showRelated" />

    <div v-if="this.showRelated" class="similar-articles">
      <section>
        <h3>Related</h3>
        <ArticlePreviewList :articles="sortedSimilar"></ArticlePreviewList>
      </section>
    </div>
  </Default>
</template>

<style lang="scss" scoped>

.author {
  color: var(--text);
  opacity: 0.8;
  font-size: 0.9em;

  display: flex;

  & div + div {
    margin-left: 0.3em;
  }


  .name {
    @include link;
    color: var(--text);
    font-weight: 600;
  }

  .origin {
    font-weight: 400;
  }
}
hr {
  margin: 2.5em 0;
}



</style>