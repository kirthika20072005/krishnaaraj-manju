# To My Favorite Person — A Little Universe Made Just for You

A cinematic, single-page React + Vite birthday surprise website. It opens with a
sealed envelope, then walks through your story, a photo scrapbook, a little movie,
letters, reasons, a gift box, a signable "Forever Promise" certificate, a bucket
list, and a final message.

This is a keepsake, not a product. Every word and photo is meant to be replaced
with your own.

---

## What's inside

| Section | What it does |
| --- | --- |
| Opening envelope | A glowing invitation you click to open, then step inside |
| Hero | His name, a constellation heart, live countdown to the birthday, days-together |
| Our Story | An alternating timeline of milestones |
| Memories | Photo gallery with filters + lightbox |
| Our Movie | A custom video player (play/seek/mute/fullscreen) with graceful fallback |
| Letters | Sealed letters that open into full pages — includes one long birthday letter |
| Reasons | A grid of reasons, plus a "Tell me a reason" shuffle spotlight |
| Gift | A clickable gift box with confetti and a real message inside |
| Our Promise | A decorative certificate with a real canvas signature pad and a wax seal |
| Future | A bucket list with a progress bar; you can tick items and add your own |
| Finale | A closing message with a replay button |

Everything saves in the browser where it matters (signed certificate, ticked
bucket-list items) using `localStorage`. Nothing is sent anywhere — there is no
backend and no analytics.

---

## Getting started

Requires **Node 18+** (developed on Node 20).

```bash
npm install
npm run dev      # opens http://localhost:5173
```

Build for sharing:

```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the built site locally
```

Because it builds to plain static files, you can host `dist/` on Netlify,
Vercel, GitHub Pages, Cloudflare Pages, or any static host.

---

## Making it yours

All personalization lives in plain, commented files under `src/config/`. You
never need to touch the components to make it feel like yours.

```
src/config/
  site.js        names, dates, hero copy, video/gift/music, certificate, finale
  story.js       the timeline milestones
  gallery.js     photos: src, caption, date, note, category, tilt
  letters.js     the letters (label, openWhen, greeting, body[], signoff)
  reasons.js     a simple list of reasons (strings)
  bucketList.js  dreams: { text, emoji }
```

Open `src/config/site.js` first — it holds the names, the birthday date
(`birthdayDate`) and the anniversary date (`ourDate`), and the opening text.

Dates use a standard ISO string, e.g. `'2026-12-31T00:00:00'`. The countdown
updates itself live.

---

## Adding your photos, video, and song

The site ships with **placeholder artwork only** — no real photos, and no music
or video files (so nothing autoplays or feels forced). Swap them for your own:

**Photos** — the gallery points at
`public/media/images/ours/photo-01.jpg` … `photo-20.jpg`.
Replace these files with your own images keeping the same names, or update the
`src` paths in `src/config/gallery.js` (for example `photo-01.jpg` →
`beach-day.jpg`). The finale photo is `public/media/images/ours/photo-19.jpg`
(set in `site.js` → `final.photo`).

**Video** — put your edited clip at `public/media/video/our-movie.mp4` and a
poster at `public/media/video/our-movie-poster.jpg`. If the file is missing, the
player shows a friendly fallback instead of breaking. Paths live in
`site.js` → `video`.

**Music** — put a royalty-free track at `public/media/music/our-song.mp3`.
Music **never autoplays**; he presses play. If the file is missing, the control
quietly hides itself. Settings live in `site.js` → `music`.

> Path note: media paths start with `/media/...` (no `/public`). Vite serves the
> `public/` folder from the site root.

---

## Printing the certificate

After signing the promise, the **Keep a copy** button opens your browser's print
dialog. The page has dedicated print styles, so only the certificate prints — on
plain paper it looks like a real keepsake. (It is intentionally *not* a legal
document.)

---

## Accessibility & comfort

- Respects `prefers-reduced-motion`: animations and the envelope/confetti effects
  are toned down for anyone who prefers less motion.
- Keyboard-friendly: buttons, dialogs, and the signature pad (mouse, touch, and
  pen) all work without a mouse-only assumption.
- Dialogs trap focus visually with a scroll lock and close on `Esc` / backdrop
  click.

---

## Tech

- **React 18** + **Vite 5**
- Plain CSS (global design system in `src/styles/index.css`, one stylesheet per
  component) — no CSS framework
- **lucide-react** icons
- Google Fonts: Playfair Display, Cormorant Garamond, Dancing Script, Great Vibes, Jost

### Project structure

```
public/
  heart-favicon.svg
  media/            images (ours, story), video, music
src/
  App.jsx           wires every section together
  main.jsx
  config/           ← edit these
  hooks/            useLocalStorage, useCountdown, useReveal, usePrefersReducedMotion
  styles/index.css  design tokens, layout, animations, print styles
  components/        one component + one stylesheet per section
```

---

Made with far too much love, and a lot of late nights.
# krishnaaraj-manju
