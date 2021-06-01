import fs from "fs";
import YAML from "yaml";

const file = fs.readFileSync("./siteConfig.yml", "utf8");
const siteConfig = YAML.parse(file);

// for robots.txt
let redirects = [];
siteConfig.redirects.forEach((red) => {
  red.from.forEach((link) => {
    redirects.push(`/${link}`);
  });
});

module.exports = {
  mode: "universal",
  target: "static",
  head: {
    htmlAttrs: {
      lang: "en",
    },
    title: `${siteConfig.name}`,
    titleTemplate: `%s - ${siteConfig.name}`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: `${siteConfig.description}`,
      },
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },

      // INTER UI font
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap",
      },
    ],

    //light theme by default
    bodyAttrs: {
      class: "light",
    },
  },

  srcDir: "src/",
  plugins: [
    "~/plugins/siteConfig.js",
    "~/plugins/formatDate.js",
    "~/plugins/slug.js",
  ],
  buildModules: [
    "@nuxt/components",
    "@nuxtjs/fontawesome",
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-161514707-1",
      },
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: "G-ZT5H56PKVC",
      },
    ],
    /* <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZT5H56PKVC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZT5H56PKVC');
</script> */
    [
      "@nuxtjs/google-adsense",
      {
        id: "ca-pub-3633803003049248",
      },
    ],
  ],
  components: true,
  modules: [
    "@nuxt/content",
    "@nuxtjs/style-resources",
    "@nuxtjs/sitemap",
    "@nuxtjs/redirect-module",
    "@nuxtjs/robots",
    "@nuxtjs/gtm",
  ],
  gtm: {
    id: "G-ZT5H56PKVC",
  },
  // rewrites
  // redirect: [
  //   { from: '/general/(.*)$', to: '/$1' },
  //   { from: '/bmt/(.*)$', to: '/basic-military-training' },
  // ],

  // robots: {
  // Sitemap: siteConfig.sitemap
  // UserAgent: '*',
  // Disallow: redirects

  // },

  // import screen size mixin in all components
  styleResources: {
    scss: ["styles/screen.scss", "styles/mixins.scss"],
  },
  // nuxt content
  content: {
    markdown: {
      remarkPlugins: ["remark-breaks"],
    },
  },

  sitemap: {
    hostname: "https://national-service.now.sh/",
    routes: async () => {
      const { $content } = require("@nuxt/content");
      const articles = await $content("articles").fetch();

      let feed = ["/", "/add/"];
      articles.forEach((art) => {
        feed.push(`/${art.slug}/`);
      });
      return feed;
    },
  },

  fontawesome: {
    component: "fa",
    suffix: true,
    icons: {
      solid: ["faArrowRight", "faRandom", "faPlus", "faPen"],
      brands: ["faDiscord"],
    },
  },
  router: {
    // middleware: 'maintenance'
  },
  build: {
    extend(config, ctx) {
      config.module.rules.push(
        // YAML loader
        {
          test: /\.ya?ml$/,
          type: "json",
          use: "yaml-loader",
        }
      );
    },
  },
};
