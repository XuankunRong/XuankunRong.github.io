# Xuankun Rong · Personal Homepage

Live site: https://xuankunrong.github.io/

A light terminal homepage with self-hosted JetBrains Mono, an oval portrait with a soft shadow, and a plain background. Papers appear in a single column grouped by year; first/co-first authored papers come first within each year and have a left bracket. Oral presentations are red. News and awards follow the papers.

Research topics use a typewriter with a 4.8-second pause and a blinking cursor. The name is static. Reduced-motion preferences disable animation. The browser icon uses the supplied headphones mascot photo.

The footer credits [Renjie Pi](https://pipilurj.github.io/) for the terminal presentation and animation inspiration. Design provenance is in `design-sources.json`. Paper metadata and figure sources are recorded in `publication-sources.json` and `figure-sources.json`. Font licensing is in `assets/fonts/`.

## Edit and preview

- Edit `publications.js` for papers and news.
- Edit `build.mjs` for the profile, authorship list and awards, then run `node build.mjs`.
- Edit `homepage.css` for layout and `homepage-motion.js` for interactions.
- Preview with `python3 -m http.server 4173`, then open http://127.0.0.1:4173/.

## Publish

GitHub Pages publishes the repository root from `main`. The committed HTML and assets are ready to serve; no dependency installation is required. `.nojekyll` keeps publication static.

The previous `images/xuankun.jpg` and `jemdoc.css` remain available for older links. They are not used by the current homepage.
