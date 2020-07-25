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

  @include mobile-screen {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }

  .content{
    .page-title {
      margin-top: 0;
      margin-bottom: 0.7rem;
    }
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