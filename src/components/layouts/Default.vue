<script>
import Base from '~/components/layouts/Base.vue'
import Navbar from '~/components/Navbar.vue'
import Toc from '~/components/sidebar/TOC.vue'
import Edit from '~/components/sidebar/Edit.vue'
import Add from '~/components/sidebar/Add.vue'
import ContributionTips from '~/components/sidebar/ContributionTips.vue'
import DiscordWidget from '~/components/DiscordWidget.vue'
import Links from '~/components/sidebar/Links.vue'

export default {
  components: {
    Base,
    Navbar,
    Toc,
    Edit,
    Add,
    ContributionTips,
    DiscordWidget,
    Links
  },
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
    },
    showContent: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<template>
  <Base>
    <Navbar></Navbar>
    <main>
      <div class="content">
        <h1 v-if="this.title" class="page-title">{{ this.title }}</h1>

        <slot v-if="showContent"></slot>
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
  margin-top: 2rem;
  margin-bottom: 5em;

  @include mobile-screen {
    display: block;
    .content {
      margin-bottom: 2em;
    }
  }

  .content {
    max-width: 100%;
    .page-title {
      margin-top: 0;
      margin-bottom: 0.7rem;
    }

    min-height: 0;
    min-width: 0;
  }

  .sidebar {
    margin-top: 1rem;
    position: sticky;
    top: 100px;
    height: fit-content;

    div + div {
      margin-top: 1.5rem;
    }
  }
}
</style>
