// "Obert ara / Tancat ara" calculado en el navegador con la hora de Reus.
// Lo usan la portada y el horario: todos los elementos con [data-estat]. (Copiado de Cori.)
// Tiene en cuenta el aviso de config.ts (si está activo, no ha caducado y dice tancat: true).
import { horari, avis } from '../config';
import { textos, type Lang } from '../i18n/textos';

const aMin = (s: string) => {
  const [h, m] = s.trim().split(':').map(Number);
  return h * 60 + m;
};
const franges = (dia: number) =>
  (horari.find((h) => h.dia === dia)?.hores ?? []).map((f) => f.split('–').map(aMin) as [number, number]);
const hora = (min: number) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, '0')}`;

export function avisActiu(ara = araReus()) {
  if (!avis.actiu) return false;
  const fins = new Date(`${avis.fins}T23:59:59`);
  return ara <= fins;
}

export function araReus() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
}

export function estat(lang: Lang) {
  const t = textos[lang].estat;
  const ara = araReus();
  const avui = ((ara.getDay() + 6) % 7) + 1;
  const min = ara.getHours() * 60 + ara.getMinutes();

  if (avisActiu(ara) && avis.tancat) return { obert: false, titol: t.avisTancat, detall: avis[lang] };

  const actual = franges(avui).find(([a, b]) => min >= a && min < b);
  if (actual) return { obert: true, titol: t.obert, detall: `${t.tancaA} ${hora(actual[1])}` };

  // Busca la propera obertura (avui més tard o els propers dies)
  const mesTard = franges(avui).find(([a]) => a > min);
  if (mesTard) return { obert: false, titol: t.tancat, detall: `${t.obreA} ${hora(mesTard[0])}` };
  for (let i = 1; i <= 7; i++) {
    const dia = ((avui - 1 + i) % 7) + 1;
    const f = franges(dia)[0];
    if (!f) continue;
    const detall = i === 1 ? `${t.obreDema} ${hora(f[0])}` : `${t.obreDia} ${t.dies[dia - 1]} ${t.a} ${hora(f[0])}`;
    return { obert: false, titol: t.tancat, detall };
  }
  return { obert: false, titol: t.tancat, detall: '' };
}

// Pinta l'estat a tots els [data-estat] i el torna a calcular cada minut
export function pintaEstat() {
  const lang = (document.documentElement.lang === 'es' ? 'es' : 'ca') as Lang;
  const pinta = () => {
    const e = estat(lang);
    document.querySelectorAll<HTMLElement>('[data-estat]').forEach((el) => {
      el.dataset.obert = String(e.obert);
      const titol = el.querySelector('[data-estat-titol]');
      const detall = el.querySelector('[data-estat-detall]');
      if (titol) titol.textContent = e.titol;
      if (detall) detall.textContent = e.detall;
    });
    const avui = ((araReus().getDay() + 6) % 7) + 1;
    document.querySelectorAll<HTMLElement>(`[data-dia]`).forEach((el) => el.toggleAttribute('data-avui', el.dataset.dia === String(avui)));
  };
  pinta();
  setInterval(pinta, 60_000);
}
