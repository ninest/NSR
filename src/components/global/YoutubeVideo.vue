<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'YouTube video'
    },
  },
  data() {
    return {
      playing: false,
    }
  },
  computed: {
    thumbnail() {
      return `https://i.ytimg.com/vi/${this.id}/hqdefault.jpg`
    },
    embedSrc() {
      return `https://www.youtube.com/embed/${this.id}?autoplay=1`
    },
  },
  methods: {
    play() {
      this.playing = true
    },
  },
}
</script>

<template>
  <div class="youtube-video">
    <button
      v-if="!playing"
      type="button"
      class="youtube-facade"
      :style="{ backgroundImage: 'url(' + thumbnail + ')' }"
      :aria-label="'Play ' + title"
      @click="play"
    >
      <span class="youtube-play"></span>
    </button>
    <iframe
      v-else
      :src="embedSrc"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style lang="scss" scoped>
.youtube-video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;

  iframe,
  .youtube-facade {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .youtube-facade {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    cursor: pointer;
    background-color: #000;
    background-size: cover;
    background-position: center;
  }

  .youtube-play {
    width: 68px;
    height: 48px;
    border-radius: 14%;
    background: rgba(0, 0, 0, 0.7);
    transition: background 0.15s;

    &::before {
      content: '';
      display: block;
      margin: 14px 0 0 27px;
      border-style: solid;
      border-width: 10px 0 10px 18px;
      border-color: transparent transparent transparent #fff;
    }
  }

  .youtube-facade:hover .youtube-play {
    background: #f00;
  }
}
</style>
