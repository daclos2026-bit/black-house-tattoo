// "Tria el teu artista": un sol estat per a tota la pàgina.
// Botons [data-tria="nawi|paula|tots"] → marca el botó, filtra la galeria ([data-filtre])
// i deixa triat l'artista al formulari de cita.
export function iniciaArtistes() {
  const galeria = document.querySelector<HTMLElement>('[data-filtre]');
  const tria = (id: string) => {
    document.querySelectorAll<HTMLElement>('[data-tria]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tria === id)));
    if (galeria) galeria.dataset.filtre = id;
    const radio = document.querySelector<HTMLInputElement>(`#cita input[name="artista"][value="${id === 'tots' ? 'qualsevol' : id}"]`);
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };
  document.querySelectorAll<HTMLElement>('[data-tria]').forEach((b) => b.addEventListener('click', () => tria(b.dataset.tria!)));
}
