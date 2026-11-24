// Formulari de cita → missatge per a Instagram.
// Instagram no permet precarregar el text d'un DM, així que en clicar el botó:
//   1. copiem el missatge al porta-retalls (dins del mateix clic, perquè el navegador ho permeti)
//   2. deixem que l'enllaç ig.me obri el xat (app al mòbil, web a l'ordinador)
// Si no es pot copiar, ensenyem el text en un quadre perquè el copiïn a mà.
import { textos, type Lang } from '../i18n/textos';

export function iniciaCita() {
  const form = document.querySelector<HTMLFormElement>('#form-cita');
  if (!form) return;
  const lang = (form.dataset.lang === 'es' ? 'es' : 'ca') as Lang;
  const t = textos[lang].cita;
  const previa = document.querySelector<HTMLOutputElement>('[data-previa]')!;
  const enviar = form.querySelector<HTMLAnchorElement>('[data-enviar]')!;
  const resultat = form.querySelector<HTMLElement>('[data-resultat]')!;
  const copia = form.querySelector<HTMLTextAreaElement>('[data-copia]')!;

  const triat = (nom: string) => form.querySelector<HTMLInputElement>(`input[name="${nom}"]:checked`)?.dataset.text ?? '';
  const valor = (nom: string) => (form.elements.namedItem(nom) as HTMLInputElement | null)?.value.trim() ?? '';

  const missatge = () => {
    const m = t.missatge;
    const linies = [
      m.hola,
      '',
      `${m.artista}: ${triat('artista')}`,
      `${m.tipus}: ${triat('tipus')}`,
      valor('zona') && `${m.zona}: ${valor('zona')}`,
      triat('mida') && `${m.mida}: ${triat('mida')}`,
      valor('idea') && `${m.idea}: ${valor('idea')}`,
      valor('nom') && `${m.nom}: ${valor('nom')}`,
    ];
    return linies.filter((l, i) => i === 1 || l).join('\n');
  };

  const actualitza = () => {
    previa.textContent = missatge();
  };
  form.addEventListener('input', actualitza);
  form.addEventListener('change', actualitza);
  actualitza();

  enviar.addEventListener('click', () => {
    const text = missatge();
    copia.classList.add('hidden');
    try {
      navigator.clipboard
        .writeText(text)
        .then(() => (resultat.textContent = t.copiat))
        .catch(() => mostraCopia(text));
    } catch {
      mostraCopia(text);
    }
  });

  function mostraCopia(text: string) {
    resultat.textContent = t.noCopiat;
    copia.value = text;
    copia.classList.remove('hidden');
    copia.select();
  }
}
