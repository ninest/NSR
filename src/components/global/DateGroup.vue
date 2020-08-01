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
      loading: true,
      year: null,
      events: null,
      allEvents: null,
    }
  },
  async created() {
    this.loading = true
    
    if (!process.server) {
      // check if it's already there in the cache
      const currentYear = (new Date()).getFullYear()


      if (localStorage.hasOwnProperty(currentYear.toString())) {
        
        // the key is the current year
        this.allEvents = JSON.parse(localStorage.getItem(currentYear.toString()))
        console.log('using cache')

      } else {
        
        console.log('using network')
        const url = "https://ns-enlist.vercel.app/api"
        const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${url}`)
        const json = await response.json()

      // the key is the current year
        localStorage.setItem(
          json["year"].toString(),
          JSON.stringify(json["events_list"])
        )

        console.log(json)

        this.year = json["year"]
        this.allEvents = json["events_list"]
        console.log(this.allEvents)
      }
      

      this.events = []
      console.log(this.allEvents)
      for (let event of this.allEvents) {
        // filiter by event type, PH or BMT
        if (event.category == this.group)
          this.events.push({
            title: event.title,
            start: new Date(event.start),
            cat: event.category
          })
      }
    
    }
    
    this.loading = false
  }
}
</script>

<template>
  <div class="date-group">
    <div v-if="loading">
      Loading ...
    </div>
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