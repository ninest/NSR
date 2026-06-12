<template>
  <div v-if="visible" class="anchor-ad">
    <button
      class="anchor-ad__close"
      type="button"
      aria-label="Close ad"
      @click="dismiss"
    >&times;</button>
    <ins
      class="adsbygoogle"
      style="display:block; width:100%;"
      data-ad-client="ca-pub-3633803003049248"
      data-ad-slot="8299224621"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
const DISMISS_KEY = 'anchorAdDismissed'

export default {
  data() {
    return {
      isMobile: false,
      dismissed: false,
    }
  },
  computed: {
    isProduction() {
      return process.env.NODE_ENV === 'production'
    },
    visible() {
      return this.isProduction && this.isMobile && !this.dismissed
    },
  },
  mounted() {
    if (!this.isProduction) return

    try {
      this.dismissed = window.sessionStorage.getItem(DISMISS_KEY) === '1'
    } catch (error) {
      // sessionStorage may be unavailable (private mode, etc)
    }

    this.isMobile = window.matchMedia('(max-width: 950px)').matches
    if (!this.visible) return

    // reserve space so the fixed bar doesn't cover page-bottom content
    document.body.style.paddingBottom = '90px'

    this.$nextTick(() => {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    })
  },
  beforeDestroy() {
    document.body.style.paddingBottom = ''
  },
  methods: {
    dismiss() {
      this.dismissed = true
      document.body.style.paddingBottom = ''
      try {
        window.sessionStorage.setItem(DISMISS_KEY, '1')
      } catch (error) {
        // ignore
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.anchor-ad {
  display: none;
}

@media screen and (max-width: 950px) {
  .anchor-ad {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
    padding: 0.25rem 0.5rem;
    min-height: 50px;
    overflow: hidden;
  }

  .anchor-ad__close {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-bottom-left-radius: 6px;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
