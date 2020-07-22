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
      <ArticlePreview 
        v-for="article in articles" v-bind:key="article.slug"
        :title="article.title"
        :slug="article.slug"
        :date="article.createdAt"
        :tags="article.tags"
        :colors="colors"
      >
      </ArticlePreview>
    </div>
  </section>


  </Default>
</template>

<style lang="scss" scoped>
section {
  .articles {

    // spacing between articles above/below each other
    a + a {
      margin-top: 1rem;
    }
  }
}
</style>