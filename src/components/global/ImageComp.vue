<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    reset: {
      type: Boolean,
      default: false,
    },
    fullwidth: {
      type: Boolean,
      required: false,
      default: true
    },
    rank: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    expand() {
      this.expanded = !this.expanded
    }
  },
}
</script>


<template>
  <div>
    <img 
      :src="require(`~/assets/articles/${path}`)" 
      :class="{ fullwidth: fullwidth, reset: reset, rank: rank, expanded: expanded }" 
      @click="rank ? expand() : null"
    ></img>
  </div>

</template>

<style lang="scss" scoped>
div {
  img {
    &:not(.reset){
      display: block;
      margin: 1em auto;
      max-width: 75%;
      &.fullwidth {
        max-width: 100%;
      }
    }

    &.rank {
      height: 100px;
      transition: 0.1s all;

      &.expanded {
        height: 350px;
      }
    }
  }
}
</style>