<script>
export default {
  async asyncData({$content, params}) {
    const slug = params.slug
    const article = await $content(`articles/${slug}`)
      .fetch()

    // get similar articles
    const similarArticles = await $content(`articles`)
      .where({'tags': {$contains: article.tags}})
      .fetch()
    
    
    return {
      article,
      similarArticles
    }
  }
}
</script>

<template>
  <Default
    :title="article.title"
    :showEditButton="true"
    :toc="article.toc"
  >
    <article>
      <nuxt-content :document="article"></nuxt-content>
    </article>

    <hr />

    <div class="similar-articles">
      <section>
        <h3>Related</h3>
        <ArticlePreviewList :articles="similarArticles"></ArticlePreviewList>
      </section>
    </div>
  </Default>
</template>

<style lang="scss" scoped>
hr {
  margin: 2.5em 0;
}
</style>