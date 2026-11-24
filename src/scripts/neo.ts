// Encén les línies de neó: les dibuixa de punta a punta i les fa parpellejar en acabar,
// com un tub que s'engega. Sense JS (o amb "reduir moviment") es veuen enceses i quietes.
export function encenNeons() {
  const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const linies = [...document.querySelectorAll<SVGSVGElement>('.neo-linia')];
  if (quiet) return;

  const prepara = (svg: SVGSVGElement) => {
    svg.querySelectorAll<SVGPathElement>('path').forEach((p) => {
      const l = p.getTotalLength();
      p.style.strokeDasharray = `${l}`;
      p.style.strokeDashoffset = `${l}`;
    });
  };
  const encen = (svg: SVGSVGElement) => {
    svg.querySelectorAll<SVGPathElement>('path').forEach((p) => {
      p.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.6,.05,.3,1)';
      p.style.strokeDashoffset = '0';
    });
    setTimeout(() => svg.classList.add('encesa'), 1300);
  };

  linies.forEach(prepara);
  const io = new IntersectionObserver(
    (entrades) => {
      for (const e of entrades) {
        if (!e.isIntersecting) continue;
        encen(e.target as SVGSVGElement);
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -15% 0px' },
  );
  linies.forEach((svg) => {
    if (svg.dataset.immediata) requestAnimationFrame(() => setTimeout(() => encen(svg), 250));
    else io.observe(svg);
  });
}
