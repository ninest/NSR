<template>
  <div class="link">
    <ul>
      <li>
        <nuxt-link to="/" class="link-hover">Discord</nuxt-link>
      </li>

      <li>
        <nuxt-link to="/" class="link-hover">r/NSSG</nuxt-link>
      </li>
        
      <li>
        <nuxt-link to="/" class="link-hover">r/SG</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/" class="link-hover">GitHub</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;

  font-weight: 600;
  font-size: 0.9rem;
  color: var(--nav-link);

  li {
    display: inline-block;
  }
  li + li {
    margin-left: 0.5rem;
  }
}
</style>