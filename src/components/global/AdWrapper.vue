<template>
  <div v-if="isProduction" style="margin-top: 1rem">
    <adsbygoogle />
  </div>
</template>

<script>
export default {
  computed: {
    isProduction() {
      return process.env.NODE_ENV === 'production'
    }
  }
}
</script> 