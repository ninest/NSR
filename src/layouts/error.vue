<script>
export default {
  props: ['error'],
  mounted () {
    if (this.$route.path.includes('bmt/cqb')) {
      this.$router.push('/basic-military-training')
    }
  }
}
</script>

<template>
  <Default
    :title="`Error ${error.statusCode}`"
  >

    <article>
      <p v-if="error.statusCode===404">
        This page was not found, similar to how you cannot find that Pink IC.
      </p>

      <p v-else>
        An error occured.
      </p>

      <nuxt-link to="/">Go back</nuxt-link>

      <h2>Maybe you meant to go here?</h2>
      <ul>
        <li>
          <nuxt-link to="/basic-military-training">BMT</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/transport-vocation">Transport</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/ranks">Ranks and allowance</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/songs">Songs</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/commands">Commands</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/faq">FAQ</nuxt-link>
        </li>
      </ul>



    </article>
  </Default>
</template>

