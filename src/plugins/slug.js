import Vue from 'vue';

const slugify = (string) => {
  string = string.toLowerCase()
  string = string.replace(/ /g, "-")

  return string
}

// inject for components
Vue.prototype.slugify = slugify