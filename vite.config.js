import { defineConfig } from "vite";
import nunjucks from "vite-plugin-nunjucks";
import { resolve } from "path";

import doctors from "./src/data/doctors.json";
import services from "./src/data/services.json";

import nunjucksLib from "nunjucks";

const nunjucksEnv = new nunjucksLib.Environment(
  new nunjucksLib.FileSystemLoader(resolve(__dirname, "src"), { noCache: true })
);

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/prozrenie-abh-dev1/" : "/",
  root: "src/pages",
  publicDir: resolve(__dirname, "public"),
  resolve: {
    alias: {
      "/src": resolve(__dirname, "src"),
    },
  },
  plugins: [
    nunjucks({
      nunjucksEnvironment: nunjucksEnv,
      variables: {
        "*": { doctors, services },
      },
    }),
    {
      name: "nunjucks-hmr",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".njk")) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },
  ],
  server: {
    watch: {
      ignored: ["!**/src/**/*.njk"],
    },
  },

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/pages/index.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        blog: resolve(__dirname, "src/pages/blog.html"),
        contacts: resolve(__dirname, "src/pages/contacts.html"),
        faq: resolve(__dirname, "src/pages/faq.html"),
        prices: resolve(__dirname, "src/pages/prices.html"),
        reviews: resolve(__dirname, "src/pages/reviews.html"),
        services: resolve(__dirname, "src/pages/services.html"),
        team: resolve(__dirname, "src/pages/team.html"),
      },
    },
  },
});
