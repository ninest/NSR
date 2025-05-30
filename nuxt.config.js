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
    script: process.env.NODE_ENV === 'production' ? [
      {
        // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3633803003049248"
        // crossorigin="anonymous"></script>
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3633803003049248",
        crossorigin: "anonymous",
        async: true,
      },
      {
        type: 'application/ld+json',
        json: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": `${siteConfig.name}`,
          "url": "https://national-service.vercel.app/"
        }
      }
    ] : [
      {
        type: 'application/ld+json',
        json: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": `${siteConfig.name}`,
          "url": "https://national-service.vercel.app/"
        }
      }
    ],
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
      { name: "application-name", content: `${siteConfig.name}` },
      { property: "og:site_name", content: `${siteConfig.name}` },
      { name: "twitter:title", content: `${siteConfig.name}` },
    ],

    link: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },

      // INTER UI font
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap",
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
    "~/plugins/gtag.js",
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
  ],

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
    scss: ["~/styles/screen.scss", "~/styles/mixins.scss", "~/styles/variables.scss"],
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
      
      // Add static pages from siteConfig
      siteConfig.pages.forEach(page => {
        feed.push(`/${page}/`);
      });

      // Add article pages
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
