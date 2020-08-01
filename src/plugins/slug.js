import Vue from 'vue';

const slugify = (string) => {
  string = string.toLowerCase()

  // TODO: use better regex
  string = string.replace(/ /g, "-").replace('/', '').replace('(', '').replace(')', '')

  return string
}

// inject for components
Vue.prototype.slugify = slugify