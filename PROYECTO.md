# Contexto del proyecto · Webs para comercios locales (Reus)

Pega este archivo al empezar un chat nuevo con Claude.

## Qué hacemos
Carlos y su compañero buscan comercios locales de Reus sin web, o con una web desactualizada. Les hacemos una maqueta a medida, se la enseñamos en persona y, si les gusta, se la vendemos con un plan de mantenimiento.

- **Primer cliente:** Vintungles, salón de uñas en C/ Sant Vicenç 25. Web hecha y publicada como demo con contraseña.
- **Segundo cliente:** Marta Beauty, en Reus. Parte de la plantilla de Vintungles.
- **Tercer cliente:** Calçats Lorena, zapatería con dos tiendas en Reus (Av. de la Salle, 13 y Pg. de Prim, 4). Parte de la base técnica de Marta Beauty.
- **Cuarto cliente:** Chois Sport, gimnasio en C/ Tetuan, 9 A. Parte de la base técnica de Calçats Lorena. Es el primero que **ya tiene web** (y app).
- **Quinto cliente:** Llibreria i Papereria Cori, Av. del Mediterrani, 7. Parte de la base técnica de Chois Sport.
- **Sexto cliente:** Black House Tattoo Studio, C/ d'Espronceda, 5A. Parte de la base técnica de Cori.

