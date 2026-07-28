import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'power3.out', duration: 0.7 });

/**
 * Split a headline into word wrappers (overflow masks that prevent
 * mid-word line breaks) containing one animatable span per character.
 */
function splitHeadline(el: HTMLElement) {
  const walk = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      for (const word of (node.textContent ?? '').split(/(\s+)/)) {
        if (!word.trim()) {
          frag.appendChild(document.createTextNode(word));
          continue;
        }
        const w = document.createElement('span');
        w.className = 'word';
        for (const ch of word) {
          const c = document.createElement('span');
          c.className = 'char';
          c.textContent = ch;
          w.appendChild(c);
        }
        frag.appendChild(w);
      }
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE && !(node as Element).classList.contains('word')) {
      [...node.childNodes].forEach(walk);
    }
  };
  [...el.childNodes].forEach(walk);
}

const CLIP_CLOSED = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
const CLIP_OPEN = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';

const mm = gsap.matchMedia();

/* Reduced motion: no animation is created at all. Content is never hidden
   by CSS, so everything is simply visible; light the checkpoint dots so the
   journey reads as complete instead of pending. */
mm.add('(prefers-reduced-motion: reduce)', () => {
  document.querySelectorAll('.cp').forEach((el) => el.classList.add('in'));
});

mm.add('(prefers-reduced-motion: no-preference)', () => {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitHeadline);

  /* --- Hero intro: plays on load, above the fold --- */
  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .from('.hero .kicker', { y: 18, autoAlpha: 0, duration: 0.6 }, 0.1)
    .from('.hero-title .char', { yPercent: 110, duration: 0.9, stagger: 0.022 }, 0.25)
    .from('.hero-hook', { y: 22, autoAlpha: 0, duration: 0.7 }, '-=0.55')
    .from('.board-row', { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.055 }, '-=0.45')
    .from('.host-brief > *', { y: 22, autoAlpha: 0, duration: 0.65, stagger: 0.12 }, '-=0.5');

  /* Hero grid drifts and dims as it scrolls away */
  gsap.to('.hero-grid-bg', {
    yPercent: 18,
    autoAlpha: 0.35,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* --- Headlines below the fold: char cascade on first entry --- */
  document.querySelectorAll<HTMLElement>('.split:not(.hero-title)').forEach((el) => {
    gsap.from(el.querySelectorAll('.char'), {
      yPercent: 110,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.018,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });

  /* --- Generic blur-to-sharp reveals (hero handled by intro timeline) --- */
  gsap.utils
    .toArray<HTMLElement>('.rv')
    .filter((el) => !el.closest('.hero'))
    .forEach((el) => {
      const delay = Number(el.dataset.offset ?? 0) * 0.12;
      const wipe = el.classList.contains('takeaway');
      gsap.fromTo(
        el,
        { y: 26, autoAlpha: 0, filter: 'blur(6px)', ...(wipe ? { clipPath: CLIP_CLOSED } : {}) },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          ...(wipe ? { clipPath: CLIP_OPEN } : {}),
          duration: wipe ? 0.8 : 0.7,
          delay,
          clearProps: 'filter',
          // .in keeps CSS state hooks working (e.g. .cp.in lights the node dot)
          scrollTrigger: { trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('in') },
        },
      );
    });

  /* --- Journey wire: draws smoothly with scroll (replaces the old
         101-threshold IntersectionObserver, which stepped in 1% jumps) --- */
  const path = document.getElementById('journey-path') as unknown as SVGPathElement | null;
  if (path) {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.track-wrap', start: 'top 75%', end: 'bottom 55%', scrub: 0.5 },
    });
  }

  /* --- Chapter watermark numerals: slow editorial parallax --- */
  gsap.utils.toArray<HTMLElement>('.ch-watermark').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('.chapter') as Element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });

  /* Pop the completion note once all eleven answers are uncovered */
  document.addEventListener('episode-complete', () => {
    requestAnimationFrame(() => {
      const note = document.getElementById('complete-note');
      if (note && !note.hidden) {
        gsap.from(note, { y: 14, autoAlpha: 0, scale: 0.96, duration: 0.5, ease: 'back.out(1.8)' });
      }
    });
  });

  /* Webfont swaps shift layout; recalc trigger positions once fonts settle */
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
});
