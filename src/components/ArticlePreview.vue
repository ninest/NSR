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
      const date = new Date(this.date)
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    }
  },
}
</script>

<template>
  <nuxt-link :to="`/${slug}`" class="link-hover article-preview">
    <div class="headline">
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
@import '~/styles/main';

.link-hover {
  text-decoration: none;
  color: inherit;
}

.article-preview {
  display: block;
  padding-bottom: 0.5em;

  .headline {
    display: grid;
    grid-template-columns: 5rem minmax(0, 1fr);
    align-items: baseline;
    column-gap: 0.75rem;

    .date {
      opacity: 0.7;
      font-size: 0.85rem;
    }

    h3 {
      margin: 0;
      font-size: 1rem;
    }
  }

  .tags {
    margin-top: 0.2rem;
    margin-left: 5.75rem;

    .each-tag {
      display: inline-block;
      padding: 0.05rem 0.4rem;
      border-radius: var(--b-r);
      font-size: 0.78rem;
      font-weight: 600;

      & + .each-tag {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
