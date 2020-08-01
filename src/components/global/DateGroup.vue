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
      year: null,
      events: null,
    }
  },
  async created() {
    if (!process.server) {
      const url = "https://ns-enlist.vercel.app/api"

      const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${url}`)
      const json = await response.json()
      
      this.year = json["year"]

      this.events = []
      for (let event of json["events_list"]) {
        if (event.category == this.group)
          this.events.push({
            title: event.title,
            start: new Date(event.start),
            cat: event.category
          })
      }

      // sort by date
      this.events.sort((a,b) => {
        return a.start > b.start
      })
    }
  }
}
</script>

<template>
  <div class="date-group">

    <div 
      v-for="event in events" v-bind:key="event.start + event.title"
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
}
</style>