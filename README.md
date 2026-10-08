# AMEPP — sitio web

Sitio de la Asociación Mexicana de Psicólogos y Psicólogas, A.C., hecho con
[Astro](https://astro.build) y editable visualmente con [TinaCMS](https://tina.io).

## Trabajar en local

```bash
npm install
npm run dev
```

- Sitio: http://localhost:4321
- Editor visual: http://localhost:4321/admin (guarda directamente en los archivos de `content/`)

## Dónde está cada cosa

| Carpeta | Contenido |
|---|---|
| `content/pages/` | Una página por archivo (`inicio.json` es la portada) |
| `content/boletines/` | Boletines de Publicaciones (uno por archivo) |
| `content/global/` | Logo, menú, contacto, redes y pie de página |
| `public/uploads/` | Imágenes (las que subas desde el editor quedan aquí) |
| `src/components/blocks/` | Diseño de cada tipo de sección |
| `src/styles/global.css` | Estilos |
| `tina/config.ts` | Campos que se pueden editar en el panel |

## Publicar (Vercel)

Variables de entorno necesarias en Vercel para que el editor funcione en línea:

- `TINA_CLIENT_ID`: Client ID del proyecto en app.tina.io
- `TINA_TOKEN`: token de solo lectura del proyecto en app.tina.io

Sin esas variables el sitio se publica igual, pero `/admin` no podrá guardar.
