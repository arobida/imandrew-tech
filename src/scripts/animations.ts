import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
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
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro
    .from('.hero .kicker', { y: 18, autoAlpha: 0, duration: 0.6 }, 0.1)
    .from('.hero-title .char', { yPercent: 110, duration: 0.9, stagger: 0.022 }, 0.25)
    .from('.hero-hook', { y: 22, autoAlpha: 0, duration: 0.7 }, '-=0.55')
    .from('.board-row', { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.055 }, '-=0.45')
    .from('.host-brief > *', { y: 22, autoAlpha: 0, duration: 0.65, stagger: 0.12 }, '-=0.5');

  /* Split-flap board: each dossier value scrambles into place as its row
     lands, like a departure board settling. */
  gsap.utils.toArray<HTMLElement>('.board-row dd, .board-head span').forEach((cell, i) => {
    intro.to(
      cell,
      {
        duration: 0.7,
        ease: 'none',
        scrambleText: { text: cell.textContent ?? '', chars: 'upperCase', speed: 0.4 },
      },
      1.05 + i * 0.07,
    );
  });

  /* Hero grid drifts and dims as it scrolls away */
  gsap.to('.hero-grid-bg', {
    yPercent: 18,
    autoAlpha: 0.35,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* --- Ticker: GSAP drives the loop so scroll velocity can grab the tape —
         fast scrolling speeds it up, scrolling up hard runs it backwards, and
         it eases back to cruising speed. The CSS keyframes marquee stays as
         the no-JS fallback and is disabled inline here. --- */
  const ticker = document.querySelector<HTMLElement>('.ticker-track');
  if (ticker) {
    ticker.style.animation = 'none';
    const loop = gsap.to(ticker, { xPercent: -50, ease: 'none', duration: 40, repeat: -1 });
    const proxy = { ts: 1 };
    const clampTs = gsap.utils.clamp(-2, 4);
    ScrollTrigger.create({
      onUpdate: (self) => {
        const ts = clampTs(1 + self.getVelocity() / 1200);
        if (Math.abs(ts - 1) > Math.abs(proxy.ts - 1)) {
          proxy.ts = ts;
          gsap.to(proxy, {
            ts: 1,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: 'auto',
            onUpdate: () => loop.timeScale(proxy.ts),
          });
        }
      },
    });
  }

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
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              // .in keeps CSS state hooks working (e.g. .cp.in lights the node dot)
              el.classList.add('in');
              // Journey checkpoints: the dot pops as it lights up.
              const dot = el.classList.contains('cp') ? el.querySelector('.cp-dot') : null;
              if (dot) {
                gsap.fromTo(
                  dot,
                  { scale: 0.3 },
                  { scale: 1, duration: 0.55, delay: delay + 0.3, ease: 'back.out(3.5)', clearProps: 'scale' },
                );
              }
            },
          },
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

  /* --- Hover interactions ------------------------------------------------ */

  /* Magnetic CTA: cache its untransformed bounds so its own movement cannot
     feed back into the next pointer calculation. */
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const cta = document.querySelector<HTMLElement>('.hero .cta');
  if (cta && finePointer) {
    let bounds: DOMRect;
    const xTo = gsap.quickTo(cta, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cta, 'y', { duration: 0.35, ease: 'power3.out' });
    cta.addEventListener('pointerenter', () => { bounds = cta.getBoundingClientRect(); });
    cta.addEventListener('pointermove', (e) => {
      xTo((e.clientX - (bounds.left + bounds.width / 2)) * 0.3);
      yTo((e.clientY - (bounds.top + bounds.height / 2)) * 0.35);
    });
    cta.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  }

  /* Use yPercent for hover lift so it composes with the reveal tween's y. */
  gsap.utils.toArray<HTMLElement>('.ar-card').forEach((card) => {
    card.addEventListener('pointerenter', () => {
      gsap.to(card, { yPercent: -2.5, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
      gsap.fromTo(
        card,
        { '--sheen-x': '-110%' },
        { '--sheen-x': '110%', duration: 0.75, ease: 'power2.inOut', overwrite: 'auto' },
      );
    });
    card.addEventListener('pointerleave', () => {
      gsap.to(card, { yPercent: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    });
  });

  /* Signoff links: the terminal-caret label nudges right on hover. */
  gsap.utils.toArray<HTMLElement>('.so-links a').forEach((a) => {
    const label = a.querySelector('.so-label');
    if (!label) return;
    a.addEventListener('mouseenter', () =>
      gsap.to(label, { x: 6, duration: 0.3, ease: 'power3.out', overwrite: 'auto' }),
    );
    a.addEventListener('mouseleave', () =>
      gsap.to(label, { x: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' }),
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
