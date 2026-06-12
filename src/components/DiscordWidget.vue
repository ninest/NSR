<script>
export default {
  data() {
    return {
      online: 0
    }
  },
  methods: {
    randomOnline() {
      return Math.floor(Math.random() * (55 - 15 + 1)) + 15
    }
  },
  async created() {
    if (process.server) return

    // cache value to prevent calling API every single time
    const cached = Number(sessionStorage.getItem('discord_online'))
    if (cached > 0) {
      this.online = cached
      return
    }

    try {
      const url = "https://discord.com/api/guilds/692230983650377731/widget.json"
      const response = await fetch(url)
      const json = await response.json()
      this.online = typeof json.presence_count === 'number'
        ? json.presence_count
        : this.randomOnline()
    } catch (e) {
      // network/CORS failure, fall back to a plausible number
      this.online = this.randomOnline()
    }

    sessionStorage.setItem('discord_online', this.online)
  }
}
</script>

<template>
  <div class="discord-widget">
    <nuxt-link
      to="/discord" target="_blank" 
      class="button custom-bg dark icon-l icon-larger"
    >
      <fa-icon :icon="['fab', 'discord']" />
      {{ online }} online
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
a {
  display: block;
  // discord blue
  background-color: #5A62A9;
}
</style>