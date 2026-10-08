import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

export default defineConfig({
  site: "https://amepp.org",
  output: "static",
  // El adaptador solo se usa para la ruta de edición visual (/tina-island/*);
  // todas las páginas públicas se generan como HTML estático.
  adapter: vercel(),
  integrations: [tina()],
  devToolbar: { enabled: false },
  vite: { plugins: [tinaAdminDevRedirect()] },
});
