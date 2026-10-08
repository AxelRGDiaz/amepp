import { defineConfig, type Template, type TinaField } from "tinacms";

const branch =
  process.env.TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// ---------- Campos reutilizables ----------

const link = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    { type: "string", name: "label", label: "Texto" },
    { type: "string", name: "href", label: "Enlace (URL)" },
  ],
});

const textarea = (name: string, label: string): TinaField => ({
  type: "string",
  name,
  label,
  ui: { component: "textarea" },
});

const itemLabel = (key: string) => ({
  itemProps: (item: Record<string, any>) => ({ label: item?.[key] || "(vacío)" }),
});

// ---------- Bloques (secciones de página) ----------

const hero: Template = {
  name: "hero",
  label: "Portada con imagen de fondo",
  ui: { defaultItem: { title: "Título", layout: "center" } },
  fields: [
    { type: "image", name: "image", label: "Imagen de fondo" },
    {
      type: "string",
      name: "layout",
      label: "Diseño",
      options: [
        { value: "center", label: "Centrado" },
        { value: "split", label: "Título a la izquierda, texto a la derecha" },
        { value: "left", label: "Alineado a la izquierda (oscuro)" },
      ],
    },
    { type: "string", name: "kicker", label: "Antetítulo" },
    { type: "string", name: "title", label: "Título" },
    textarea("text", "Texto"),
    {
      type: "object",
      name: "buttons",
      label: "Botones",
      list: true,
      ui: itemLabel("label"),
      fields: [
        { type: "string", name: "label", label: "Texto" },
        { type: "string", name: "href", label: "Enlace (URL)" },
        {
          type: "string",
          name: "style",
          label: "Estilo",
          options: [
            { value: "primary", label: "Relleno" },
            { value: "outline", label: "Contorno" },
          ],
        },
      ],
    },
  ],
};

const about: Template = {
  name: "about",
  label: "Quiénes somos (logo + texto)",
  fields: [
    { type: "image", name: "image", label: "Imagen / logo" },
    { type: "string", name: "title", label: "Título" },
    textarea("text", "Texto"),
    { type: "boolean", name: "showSocial", label: "Mostrar íconos de redes sociales" },
  ],
};

const benefits: Template = {
  name: "benefits",
  label: "Lista con viñetas (2 columnas)",
  fields: [
    { type: "string", name: "title", label: "Título" },
    {
      type: "object",
      name: "items",
      label: "Elementos",
      list: true,
      ui: itemLabel("strong"),
      fields: [
        { type: "string", name: "strong", label: "Texto en negrita" },
        textarea("text", "Texto normal (continúa después de la negrita)"),
      ],
    },
  ],
};

const quote: Template = {
  name: "quote",
  label: "Cita con foto",
  fields: [
    textarea("text", "Cita"),
    { type: "string", name: "author", label: "Autor" },
    { type: "image", name: "image", label: "Foto" },
    {
      type: "string",
      name: "tone",
      label: "Tono de rojo",
      options: [
        { value: "coral", label: "Rojo anaranjado" },
        { value: "red", label: "Rojo intenso" },
      ],
    },
    {
      type: "string",
      name: "imageSide",
      label: "Posición de la foto",
      options: [
        { value: "right", label: "Derecha" },
        { value: "left", label: "Izquierda" },
      ],
    },
  ],
};

const programs: Template = {
  name: "programs",
  label: "Programas nacionales",
  fields: [
    { type: "string", name: "title", label: "Título" },
    {
      type: "object",
      name: "items",
      label: "Programas",
      list: true,
      ui: itemLabel("strong"),
      fields: [
        {
          type: "string",
          name: "icon",
          label: "Ícono",
          options: [
            { value: "graduate", label: "Graduado" },
            { value: "user", label: "Persona" },
            { value: "certificate", label: "Certificado" },
          ],
        },
        { type: "string", name: "strong", label: "Texto en negrita" },
        { type: "string", name: "text", label: "Texto normal" },
        { type: "string", name: "href", label: "Enlace (opcional)" },
      ],
    },
  ],
};

const contact: Template = {
  name: "contact",
  label: "Contacto y mapa",
  fields: [
    {
      type: "string",
      name: "background",
      label: "Fondo",
      options: [
        { value: "white", label: "Blanco" },
        { value: "red", label: "Rojo" },
      ],
    },
  ],
};

