<script>
export default {
  methods: {
    edit() {
      let currentRoute = this.$router.currentRoute.fullPath.split('/')[1];

      if (currentRoute.includes('#')) {
        currentRoute = currentRoute.split('#')[0]
      }

      this.$router.push({
        name: 'edit',
        path: '/edit',
        params: {
          pageId: currentRoute
        }
      })
    }
  },
}
</script>

<template>
  <div class="edit">
    <button @click="edit" class="light icon-l">
      <fa-icon :icon="['fas', 'pen']" />
      Edit article
    </button>
  </div>
</template>

<style lang="scss" scoped>
button {
  width: 100%;
}
</style>