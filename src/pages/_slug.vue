<script>
export default {
  async asyncData({$content, params}) {
    const slug = params.slug

    let article
    let similarArticles

    try {
      article = await $content(`articles/${slug}`)
        .fetch()
      // get similar articles
      similarArticles = await $content(`articles`)
        .where({'tags': {$contains: article.tags}})
        .fetch()
    } catch (e) {
      article = await $content(slug)
        .fetch()
    }   

    
    
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
      return this.similarArticles != null
    }
  },
}
</script>

<template>
  <Default
    :title="article.title"
    :showEditButton="true"
    :toc="article.toc"
  >
    <div v-if="article.author" class="author">
      <a :href="article.author.link" target=_blank>{{ article.author.name }}</a>
    </div>
    <article :class="`page-${article.slug}`">
      <nuxt-content :document="article"></nuxt-content>
    </article>

    <hr v-if="this.showRelated" />

    <div v-if="this.showRelated" class="similar-articles">
      <section>
        <h3>Related</h3>
        <ArticlePreviewList :articles="similarArticles"></ArticlePreviewList>
      </section>
    </div>
  </Default>
</template>

<style lang="scss" scoped>

.author {
  @include link;
  font-size: 1.1em;
  font-weight: 600;
  color: var(--text);
  opacity: 0.8;
}
hr {
  margin: 2.5em 0;
}



</style>