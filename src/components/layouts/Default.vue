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
        <Add v-if="showAddButton"></Add>

        <Edit v-if="showEditButton"></Edit>

        <Toc v-if="toc" :list="toc"></Toc>

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
  grid-gap: 2rem;

  @include mobile-screen {
    grid-template-columns: 1fr;
  }

  .content{
    .page-title {
      margin-top: 0;
    }
  }

  .sidebar {
    margin-top: 1rem;

    div + div {
      margin-top: 2rem;
    }
  }

  margin-bottom: 5em;
}
</style>