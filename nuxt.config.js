import fs from "fs";
import YAML from "yaml";

const file = fs.readFileSync("./siteConfig.yml", "utf8");
const siteConfig = YAML.parse(file);

module.exports = {
  mode: "universal",
  target: "static",
  head: {
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
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

      // INTER UI font
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap",
      // },
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
  ],
  buildModules: [
    "@nuxt/components",
    "@nuxtjs/fontawesome",
  ],
  components: true,
  modules: [
    "@nuxt/content",
    "@nuxtjs/style-resources",
  ],
  // import screen size mixin in all components
  styleResources: {
    scss: [
      "styles/screen.scss",
    ],
  },
  fontawesome: {
    component: 'fa',
    suffix: true,
    icons: {
      solid: [
        'faArrowRight',
        'faRandom',
        'faPlus'
      ],
    }
  },
  build: {
    extend (config, ctx) {
      config.module.rules.push(
        // YAML loader
        {
          test: /\.ya?ml$/,
          type: 'json',
          use: 'yaml-loader'
        }
      )
    }
  },
}