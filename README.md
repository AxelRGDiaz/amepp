# AMEPP — sitio estático

Copia de https://amepp.org convertida de WordPress/Elementor a HTML estático
(sin PHP ni base de datos).

## Ver en local

```bash
cd ~/Desktop/Personal/kuri
python3 -m http.server 8000
```

Abrir http://localhost:8000

> Hay que usar un servidor (no abrir el `index.html` con doble clic), porque
> las rutas empiezan en `/` y Elementor carga módulos JS bajo demanda.

## Estructura

| Ruta                     | Página          |
|--------------------------|-----------------|
| `index.html`             | Inicio          |
| `nosotros-somos/`        | Nosotros Somos  |
| `publicaciones/`         | Publicaciones   |
| `afiliate/`              | Afíliate        |
| `afiliacion/`            | Afiliación      |
| `wp-content/uploads/`    | Imágenes        |
| `wp-content/`, `wp-includes/` | CSS/JS de Elementor y del tema (solo archivos estáticos) |

## Publicar

Sube la carpeta tal cual a cualquier hosting estático: Netlify, Vercel,
Cloudflare Pages, GitHub Pages o el mismo Apache actual.

## Qué ya no funciona (necesitaba WordPress)

- El buscador del menú (`?s=`), que dependía de la base de datos de WordPress.
- Las estadísticas de Burst Statistics (se quitaron).
