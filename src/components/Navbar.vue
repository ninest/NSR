<template>
  <header>
    <nuxt-link class="logo link-hover" to="/">
      <img src="@/assets/svg/sar21.svg" alt="Logo" height="20">
      <div class="bullet"></div>
    </nuxt-link>
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

  .logo {
    position: relative;
    display: block;

    &:hover {
      img { 
        z-index: 100;
        animation: shoot 1s infinite; 
      }

      .bullet { 
        z-index: 90;
        animation: bullet 1s infinite; 
      }
    }

    .bullet {

      position: absolute;
      top: 0.60em;
      left: 4em;

      height: 5px;
      width: 7px;
      background: transparent;
      border-radius: 5px;
    }
  }

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

@keyframes shoot {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(-7deg); }
  20% { transform: rotate(5deg); }
  25% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

@keyframes bullet {
  0% {  }
  10% { background: linear-gradient(to bottom left, red, orange); }
  20% {}
  25% {}
  50% { 
    left: 17rem;
    top: 0.50rem;
  }
  100% { background: transparent }
}
</style>