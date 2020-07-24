<script>
export default {
  data() {
    return {
      online: 0
    }
  },
  async created() {
    if (!process.server) {

      // cache value to prevent calling API every single time
      if (sessionStorage.hasOwnProperty('discord_online')) {
        this.online = sessionStorage.getItem('discord_online')
      } else {
        const url = "https://discordapp.com/api/guilds/692230983650377731/widget.json"
        const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${url}`) 
        const json = await response.json()

        this.online = json['presence_count']
        sessionStorage.setItem('discord_online', this.online)
      }
    }
  }
}
</script>

<template>
  <div class="discord-widget">
    <a href="https://discord.com/invite/jZzsPGS" target="_blank" class="button custom-bg dark icon-l icon-larger">
      <fa-icon :icon="['fab', 'discord']" />
      {{ online }} online
    </a>
  </div>
</template>

<style lang="scss" scoped>
a {
  display: block;
  // discord blue
  background-color: #7680dc;
}
</style>