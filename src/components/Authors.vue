<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    authors: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div class="authors">
    <div v-if="title" class="title">{{ title }}</div>
    <div v-for="author in authors">
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
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-weight: bold;
}

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
</style>