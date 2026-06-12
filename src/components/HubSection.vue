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
      vocations: [
        { slug: "infantry-vocation", title: "Infantry", blurb: "IVT, the SIR battalions, outfields, and stay-in life." },
        { slug: "guards-vocation", title: "Guards", blurb: "Elite infantry, GVT, and the khaki beret." },
        { slug: "armour-vocation", title: "Armour", blurb: "Tank operator vs armoured infantry, and overseas exercises." },
        { slug: "island-defence-vocation", title: "Island Defence", blurb: "Security trooper guard duty, shift work, and IDTI." },
        { slug: "medic-vocation", title: "Medic", blurb: "Combat vs clinic medic, the EMT course, and a WSQ cert." },
        { slug: "transport-vocation", title: "Transport", blurb: "Driving course, nights out, and a driving licence." },
        { slug: "logistics-vocation", title: "Logistics", blurb: "Supply assistant (storeman) and clerk (ASA) life." },
      ],
      guides: [
        { slug: "ranks", title: "Ranks" },
        { slug: "pes", title: "PES status" },
        { slug: "nsf-allowance", title: "NSF allowance" },
        { slug: "lingo", title: "Army lingo" },
        { slug: "songs", title: "Songs" },
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

    <nuxt-link to="/vocations" class="bmt-banner vocations-banner">
      <div class="text">
        <h2>Vocations</h2>
        <p>How postings work and every NS vocation, with in-depth guides.</p>
      </div>
      <div class="arrow">&rarr;</div>
    </nuxt-link>

    <div class="secondary">
      <nuxt-link
        v-for="vocation in vocations" v-bind:key="vocation.slug"
        :to="`/${vocation.slug}`"
        class="hub-card"
      >
        <div class="head">
          <h3>{{ vocation.title }}</h3>
          <span class="arrow">&rarr;</span>
        </div>
        <p>{{ vocation.blurb }}</p>
      </nuxt-link>
    </div>

    <div class="guides">
      <span class="guides-label">Other guides</span>
      <nuxt-link
        v-for="guide in guides" v-bind:key="guide.slug"
        :to="`/${guide.slug}`"
        class="guide-link"
      >{{ guide.title }}</nuxt-link>
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

  .vocations-banner {
    margin-top: 1.2rem;
    padding: 0.6rem 0.9rem;
    background-color: var(--white-2);

    &:hover {
      background-color: var(--white-3);
    }

    .text {
      h2 {
        font-size: 1.05rem;
        color: inherit;
      }

      p {
        font-size: 0.85rem;
      }
    }

    .arrow {
      font-size: 1.1rem;
      color: var(--nav-link);
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

  .guides {
    margin-top: 1.2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.4rem 0.9rem;

    .guides-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--nav-link);
    }

    .guide-link {
      font-size: 0.9rem;
      color: #0e4500;
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        background-color: #0e4500;
        color: white;
      }
    }
  }
}
</style>
