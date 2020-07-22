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
    

    return {
      latestArticles,
      featuredArticles
    }
  }
}
</script>

<template>
  <Default
    title="NS Resources"
    :showAddButton="true"
  >

  <section>
    <h2>Latest</h2>
    <ArticlePreviewList :articles="latestArticles"></ArticlePreviewList>
  </section>

  <section>
    <h2>Featured</h2>
    <ArticlePreviewList :articles="featuredArticles"></ArticlePreviewList>
  </section>


  </Default>
</template>

<style lang="scss" scoped>
</style>