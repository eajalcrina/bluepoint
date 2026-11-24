# Reglas de diseño del sitio de Grupo BluePoint

Este documento recoge las decisiones del sitio, cada una con su fecha. Tiene prioridad sobre las reglas globales cuando choca con ellas. La fuente de contenido es `lib/contenido.ts` y la fuente del proyecto es `../BRIEF.md`.

## Quién decide

| Dominio | Responsable |
|---|---|
| Diseño, textos, publicación | Eddie Ajalcriña |
| Contenido técnico (cifras, fichas, autoridades, bios) | Aníbal Boca Acosta |

Nada se publica sin el «publícalo» de Eddie.

## Marca

**Nombre**
- El nombre es «Grupo BluePoint», con el respaldo «Ambiental y regulatorio».
- Nunca se usa «Bluepoint Advisory» (aprobado el 22-nov-2026).

**Logo** (corregido el 24-nov-2026 por Eddie)
- El logo aprobado es de una sola tinta: marino #0a2050 en positivo y blanco en negativo, como el tablero «Aprobado» del lienzo «Bluepoint · Logo refinado».
- Sobre los fondos oscuros del sitio va el negativo en blanco, con los calados transparentes (`lib/isotipo.ts`, `ISO_NEGATIVO`). El favicon y `public/marca/isotipo.svg` van en positivo.
- Nunca se usa la versión en colores.

**Paleta** (tokens en `app/globals.css`)
- Carbón #0b0e12.
- Carbón 2 #12171d.
- Papel #efefeb.
- Marino en degradado: #18386c → #0d2147 → #070f20, con trama isométrica.
- Acento ámbar #f2a93b, solo como relleno.
- Ámbar oscuro #8a5a10, para texto sobre papel.

**Tipografía**
- Archivo variable en titulares y texto, con titulares a `font-stretch: 112%`.
- JetBrains Mono en rótulos y cifras de la planta.
- Inter Tight 700 y Montserrat 500, solo en el logotipo.

**Rótulos monoespaciados en mayúsculas**
- Son parte de la identidad aprobada y no se cuentan como rastro.
- Llevan el número de sección en ámbar y el nombre, sin «——» ni «·».

## Contenido

- **Textos de Aníbal** (documento del 22-nov-2026):
  - Usados en «Dos miradas», Servicios, Sectores y su bio.
  - El título de Servicios se ajustó para quitar el conteo («Siete líneas de servicio»).
- **Sectores:** pesca industrial, acuicultura, alimentos y bebidas, agroindustria y agroexportación, y manufactura. Textil no va (22-nov-2026).
- **Expertos asociados:** Melissa Flores Morales y Germán Torres Vértiz.
- **TASA:** la bio de Melissa la nombra, con etiqueta junto a SERNANP y PRODUCE (24-nov-2026, decisión de Eddie).
- **Revisión de fichas:** las fichas no llevan sello «revisado» ni `lastReviewed` hasta que Aníbal las firme. La nota dice que están en validación técnica.
- **Textos de Aníbal ajustados:**
  - El título de Servicios.
  - Las cifras del hero con «contribuyó» y «participó».
  - La puntuación de las autoridades de cada ficha, incluida la 12, con comas en lugar de «·».
- **Retratos** (22-nov-2026):
  - Son las fotos originales con el fondo quitado con Vision de macOS.
  - Van sobre el mismo gris, con la misma altura de cara.
  - No se usan los retratos editados con IA que mandó Aníbal, porque muestran el logo viejo «Advisory». Tampoco fondos con logo: desentonan con el resto de las fotos (24-nov-2026).
- **Imágenes:**
  - No se usan imágenes generadas por IA de instituciones reales.
  - Las ilustraciones de «Cómo trabajamos» y «Dos miradas» usan equipos de la misma planta isométrica.
- **Clientes:**
  - Aníbal autorizó publicar Moca Cacao, La Vela Verde, Congeladora Industrial Ilo, Don Ricardo y Fisio Integral.
  - Van en negativo (blanco) sobre una franja carbón, todos con el mismo tratamiento (24-nov-2026, pedido de Eddie). Se generan con `../web/_gen/clientes_negativo.py` desde `../insumos/clientes/`, con sufijo `-negativo` en el nombre.
  - Faltan los logos en vector.
