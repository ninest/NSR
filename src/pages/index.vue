<script>
export default {
  async asyncData({$content}) {
    const articles = await $content('articles')
      .only(['title', 'slug', 'tags', 'createdAt', 'author'])
      .fetch()
    
    // need to get colors for each tag too
    const tags = (await $content('tags').fetch()).tags
    const colors = {}
    const keys = Object.keys(tags);
    for (var i = 0; i < keys.length; i++) {
      const tagSlug = keys[i]
      colors[tagSlug] = tags[tagSlug].color
    }

    return {
      articles,
      colors
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
    <div class="articles latest">
      <ArticlePreviewList :articles="articles"></ArticlePreviewList>
    </div>
  </section>


  </Default>
</template>

<style lang="scss" scoped>
section {
}
</style>