const person: TinaField = {
  type: "object",
  name: "people",
  label: "Personas",
  list: true,
  ui: itemLabel("name"),
  fields: [
    { type: "string", name: "name", label: "Nombre" },
    { type: "string", name: "role", label: "Cargo" },
  ],
};

const people: Template = {
  name: "people",
  label: "Directorio de personas",
  fields: [
    { type: "string", name: "title", label: "Título (opcional)" },
    { type: "boolean", name: "divider", label: "Línea separadora arriba" },
    {
      type: "string",
      name: "layout",
      label: "Diseño",
      options: [
        { value: "center", label: "Centrado" },
        { value: "columns", label: "Dos columnas" },
        { value: "list", label: "Una columna" },
      ],
    },
    person,
    { ...person, name: "peopleRight", label: "Personas (columna derecha, solo en diseño de dos columnas)" } as TinaField,
  ],
};

const headline: Template = {
  name: "headline",
  label: "Título destacado",
  fields: [
    { type: "string", name: "text", label: "Texto" },
    { type: "string", name: "href", label: "Enlace (opcional)" },
  ],
};

const objectives: Template = {
  name: "objectives",
  label: "Objetivos (tarjetas)",
  fields: [
    { type: "string", name: "title", label: "Título" },
    {
      type: "object",
      name: "items",
      label: "Objetivos",
      list: true,
      ui: itemLabel("text"),
      fields: [
        textarea("text", "Texto"),
        { type: "boolean", name: "dark", label: "Tarjeta oscura" },
      ],
    },
  ],
};

const pricing: Template = {
  name: "pricing",
  label: "Membresías (precios)",
  fields: [
    { type: "string", name: "title", label: "Título" },
    {
      type: "object",
      name: "plans",
      label: "Planes",
      list: true,
      ui: itemLabel("name"),
      fields: [
        { type: "string", name: "name", label: "Nombre" },
        { type: "string", name: "price", label: "Precio" },
        { type: "string", name: "subtitle", label: "Subtítulo" },
        textarea("text", "Descripción"),
        link("button", "Botón"),
        { type: "boolean", name: "dark", label: "Tarjeta oscura" },
      ],
    },
  ],
};

const pubHero: Template = {
  name: "pubHero",
  label: "Portada de publicaciones",
  fields: [
    { type: "string", name: "title", label: "Título" },
    { type: "string", name: "subtitle", label: "Subtítulo" },
    { type: "image", name: "badge", label: "Imagen bajo el título" },
    { type: "image", name: "image", label: "Imagen principal" },
    { type: "image", name: "backdrop", label: "Forma de fondo" },
  ],
};

const banner: Template = {
  name: "banner",
  label: "Encabezado centrado",
  fields: [
    { type: "string", name: "line1", label: "Línea 1 (azul)" },
    { type: "string", name: "line2", label: "Línea 2 (roja)" },
    { type: "string", name: "dividerText", label: "Texto de la línea divisoria" },
  ],
};

const bulletins: Template = {
  name: "bulletins",
  label: "Boletines de un año",
  ui: {
    itemProps: (item) => ({ label: `Boletines ${item?.year ?? ""}` }),
  },
  fields: [
    {
      type: "number",
      name: "year",
      label: "Año",
      description: "Muestra los boletines de este año (se editan en la colección «Boletines»).",
    },
    { type: "string", name: "subtitle", label: "Subtítulo" },
    { type: "image", name: "cover", label: "Portada destacada" },
    { type: "string", name: "coverHref", label: "Enlace de la portada (opcional)" },
    {
      type: "string",
      name: "coverSide",
      label: "Posición de la portada",
      options: [
        { value: "right", label: "Derecha" },
        { value: "left", label: "Izquierda" },
      ],
    },
  ],
};

const timeline: Template = {
  name: "timeline",
  label: "Línea de tiempo (pasos)",
  fields: [
    { type: "string", name: "title", label: "Título" },
    {
      type: "object",
      name: "steps",
      label: "Pasos",
      list: true,
      ui: itemLabel("title"),
      fields: [
        { type: "string", name: "kicker", label: "Etiqueta" },
        { type: "string", name: "title", label: "Título" },
        textarea("text", "Texto"),
        { type: "string", name: "href", label: "Enlace (opcional)" },
        {
          type: "string",
          name: "icon",
          label: "Ícono",
          options: [
            { value: "document", label: "Documento" },
            { value: "trophy", label: "Trofeo" },
          ],
        },
      ],
    },
  ],
};

