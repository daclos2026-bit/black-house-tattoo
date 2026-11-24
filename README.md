# Black House Tattoo Studio · web (demo)

Proyecto creado a partir de la base técnica de Cori. Astro 7 + Tailwind CSS 4. Catalán en `/`, castellano en `/es/`.

## Arrancar en local

```powershell
powershell -ExecutionPolicy Bypass -File scripts\descargar-fotos.ps1   # solo la primera vez: baja las fotos a src\assets\img
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

Sin las fotos en `src/assets/img/` la web no compila (las importan los componentes). Súbelas al repo junto con el resto.

## Lo propio de esta web

- **Neón** (`src/components/Neo.astro` + `src/scripts/neo.ts`): la línea de la pared de la cabina. Se dibuja y parpadea al entrar en pantalla.
- **Tria el teu artista** (`src/scripts/artista.ts`): los botones `data-tria` filtran la galería y dejan elegido el artista en el formulario.
- **Cita por Instagram** (`src/components/Cita.astro` + `src/scripts/cita.ts`): no tienen teléfono. El formulario monta el mensaje,
  lo copia y abre `ig.me/m/bh.tattoostudio`. Instagram no deja precargar el texto: por eso se copia.
- **Aviso** en `src/config.ts` → `avis` (flash day, agenda cerrada, el 2x1 de su Instagram…). Push y en un minuto está publicado.

## Qué falta (busca `PENDIENTE` en todo el proyecto: Ctrl+Shift+F en VS Code)

- `src/config.ts` → teléfono o WhatsApp (si quieren), si el horario es de consultas o también de sesiones
- `src/i18n/textos.ts` → textos de cada artista, **respuestas de las preguntas frecuentes** (señal, menores, retoques), autores de las reseñas cortas
- `src/components/Galeria.astro` → confirmar que las fotos son de Nawi y conseguir fotos de Paula
- `src/components/Cures.astro` → que revisen los cuidados
- `src/components/Logo.astro` → logo original
- `src/components/Footer.astro` → páginas legales

## Publicar (GitHub + Cloudflare Pages)

1. Repo privado `daclos2026-bit/black-house-tattoo` (ya creado). Añadirlo a la app de Cloudflare en GitHub (Settings → Integrations → Cloudflare Workers and Pages → Only select repositories).
2. Cloudflare → Workers & Pages → Pages → Import an existing Git repository → `black-house-tattoo`.
   - Framework preset: `Astro` · Build command: `npm run build` · Output: `dist`
3. Settings → Variables and Secrets (Production):
   - `NODE_VERSION` = `26` (Text)
   - `DEMO_USER` y `DEMO_PASS` (Secret) → protegen la demo con contraseña (`functions/_middleware.js`)
4. Cada `git push` a `main` publica la web sola. Si cambias variables, haz *Retry deployment*.

## Cuando el cliente acepte

1. Borrar `functions/_middleware.js` (quita la contraseña).
2. Poner `demo: false` en `src/config.ts` (quita el `noindex`).
3. Dominio propio en Cloudflare → Custom domains.
4. Ficha de Google Maps: añadir el enlace a la web (ahora apunta a Instagram) y, si lo dan, el teléfono.
5. Poner el enlace de la web en la bio de los tres Instagram.
6. Páginas legales, permisos de fotos y Google Search Console.
