import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "esnext",
    minify: "esbuild",
  },
  // GitHub Pages serves this as a project site under /portfolio/, but
  // Cloudflare Pages serves it from the domain root — CF_PAGES is set
  // automatically in Cloudflare's build environment.
  base: process.env.CF_PAGES ? "/" : "/portfolio/",
});
