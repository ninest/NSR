<script>
export default {
  methods: {
    edit() {
      this.$router.push('/contribute')
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