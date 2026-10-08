// Ruta que usa el editor visual de Tina para volver a dibujar cada zona editable
// mientras se escribe. No afecta a los visitantes: solo responde a peticiones del editor.
import { experimental_createIslandRoute } from "@tinacms/astro/experimental";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import PageBlocks from "../../components/PageBlocks.astro";
import { loadBulletins, loadGlobal, loadPage } from "../../lib/content";

export const prerender = false;

export const POST = experimental_createIslandRoute({
  header: {
    fetch: () => loadGlobal(),
    component: Header,
    wrapper: { tag: "header", className: "site-header" },
    propsFromData: (global, params) => ({ global, path: params.get("path") ?? "/" }),
  },
  page: {
    fetch: async (_request, params) => {
      const [page, global, bulletins] = await Promise.all([
        loadPage(params.get("slug") || undefined),
        loadGlobal(),
        loadBulletins(),
      ]);
      return { page, global, bulletins };
    },
    component: PageBlocks,
    wrapper: { tag: "main", className: "site-main" },
    propsFromData: (data) => data as Record<string, unknown>,
  },
  footer: {
    fetch: () => loadGlobal(),
    component: Footer,
    wrapper: { tag: "footer", className: "site-footer" },
    propsFromData: (global) => ({ global }),
  },
});
