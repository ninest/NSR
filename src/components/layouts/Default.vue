<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    showAddButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    showEditButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    toc: {
      type: Array,
      required: false,
    },
    showContributionTips: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
}
</script>

<template>
  <Base>
    <Navbar></Navbar>
    <main>

      <div class="content">
        <h1
          v-if="this.title"
          class="page-title"
        >{{ this.title }}</h1>

        <slot></slot>
      </div>

      <div class="sidebar">
        <Toc v-if="toc" :list="toc"></Toc>        
        <Edit v-if="showEditButton"></Edit>
        <Add v-if="showAddButton"></Add>

        <ContributionTips v-if="showContributionTips"></ContributionTips>
        
        <DiscordWidget></DiscordWidget>

        <Links></Links>

      </div>

    </main>
  </Base>
</template>

<style lang="scss" scoped>
main {
  padding: 0 var(--side-p);

  display: grid;
  grid-template-columns: 1fr 250px;
  grid-gap: 5rem;

  // Issue: table causes sidebar to go out of screen on tablet screens

  @include mobile-screen {
    display: block;
    .content { margin-bottom: 2em; }
  }

  .content{
    max-width: 1fr;
    .page-title {
      margin-top: 0;
      margin-bottom: 0.7rem;
    }

    // required to prevent overscrolling page
    min-height: 0;
    min-width: 0;
  }

  .sidebar {
    margin-top: 1rem;

    div + div {
      margin-top: 1.5rem;
    }
  }

  margin-bottom: 5em;
}


</style>