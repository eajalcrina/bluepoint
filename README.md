# Sitio de Grupo BluePoint

Este es el sitio de Grupo BluePoint (grupobluepoint.pe), una consultora ambiental y regulatoria de Lima. Está hecho con Next.js 16 y React 19, en páginas estáticas. Diseño e implementación: ThousandFold Studio.

## Comandos

- `npm run dev`: servidor de desarrollo en http://localhost:3200.
- `npm run build` y luego `npm start`: compilación de producción. El control de calidad se corre siempre contra esta compilación.
- `npm test`: pruebas de datos y de reglas de texto.
- `npm run lint`: revisión del código.

## Dónde está cada cosa

- `lib/contenido.ts`: todos los textos del sitio. Para cambiar un texto, se edita aquí.
- `data/fichas.json`: las 24 fichas de la planta. Su texto lo valida Aníbal.
- `lib/svgs.ts`, `data/planta-*`, `app/planta-animacion.css` y `public/planta/*.svg`: la planta isométrica. No se editan a mano: salen de `../web/_gen/planta_ampliada.py`.
- `components/Planta.tsx`: la planta interactiva, con su cámara, sus etapas y su ficha.
- `app/planta/[slug]/`: una página estática por cada ficha.
- `app/llms.txt`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` y `lib/jsonld.ts`: SEO y GEO.
- `docs/reglas-diseno.md`: las decisiones de diseño, con su fecha.

## Pendientes antes de publicar

- El visto bueno de Aníbal a las cifras del hero y a las 24 fichas.
- El enlace de reservas, que va en `SITIO.reservas` dentro de `lib/contenido.ts`.
- Los logos de los clientes en vector.
- El dominio grupobluepoint.pe en Vercel y el correo contacto@grupobluepoint.pe.

## Google Drive

El proyecto vive en una carpeta que Google Drive espeja, y Drive crea archivos `Icon\r` que rompen la compilación. Antes de compilar, se borran con:

    find . -name $'Icon\r' -not -path "./node_modules/*" -delete
