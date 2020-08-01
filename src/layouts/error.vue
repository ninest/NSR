<script>
export default {
  props: ['error']
}
</script>

<template>
  <Default
    title="Error"
  >
    <h2>{{error.statusCode}}</h2>
    <p v-if="error.statusCode===404">
      This page was not found, similar to how you cannot find that Pink IC.
    </p>
  </Default>
</template>