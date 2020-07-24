<script>
export default {
  async asyncData({$content}) {
    const latestArticles = await $content('articles')
      .sortBy('createdAt', 'desc')
      .only(['title', 'slug', 'tags', 'createdAt', 'author'])
      .fetch()

    const featuredArticles = await $content('articles')
      .where({'featured': {$eq: true}})
      .only(['title', 'slug', 'tags', 'createdAt', 'author'])
      .fetch()
    
    console.log(latestArticles)

    return {
      latestArticles,
      featuredArticles
    }
  },
  head() {
    return {
      title: "NSR",
      titleTemplate: "%s"
    }
  }
}
</script>

<template>
    <!-- title="NS Resources" -->
  <Default
    :showAddButton="true"
  >

  <h1>NSR</h1>
  
  <section>
    <h2>Featured</h2>
    <ArticlePreviewList :articles="featuredArticles"></ArticlePreviewList>
  </section>

  <section>
    <h2>Latest</h2>
    <ArticlePreviewList :articles="latestArticles"></ArticlePreviewList>
  </section>

  </Default>
</template>

<style lang="scss" scoped>
h1 {
  margin-top: 0;
  font-style: italic;
}
</style>