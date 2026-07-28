# From Crayons to Code — imandrew.tech

An interactive personal site for Andrew Robida, built with Astro. The story is told as an interview you conduct yourself: eleven prompts across three chapters, each answered in Andrew's voice, with a scroll-drawn career timeline and the current local-first AI projects (llmate, swift-pass, data-smith).

## Stack

- Astro 7 (static output, zero-JS-by-default + vanilla component scripts)
- No UI framework — hand-rolled components, CSS custom properties, and GSAP ScrollTrigger motion
- Fonts: Oswald (display), IBM Plex Mono (labels), Satoshi (body)

## Develop

```bash
npm install
npm run dev      # local dev
npm run build    # outputs static site to dist/
npm run preview  # serve the build locally
```

All content lives in `src/data/episode.ts` — chapters, questions, answers, timeline checkpoints, projects, and links.

---

© Andrew Robida — helpful, not addictive.