- **Cifras del hero:**
  - Son trayectoria de Aníbal, con la nota de alcance debajo.
  - Están pendientes de su visto bueno antes de publicar.
- **Agenda:** los botones abren la agenda de Google Calendar de Aníbal (`SITIO.reservas`, 24-nov-2026). Si el enlace se vacía, vuelven a WhatsApp.
- **Redes:** LinkedIn de la empresa (grupo-bluepoint-advisory) y Facebook por su id de perfil, sin parámetros de sesión (24-nov-2026).
- **Ilustraciones de etapas y «Dos miradas»** (24-nov-2026, alternativa A elegida por Eddie): cada etapa es una escena isométrica con personas haciendo lo que dice la frase. Salen de `../web/_gen/etapas_alternativas.py` hacia `public/etapas/`. No se usan fotos de stock ni imágenes generadas por IA en estas secciones. El plano de la planta en líneas se mantiene de fondo en «Dos miradas» (pedido de Eddie).
- **Caché de archivos públicos:** una hora con revalidación (`next.config.ts`). Un archivo que cambia de contenido cambia también de nombre, para que nadie vea la versión anterior.

## Planta interactiva

**Origen**
- La planta sale de `../web/_gen/planta_ampliada.py`, que genera la base SVG, la capa animada y la escena.
- `../web/_gen/exportar_sitio.py` la lleva al sitio (`lib/svgs.ts`, `app/planta-animacion.css`, `public/planta/`) y respeta los ajustes de cámara de `data/planta-escena.json`.

**Cámara**
- Escritorio (1024 px o más): calibrada para un visor de 1440 × 920.
  - En las etapas descuenta la lista de la izquierda y la ficha de la derecha.
  - La ficha se puede plegar.
- Celular: calibrada para 390 × 620.
  - La ficha es una hoja inferior con botones ‹ › para pasar de un punto a otro.
  - En celular se ocultan los rótulos de zona, porque se encimaban con los puntos; las etapas ya las nombran los botones.

**Movimiento**
- Botón «Pausar movimiento».
- La planta se pausa sola fuera de pantalla y con `prefers-reduced-motion`.

**Indexación**
- Cada punto tiene su página estática en `/planta/<slug>/`.
- La home enlaza al índice y los servicios enlazan a sus puntos.

## Reglas del dueño que se extienden

| Fecha | Pedido | Regla general |
|---|---|---|
| 22-nov-2026 | Sin razón social ni RUC hasta tenerlos | Ningún dato legal provisional ni corchete visible |
| 22-nov-2026 | Botón de WhatsApp solo con el símbolo | Un botón de icono lleva `aria-label` que dice a dónde lleva |
| 22-nov-2026 | Tira de redes sin recuadros | Íconos ámbar sueltos con separadores finos, también en celular |
| 22-nov-2026 | Crédito de ThousandFold en el pie | «Diseño e implementación: ThousandFold Studio», con enlace a thousandfold.la |

## Falsos positivos conocidos de QA

- `celular.mjs` marca OFFSCREEN en `.mundo` y `.mundo__base`. Es el plano de la planta, que vive dentro de un visor con `overflow: hidden`.
- `celular.mjs` y `accesibilidad.mjs` marcan CLIPPED o TÁCTIL en `.pin`. Los puntos miden entre 26 y 36 px, y su área táctil real mide 22 px más (`.pin::after`).
- `anclas.mjs` marca TAPADA en `#contenido` y en `#pasos-ilustracion` (este último es una referencia SVG, no un ancla). Es el destino de «Saltar al contenido», y la sección ya trae su margen superior.
- `rastros.py` marca anchos fijos en `.mundo` (3540 px) y `.miradas__plano`. Ambos viven dentro de contenedores que los recortan a propósito.

## Estado

- **22-nov-2026, ciclo 1:**
  - Construidos: la home, el índice de la planta, las 24 fichas, el sitemap, robots, llms.txt, la imagen para compartir y la página 404.
  - Repositorio en github.com/eajalcrina/bluepoint (público, rama main).
  - Proyecto de Vercel «grupobluepoint», conectado a main: cada push despliega. Vercel Authentication en «all» (todas las direcciones piden iniciar sesión) hasta que Aníbal apruebe cifras y fichas y Eddie diga «publícalo». Al lanzar: agregar grupobluepoint.pe y bajar la protección.
