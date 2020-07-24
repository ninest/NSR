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
        <ArticlePreviewList :articles="similarArticles"></ArticlePreviewList>
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