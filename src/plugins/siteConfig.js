import Vue from 'vue';

import content from '../../siteConfig.yml';

// inject for components
Vue.prototype.siteConfig = content;

// inject into context so it can be used in asyncData
export default ({ app }, inject) => {
  app.siteConfig = content;
};