## Stack y entorno
- **Framework:** Astro 7 + Tailwind CSS 4, con las imágenes optimizadas con `<Image>` de `astro:assets`.
- **Equipo de trabajo:** Node 26 LTS, VS Code (extensiones Astro y Tailwind CSS IntelliSense) y Git, en Windows con PowerShell.
- **Carpeta de proyectos:** `X:\CARLOS\Daclos\Pagina_Web_Empresas\` (una subcarpeta por cliente). Claude puede leer y escribir ahí si se conecta la carpeta en la app de escritorio, pero no puede borrar archivos.
- **GitHub:** repos privados en la cuenta `daclos2026-bit`. El compañero usa la misma cuenta, con su propio `user.name` en Git.
- **Hosting:** Cloudflare Pages (preset Astro, `npm run build`, salida `dist`, `NODE_VERSION=26`). Cada push a `main` publica la web sola.
  - Netlify se descartó porque el plan gratuito solo da 300 créditos al mes y cada deploy gasta 15.
- **Demo protegida:** `functions/_middleware.js` pide usuario y contraseña (Basic Auth), con los secretos `DEMO_USER` y `DEMO_PASS` en Cloudflare. Además, `demo: true` en `config.ts` añade `noindex`.
- **Sin base de datos:** las imágenes van en `src/assets/img/`. Si algún día el cliente sube fotos él mismo, se usaría Cloudflare R2.

## Estructura de la plantilla
- `src/config.ts`: datos del negocio.
- `src/i18n/textos.ts`: todos los textos, en catalán y castellano.
- `src/components/`: un componente por sección y Pagina, que los junta (cambian según el cliente).
- `src/scripts/`: lógica propia de cada cliente (`estat.ts`: abierto/cerrado ahora, desde Cori).
- `src/styles/global.css`: colores y tipografías.
- Idiomas: catalán en `/`, castellano en `/es/`.
- Formularios y reservas: abren WhatsApp con el mensaje ya escrito, sin backend.

## Proceso con cada cliente
1. **Investigar con el navegador:**
   - ficha de Google Maps: si está reclamada, el horario, las fotos, la categoría, la accesibilidad y las reseñas originales;
   - redes sociales;
   - menciones en otras webs.
2. **Comprobar que el negocio sigue activo y que las redes son suyas.** Con Vintungles, el Instagram @vintungles era de otro salón del mismo nombre en Valencia.
3. **Ver un plan de diseño antes de programar** (Carlos lo prefiere así):
   - una identidad propia para cada cliente, nada de plantilla genérica;
   - un elemento memorable en la portada (en Vintungles, las 20 uñas de colores).
4. **Maqueta:**
   - reseñas reales con su texto original;
   - fotos de stock de Unsplash, Pexels o Pixabay, apuntadas en `CREDITS.md`;
   - nunca fotos de Pinterest ni con marcas visibles, y nunca presentar fotos de stock como trabajos del cliente.
5. **Publicar la demo con contraseña, revisarla en el móvil e ir a la visita.**

## Precios (hoja de cálculo "Planes y precios · Webs para comercios")
- **Diseño (pago único, + IVA):**
  - Presència: 290 €
  - Negoci: 490 € (el recomendado)
  - Reserves: 790 €
  - Con 12 meses de mantenimiento, el diseño cuesta 100 € menos.
- **Mantenimiento (al mes, + IVA):**
  - Sin mantenimiento: 0 €
  - Manteniment: 25 €
  - Manteniment Plus: 45 €
- **Oferta de lanzamiento para los 3 primeros clientes:** plan Negoci por 290 € y primer mes de mantenimiento gratis. A cambio: enseñar la web en el portfolio, una reseña y un enlace en el pie.
- **Todos los planes incluyen** reclamar y optimizar la ficha de Google Maps.
- **Pendiente antes de facturar:**
  - consultar con una gestoría lo del alta de autónomo (tarifa plana de 88,64 €/mes en 2026);
  - confirmar la compatibilidad con el trabajo de Carlos en el Ayuntamiento.

## Lo aprendido (de Marta Beauty en adelante)
- La búsqueda web casi nunca encuentra a estos negocios: ir directo a la ficha de Google Maps con el navegador integrado y después a Instagram.
- Fotos del propio negocio en Maps: revisar que sean del local y quién las subió. Se bajan con `scripts/descargar-fotos.ps1` (lo lanza Carlos), porque el entorno de Claude no llega a googleusercontent.
- Sin sesión de Google, Maps enseña solo 3-5 reseñas ("vista limitada"); los directorios (ReusShopping, todosbiz, postmapia) dan teléfono, email y más reseñas.
- Diseño propio sacado de las fotos y el logo del local, nunca de las webs anteriores.
- Claude no puede ejecutar comandos en el PC ni borrar archivos: da los comandos de git y Carlos los lanza.
- Cada repo nuevo hay que añadirlo a la app de Cloudflare en GitHub (Settings → Integrations → Cloudflare Workers and Pages → Only select repositories).
- Si la demo da ERR_CONNECTION_TIMED_OUT en fin de semana, es el bloqueo de LaLiga a Cloudflare.

## Para este proyecto (Black House)
- **Negocio:** estudio de tatuajes (las fotos de Maps son de sep-nov 2026), con dos tatuadores: **Nawi** (@nawi_tattoo, realismo black & grey y chicano, unos 4.200 seguidores, clientes desde 2021) y **Paula Danta** (@pauladantattoo, fineline y blackwork). Estudio: @bh.tattoostudio ("Arte, detalle y personalidad", citas por mensaje directo).
- **Google Maps:** reclamada, **5,0 con 23 reseñas** (todas de 5): aquí sí se enseña la nota. La dueña contesta. Sin teléfono; de web pone el Instagram.
- **Ojo:** hay un "Black House Tattoo" en Praga que no tiene nada que ver. En Fresha sale "Tattoo & Piercing Tragus Reus" en Espronceda 5 bajo B con el 674 99 79 13: seguramente el negocio anterior del local. No usarlo.
- **Argumento de venta:** sin web ni teléfono; el negocio está repartido en tres Instagram. Nadie explica quién hace qué estilo, cómo se pide cita o cómo se cuida el tatuaje.
- **Encaja:** plan Negoci (490 €). Más adelante, Reserves si quieren citas con señal online.
- **Identidad:** negro de la fachada, neón magenta (#ff2d95) de la recepción y cian (#3fd9ff) de la cabina, blanco hueso. Archivo ancha (wdth 125) en mayúsculas para los títulos, como el rótulo; Manrope para el texto; Permanent Marker solo para el logo.
- **Elemento memorable:** la línea de neón de la cabina, que se dibuja y parpadea al hacer scroll (un "pulso" en la portada). Además, "Tria el teu artista", que filtra la galería y rellena el formulario.
- **Cita:** sin WhatsApp; el formulario copia el mensaje y abre `ig.me/m/bh.tattoostudio`. Si dan un número, cambiarlo a wa.me.
- **Fotos:** las 8 las subió el estudio a Maps (fachada, cabina, recepción y 5 tatuajes de realismo). Descartada una con un personaje de dibujos animados y el vídeo. Paula aún no tiene fotos en la web: su ficha manda a su Instagram.
- Busca `PENDIENTE` en todo el proyecto.
