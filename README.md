# Georgia Chalkia — portfolio

A one-page personal portfolio built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Lenis. It is quiet and light: white, black and grays only, one continuous scroll, and no loader, WebGL, GSAP or external scripts at runtime.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

Requires Node 18.18+ (tested on Node 22). Set `NEXT_PUBLIC_SITE_URL` in production so Open Graph URLs are absolute.

## Content

All text lives in **`src/lib/data.ts`**, and components only read from it. The sources are:

- **Developer CV** (`CV_Georgia_Developer_EN`): profile, skills, projects, experience, education, links and photo. The text is translated faithfully into Swedish.
- **Swedish CV** (`CV Georgia Chalkia`): only the 7 courses under *Certifieringar & kurser*.
- **Years:** the developer CV has placeholders (`[year]`, `[University]`), so years are left out on purpose. Only *“Pågående · examen 2026”* (NBI) and *“– nu”* (GMed) are shown, because the CV states them.
- **Achievements:** omitted, because the CV has no numbers, ranks or honours. `ACHIEVEMENTS` is an empty array; the section and its nav link don't exist.
- **Repo links:** projects have none in the CV, so no “Visa på GitHub” buttons render. Add `github: "https://…"` to a project in `data.ts` and the button appears.
- **Résumé download:** `public/CV-Georgia-Chalkia.pdf` is a print of the developer CV HTML. ⚠️ It still contains the CV's own `[year]` / `[University]` placeholders. Replace this file with a finished PDF before going live.

## Sections

| # | Section | id | Component | Signature interaction |
|---|---------|----|-----------|----------------------|
| – | Navigation | – | `Navigation.tsx` | Frosted pill after 40 px, sliding ink indicator, 2 px progress bar, clip-path mobile menu (Esc, scroll lock, focus trap) |
| – | Hero | `top` | `hero/Hero.tsx` | Looping intro video, `mix-blend-mode: multiply`, ghost first name, sound unlock on first gesture, pauses below 35 % visibility |
| 01 | Om mig | `om` | `sections/About.tsx` | Hanging lanyard ID card: damped pendulum, idle sway, 3D flip (hover / tap / Enter / Space) |
| 02 | Kompetenser | `kompetenser` | `sections/Skills.tsx` | Periodic table of 51 skills, diagonal wave reveal, family filter, sticky inspector with logo pop |
| 03 | Utvalda projekt | `projekt` | `sections/Work.tsx` | Expanding accordion (flex 1 → 8), vertical spines, clip-path wipe on an *Illustrativt UI* |
| 04 | Certifieringar & kurser | `certifieringar` | `sections/Certifications.tsx` | Sticky heading, ink-flood rows |
| 05 | Erfarenhet & utbildning | `erfarenhet` | `sections/Experience.tsx` | Spine drawn by scroll progress, stops light up, dashed “Nästa — ditt team?” card |
| 06 | Kontakt | `kontakt` | `sections/Contact.tsx` | Letter hop on hover, copy-email chip (`aria-live`), spinning “säg hej” badge, footer |

Shared pieces: `ui/RevealObserver.tsx` (`.rv` / `.rv-mask` → `.is-in`, once), `ui/SectionHead.tsx`, `ui/TechLogo.tsx` (`BRAND` + `CONCEPT` maps, `isBrand()`), `lib/hooks.ts` (`useInView`, `useScrollProgress`, `prefersReducedMotion`, `useMedia`) and `lib/scroll.tsx` (Lenis + `scrollToTarget`).

## Rebuilding the hero video

```bash
python3 scripts/build-hero-assets.py --video path/to/intro.mp4 --photo path/to/photo.jpg
# optional: --crop W:H:X:Y   --imax 0.86
```

Requirements: `ffmpeg` / `ffprobe` on PATH, Python 3.10+, `numpy`, `Pillow`.

What the script does:

