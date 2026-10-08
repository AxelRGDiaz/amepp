import { requestWithMetadata } from "@tinacms/astro/data";
import client from "../../tina/__generated__/client";

/** "inicio" es la portada ("/"); el resto de páginas usan su nombre de archivo como URL. */
export const HOME = "inicio";

export const fileForSlug = (slug?: string) => `${slug || HOME}.json`;

export async function loadPage(slug?: string) {
  const res = await requestWithMetadata(
    client.queries.page({ relativePath: fileForSlug(slug) }),
    { priority: "primary" },
  );
  return res.data.page;
}

export async function loadGlobal() {
  const res = await requestWithMetadata(client.queries.global({ relativePath: "global.json" }));
  return res.data.global;
}

export async function loadBulletins() {
  const res = await client.queries.bulletinConnection({ first: 1000 });
  return (res.data.bulletinConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => node != null)
    .sort((a, b) => b.number - a.number);
}

export async function listPageSlugs() {
  const res = await client.queries.pageConnection({ first: 100 });
  return (res.data.pageConnection.edges ?? []).map((edge) => {
    const name = edge!.node!._sys.filename;
    return name === HOME ? undefined : name;
  });
}

export type Page = Awaited<ReturnType<typeof loadPage>>;
export type Global = Awaited<ReturnType<typeof loadGlobal>>;
export type Bulletin = Awaited<ReturnType<typeof loadBulletins>>[number];
export type Block = NonNullable<NonNullable<Page["blocks"]>[number]>;
