import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "esnext",
    minify: "esbuild",
  },
  // GitHub Pages serves this as a project site under /portfolio/; every
  // other host (Cloudflare Workers Builds, local dev) serves it from the
  // domain root. GITHUB_ACTIONS is always set to "true" by GitHub's own
  // runners, unlike Cloudflare-specific env vars which vary by build system.
  base: process.env.GITHUB_ACTIONS ? "/portfolio/" : "/",
});
