import { defineConfig } from "astro/config";

// Statički izlaz u dist/, poslužuje ga Cloudflare Worker (static assets).
export default defineConfig({
  site: "https://vodic.domovina.ai",
  output: "static",
});
