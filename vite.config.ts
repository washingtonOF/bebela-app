import { defineConfig } from "vite";
const pages = process.env.BEBELA_GITHUB_PAGES === "true";
export default defineConfig({
  base: pages ? "/bebela-app/" : "/",
  build: { sourcemap: false, minify: "esbuild", cssMinify: true },
  plugins: pages ? [{
    name: "bebela-github-pages-assets",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (!/\.(tsx?|css)(\?|$)/.test(id)) return;
      return code.replaceAll(/\/_cdn\/static\/([^"'\s)]+)\.png/g,
        "/bebela-app/_cdn/static/$1.webp");
    },
  }] : [],
});
