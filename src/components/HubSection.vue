<script>
export default {
  data() {
    return {
      hubs: [
        { slug: "scs-hub", title: "SCS", blurb: "Selection, Foundation & Professional terms, postings, 3SG life." },
        { slug: "ord-countdown", title: "ORD", blurb: "Count the days left to your ORD." },
        { slug: "ippt", title: "IPPT", blurb: "Calculate your score and award bands." },
        { slug: "faq", title: "FAQ", blurb: "Common NS questions, answered." },
      ],
    }
  },
}
</script>

<template>
  <section class="hubs">
    <nuxt-link to="/bmt-hub" class="bmt-banner">
      <div class="text">
        <h2>BMT Hub</h2>
        <p>Enlistment, packing list, field camp, POP, money, and NS pathways.</p>
      </div>
      <div class="arrow">&rarr;</div>
    </nuxt-link>

    <div class="secondary">
      <nuxt-link
        v-for="hub in hubs" v-bind:key="hub.slug"
        :to="`/${hub.slug}`"
        class="hub-card"
      >
        <div class="head">
          <h3>{{ hub.title }}</h3>
          <span class="arrow">&rarr;</span>
        </div>
        <p>{{ hub.blurb }}</p>
      </nuxt-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '~/styles/main';

.hubs {
  a {
    text-decoration: none;
    color: inherit;
  }

  .bmt-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    padding: 0.9rem 1.1rem;
    background-color: rgba(14, 69, 0, 0.07);
    border-radius: var(--b-r);
    transition: 0.15s background-color;

    &:hover {
      background-color: rgba(14, 69, 0, 0.12);
    }

    .text {
      h2 {
        margin: 0;
        font-size: 1.3rem;
        color: #0e4500;
        border-bottom: none;
      }

      p {
        margin: 0.2rem 0 0;
        font-size: 0.9rem;
        color: var(--nav-link);
      }
    }

    .arrow {
      font-size: 1.4rem;
      color: #0e4500;
    }
  }

  .secondary {
    margin-top: 0.6rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.6rem;

    @include mobile-screen {
      grid-template-columns: repeat(2, 1fr);
    }

    .hub-card {
      display: block;
      padding: 0.6rem 0.75rem;
      background-color: var(--white-2);
      border-radius: var(--b-r);
      transition: 0.15s background-color;

      &:hover {
        background-color: var(--white-3);
      }

      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      h3 {
        margin: 0;
        font-size: 0.95rem;
      }

      .arrow {
        color: var(--nav-link);
        line-height: 1;
      }

      p {
        margin: 0.2rem 0 0;
        font-size: 0.8rem;
        line-height: 1.3;
        color: var(--nav-link);
      }
    }
  }
}
</style>
