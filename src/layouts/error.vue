<script>
export default {
  props: ['error'],
}
</script>

<template>
  <Default
    :title="`Error ${error.statusCode}`"
  >
    <p v-if="error.statusCode===404">
      This page was not found, similar to how you cannot find that Pink IC.
    </p>

    <p v-else>
      An error occured.
    </p>

    <nuxt-link to="/">Go back</nuxt-link>
  </Default>
</template>