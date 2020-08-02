<script>
export default {
  props: {
    group: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      events: []
    }
  },
  async fetch() {
    const events = (await this.$content('other/2020-dates')
      .fetch())["events_list"]
    
    const now = new Date()
    
    
    this.events = []
    for (let event of events) {
      // don't show events that have already completed
      if (now < event.start && this.group === event.category)
        this.events.push({
          title: event.title,
          start: new Date(event.start),
          cat: event.category
        })
    }
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
      v-for="event in events" v-bind:key="event.start + event.title + Math.random()"
      :class="`event ${slugify(event.title)}`" 
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;

  @include mobile-screen {
    grid-template-columns: 1fr;
  }

  .event {
    padding: 1em;
    border-radius: var(--b-r);

    background-color: var(--link-hover);

    h3 {
      margin: 0
    }
  }
}

// colors
.light {
  .national-day {
    background-color: var(--red-700);
    color: white;
  }

  .national-day-observed {
    background-color: var(--red-900);
    color: white;
  }

  .deepavali {
    background-color: var(--orange-500)
  }

  .christmas-day {
    background-color: var(--green-300);
  }

  // BMTs
  .pes-ab-bmt-ptp {
    background-color: var(--red-500);
  }

  .pes-ab-bmt {
    background-color: var(--red-800);
    color: white;
  }

  .pes-c-bmt {
    background-color: var(--blue-300);
    // color: white;
  }

  .pes-e-bmt {
    background-color: var(--blue-100);
    // color: white;
  }
}
</style>