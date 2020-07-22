<template>
  <header>
    <div class="logo link-hover">
      <nuxt-link to="/">
        <img src="@/assets/svg/sar21.svg" alt="Logo" height="20">
      </nuxt-link>
    </div>
    <nav>
      <ul>
        <li>
          <nuxt-link to="/links" class="link-hover">Links</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about" class="link-hover">About</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding: 1.5em var(--side-p);

  display: flex;
  justify-content: space-between;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;

    li {
      font-weight: 600;
      color: var(--nav-link);
    }
    li + li {
      margin-left: 2em;
      @include mobile-screen {
        margin-left: 1.5em;
      }
    }
  }
}
</style>