const cards: Template = {
  name: "cards",
  label: "Tarjetas con título",
  fields: [
    { type: "string", name: "anchor", label: "Ancla (id para enlaces #)" },
    { type: "string", name: "title", label: "Título" },
    { type: "boolean", name: "numbered", label: "Numerar tarjetas" },
    { type: "boolean", name: "boxed", label: "Dentro de un recuadro" },
    { type: "image", name: "image", label: "Imagen lateral (opcional)" },
    {
      type: "object",
      name: "items",
      label: "Tarjetas",
      list: true,
      ui: itemLabel("title"),
      fields: [
        { type: "string", name: "title", label: "Título" },
        textarea("text", "Texto"),
      ],
    },
  ],
};

const faq: Template = {
  name: "faq",
  label: "Preguntas frecuentes",
  fields: [
    { type: "string", name: "title", label: "Título" },
    {
      type: "object",
      name: "items",
      label: "Preguntas",
      list: true,
      ui: itemLabel("question"),
      fields: [
        { type: "string", name: "question", label: "Pregunta" },
        textarea("answer", "Respuesta"),
      ],
    },
  ],
};

const cta: Template = {
  name: "cta",
  label: "Llamado a la acción",
  fields: [
    { type: "string", name: "kicker", label: "Antetítulo" },
    { type: "string", name: "title", label: "Título" },
    textarea("text", "Texto"),
    link("button", "Botón"),
    { type: "image", name: "image", label: "Imagen (opcional)" },
  ],
};

// ---------- Configuración ----------

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "page",
        label: "Páginas",
        path: "content/pages",
        format: "json",
        ui: {
          router: ({ document }) =>
            document._sys.filename === "inicio" ? "/" : `/${document._sys.filename}/`,
        },
        fields: [
          { type: "string", name: "title", label: "Título de la página", isTitle: true, required: true },
          textarea("description", "Descripción para Google (SEO)"),
          {
            type: "string",
            name: "theme",
            label: "Tema",
            options: [
              { value: "white", label: "Fondo blanco" },
              { value: "gray", label: "Fondo gris claro" },
              { value: "dark", label: "Oscuro" },
            ],
          },
          {
            type: "object",
            name: "blocks",
            label: "Secciones",
            list: true,
            templates: [
              hero, about, benefits, quote, programs, contact, people, headline,
              objectives, pricing, pubHero, banner, bulletins, timeline, cards, faq, cta,
            ],
          },
        ],
      },
      {
        name: "bulletin",
        label: "Boletines",
        path: "content/boletines",
        format: "json",
        ui: {
          router: () => "/publicaciones/",
          filename: {
            readonly: true,
            slugify: (values) => `${String(values?.number ?? "nuevo").padStart(2, "0")}`,
          },
        },
        fields: [
          { type: "number", name: "number", label: "Número", required: true },
          { type: "string", name: "title", label: "Título", isTitle: true, required: true },
          { type: "number", name: "year", label: "Año", required: true },
          { type: "string", name: "href", label: "Enlace (Google Drive u otro)" },
        ],
      },
      {
        name: "global",
        label: "Ajustes generales",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "siteName", label: "Nombre del sitio" },
          { type: "image", name: "logo", label: "Logo" },
          {
            type: "object",
            name: "nav",
            label: "Menú",
            list: true,
            ui: itemLabel("label"),
            fields: [
              { type: "string", name: "label", label: "Texto" },
              { type: "string", name: "href", label: "Enlace" },
            ],
          },
          { type: "boolean", name: "showSearch", label: "Mostrar buscador" },
          {
            type: "object",
            name: "contact",
            label: "Contacto",
            fields: [
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "city", label: "Ciudad" },
              { type: "string", name: "phone", label: "Teléfono" },
              { type: "string", name: "email", label: "Correo" },
              { type: "string", name: "mapAddress", label: "Dirección para el mapa" },
            ],
          },
          {
            type: "object",
            name: "social",
            label: "Redes sociales",
            list: true,
            ui: itemLabel("network"),
            fields: [
              {
                type: "string",
                name: "network",
                label: "Red",
                options: ["facebook", "twitter", "instagram", "youtube", "linkedin"],
              },
              { type: "string", name: "url", label: "Enlace" },
            ],
          },
          { type: "string", name: "footer", label: "Texto del pie de página" },
        ],
      },
    ],
  },
});
