<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    // description: {
    //   type: String,
    //   required: true,
    // },
    tags: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
    tagsObject: {
      type: Object,
      required: true,
    }
  },
  computed: {
    formattedDate() {
      return this.formatDate(this.date)
    }
  },
}
</script>

<template>
  <nuxt-link :to="`/${slug}`" class="link-hover article-preview">
    <div class="left">
      <div class="date">{{ this.formattedDate }}</div>
      <h3>{{ this.title }}</h3>
    </div>
    <div class="tags">
      <div
        v-for="tag in this.tags" v-bind:key="tag"
        v-bind:style="{ backgroundColor: 'rgba(' + colors[tag] + ', 0.089)', color: 'rgb(' + colors[tag]+ ')' }"
        class="each-tag"
      >{{ tagsObject[tag].title }}</div>
    </div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
.article-preview {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;

  @include mobile-screen {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 0.2em;
  }

  padding-bottom: 0.5em;


  .left {
    .date {
      opacity: 0.7;
      font-size: 0.9rem;
    }

    h3 {
      margin: 0;
      font-size: 1.1rem;
    }
  } 

  .tags {
    @include not-mobile-screen {
      justify-self: end;
    }

    .each-tag {
      display: inline-block;
      
      padding: 0.1rem 0.5rem;
      border-radius: var(--b-r);

      font-size: 0.85rem;
      font-weight: 600;
      
    }
    .each-tag + .each-tag {
      margin-left: 0.5rem;
      
    }
  }
}
</style>