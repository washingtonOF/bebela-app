import { defineConfig } from "vite";
const pages = process.env.BEBELA_GITHUB_PAGES === "true";
export default defineConfig({
  base: pages ? "/bebela-app/" : "/",
  plugins: pages ? [{
    name: "bebela-github-pages-assets",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (!/\.(tsx?|css)(\?|$)/.test(id)) return;
      return code.replaceAll("/_cdn/static/", "/bebela-app/_cdn/static/");
    },
  }] : [],
});
