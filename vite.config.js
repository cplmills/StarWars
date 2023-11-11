import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        wishlist: resolve(__dirname, "src/wishlist/index.html"),
        asset: resolve(__dirname, "src/asset/index.html"),
      },
    },
  },
});
