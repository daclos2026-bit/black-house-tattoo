// Datos del negocio en un único sitio. Sacados de su ficha de Google Maps (reclamada) y de sus
// Instagram: @bh.tattoostudio, @nawi_tattoo y @pauladantattoo (24/11/2026).
// Lo que pone "PENDIENTE" hay que confirmarlo con ellos.
export const negoci = {
  nom: 'Black House',
  nomComplet: 'Black House Tattoo Studio',
  adreca: 'C/ d’Espronceda, 5A',
  cp: '43202 Reus',
  // No tienen teléfono publicado en ningún sitio: las citas van por mensaje directo de Instagram.
  // PENDIENTE: preguntar si quieren dar un teléfono o un WhatsApp (sería una mejora clara).
  telefon: '',
  telefonHref: '',
  instagram: 'bh.tattoostudio',
  mapsUrl:
    'https://www.google.com/maps/place/Black+House+Tattoo+Studio/@41.1568492,1.1005561,17z/data=!4m6!3m5!1s0x12a151000dde57db:0x1d1fb6e931ee6544!8m2!3d41.1568492!4d1.1005561!16s%2Fg%2F11zyrlz0l8',
  mapsEmbed: 'https://maps.google.com/maps?q=41.1568492,1.1005561&z=17&output=embed',
  // Nota y número de reseñas de Google (24/11/2026). Todas son de 5 estrellas: aquí sí se enseña.
  nota: '5,0',
  ressenyes: 23,
  // true mientras sea una demo: añade noindex para que Google no la indexe
  demo: true,
};

// Los dos tatuadores del estudio (salen como historias destacadas en @bh.tattoostudio).
// Estilos copiados de sus biografías de Instagram.
export const artistes = [
  {
    id: 'nawi',
    nom: 'Nawi',
    instagram: 'nawi_tattoo',
    estils: ['Realisme black & grey', 'Chicano'],
  },
  {
    id: 'paula',
    nom: 'Paula Danta',
    instagram: 'pauladantattoo',
    estils: ['Fineline', 'Blackwork'],
  },
] as const;

export type ArtistaId = (typeof artistes)[number]['id'];

// Horario de Google Maps (24/11/2026). dia: 1 = lunes … 7 = domingo. [] = cerrado.
// PENDIENTE: confirmar si es horario de atención (consultas) o también de sesiones, que pueden alargarse.
export const horari: { dia: number; hores: string[] }[] = [
  { dia: 1, hores: ['10:00 – 14:00', '16:00 – 19:00'] },
  { dia: 2, hores: ['10:00 – 14:00', '16:00 – 19:00'] },
  { dia: 3, hores: ['10:00 – 14:00', '16:00 – 19:00'] },
  { dia: 4, hores: ['10:00 – 14:00', '16:00 – 19:00'] },
  { dia: 5, hores: ['10:00 – 14:00', '16:00 – 19:00'] },
  { dia: 6, hores: ['10:00 – 14:00'] },
  { dia: 7, hores: [] },
];

// Aviso que sale arriba de todo (agenda cerrada, flash day, ofertas como el 2x1 de su Instagram…).
// Para activarlo: actiu: true, rellenar los textos y hacer push. Se publica solo en un minuto.
// "fins" (AAAA-MM-DD): a partir del día siguiente el aviso desaparece aunque nadie lo quite.
// "tancat": true si durante el aviso el estudio está cerrado (el estado dirá "Tancat" aunque toque abrir).
export const avis = {
  actiu: false,
  tancat: false,
  fins: '2026-12-31',
  ca: 'Flash day el dissabte 13: dissenys petits a preu tancat, sense cita.',
  es: 'Flash day el sábado 13: diseños pequeños a precio cerrado, sin cita.',
};

// Abre el chat privado de Instagram. Instagram no deja precargar el texto,
// por eso el formulario de cita copia el mensaje al portapapeles antes de abrirlo.
export const dmLink = (usuari: string = negoci.instagram) => `https://ig.me/m/${usuari}`;
export const igLink = (usuari: string = negoci.instagram) => `https://www.instagram.com/${usuari}/`;
