<script>
export default {
  data() {
    return {
      events: []
    }
  },
  async fetch() {
    const events = (await this.$content('other/2025-dates')
      .fetch()).result.items
    
    const now = new Date()
    
    this.events = events.map(event => {
      const date = new Date(event.eventStart)
      // Adjust for timezone to get correct local date
      const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
      return {
        title: event.title,
        start: localDate,
        type: event.eventType
      }
    })
    .filter(event => now < event.start)
    .sort((a, b) => a.start - b.start)
  }
}
</script>

<template>
  <div class="date-group">
    <div v-if="$fetchState.pending">
      Loading ...
    </div>
    <div 
      v-else
      v-for="event in events" 
      v-bind:key="event.start + event.title"
      :class="`event ${event.type === 'Public Holiday' ? 'holiday' : 'regular'}`"
    >
      <div class="date">{{ formatDate(event.start) }}</div>
      <h3>{{ event.title }}</h3>
      <div class="day">{{ getDay(event.start) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;

  @include mobile-screen {
    grid-template-columns: 1fr;
  }

  .event {
    padding: 1em;
    border-radius: var(--b-r);
    background-color: #f5f5f5;

    h3 {
      margin: 0
    }
  }

  .holiday {
    background-color: var(--green-300);
  }

  .regular {
    background-color: #f5f5f5;
  }
}
</style>