1. **Crop:** finds the person against the light backdrop across sampled frames and builds one fixed 768:960 crop centred on them. It then scales to 768 × 960.
2. **Whiten:** applies `colorlevels` so the backdrop becomes pure white and disappears under `multiply`. The brief suggests `rimax=0.98`, which suits a near-white wall. This clip's backdrop measured ~0.89, so the script derives the level from the measurement (0.864 here). Override with `--imax`.
3. **Seamless loop:** keeps the first ≤ 10 s and cross-fades the last 0.5 s of picture into the first 0.5 s with ffmpeg `xfade`. Audio gets the same cross-fade, sample-accurately and equal-power, in numpy. Nothing is retimed, so lips stay in sync.
4. **Export:**
   - `public/hero/hero.mp4`: H.264 yuv420p, CRF 24, preset slow, AAC 96k, +faststart
   - `public/hero/hero.webm`: VP9 CRF 36, Opus 80k
   - `public/hero/poster.webp`: the first frame
5. **Stills:**
   - `public/portrait-bust.webp`: 480 × 600, from `--photo` if given, otherwise the sharpest early frame
   - `public/og.jpg`: 1200 × 630

**Note on the current clip:** the camera zooms in from full body to waist up, so the loop point shows a soft zoom-out dissolve. Re-film with a locked camera and re-run the script to remove it.

To keep LCP fast, the video `<source>`s are attached after `window.load`. The poster is preloaded and is the LCP element.

## Design system

The tokens are in `src/app/globals.css`: `--paper #f4f2ee`, `--card`, `--ink #0d0d0d`, `--ink-2`, `--mute`, `--faint`, `--line`, `--soft`, `--ease cubic-bezier(.16,1,.3,1)` and `--gutter`.

`--mute` is `#6f6d67` instead of `#77756f`. The original measures about 4.2 : 1 on paper, which fails WCAG AA for small text.

Component CSS lives in a `<style>` inside each component, wrapped in `@layer components`. Resets are in `@layer base`, so Tailwind utilities always win.

Fonts are self-hosted from `src/fonts` via `next/font/local`, using the Latin subset (includes å ä ö):

- Inter Tight (variable)
- Instrument Serif (regular + italic)
- JetBrains Mono (variable)

## Accessibility

- One `h1`, then `h2` per section and `h3` within.
- Skip link, visible focus rings, `aria-current` on the active nav link.
- Keyboard flip on the ID card, focus trap in the mobile menu.
- `prefers-reduced-motion` disables Lenis, the pendulum and all decorative animation.
- The video has an `aria-label`. The sound button is icon-only with an `aria-label` and `aria-pressed`. The illustrative UIs are labelled as not being real screenshots.

## Verified (production build)

- `npm run build` and `npm run lint`: no errors or warnings. First-load JS is 135 kB.
- Playwright at 1440 × 900 and 390 × 844: `scrollWidth === innerWidth`, no console errors.
- Video:
  - autoplays muted when blocked, with a ping ring on the button
  - sound unlocks on the first gesture
  - ▶ / ❚❚ toggles
  - pauses when scrolled away and resumes on return
  - loops at 9.5 s
- ID card swings on pointer movement, flips with Enter / Space and on tap.
- Filter dims 39 of 51 tiles for “Klinisk expertis”. The accordion opens on hover.
- Lighthouse (mobile, simulated throttling): Performance 94–96, Accessibility 100, Best Practices 100, SEO 100.

## Credits & licences

- **Brand logos:** `public/logos/devicon/*.svg` are the official “original” icons from [Devicon](https://devicon.dev), MIT licence (`public/logos/devicon/LICENSE`). The logos themselves are trademarks of their owners (Microsoft — C#, .NET, SQL Server, Azure; Meta — React; Microsoft — TypeScript; VoidZero — Vite; Tailwind Labs; GitHub; Docker Inc.; W3C — HTML5). They are used only to identify the technologies.
- **Concept icons** (FHIR, GDPR, Clean Architecture, clinical skills…): drawn for this site in `ui/TechLogo.tsx`.
- **Fonts:**
  - Inter Tight: SIL OFL 1.1
  - Instrument Serif: SIL OFL 1.1
  - JetBrains Mono: SIL OFL 1.1
  - All via Fontsource.
