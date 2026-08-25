# Vighnesh — Cybersecurity Portfolio

A dark, hacker-themed portfolio with a 3D animated scene (Three.js), a
hover-to-decrypt info panel, expandable project cards, and a terminal-style
contact form. Pure HTML/CSS/JS — no build step, no framework, no npm install
required.

```
vighnesh-portfolio/
├── index.html      → page structure
├── style.css        → all styling / theme / animations
├── script.js         → 3D scene, interactions, content data
└── README.md
```

---

## 1. Open the project in VS Code

1. Install **VS Code**: https://code.visualstudio.com/ (if you don't have it).
2. Download/copy the 3 files above (`index.html`, `style.css`, `script.js`)
   into one folder, e.g. `vighnesh-portfolio`.
3. Open VS Code → `File > Open Folder…` → select `vighnesh-portfolio`.
4. Install the **"Live Server"** extension (by Ritwick Dey) from the
   Extensions panel (the icon with 4 squares on the left sidebar, search
   "Live Server", click Install).
5. Right-click `index.html` in the file explorer → **"Open with Live
   Server"**. Your browser opens automatically at something like
   `http://127.0.0.1:5500` and the site is live and hot-reloading as you edit.

> Why Live Server? This site loads Three.js as an ES module
> (`type="module"`), and browsers block ES module imports on
> `file:///` paths for security reasons. You need a local server —
> Live Server is the easiest one.

---

## 2. Customize the content (all in plain text, no design work needed)

### Your info / bio
- `index.html` → search for `hacker-info-panel` — edit the name/role/focus rows.
- `index.html` → hero section (`<h1 class="hero-title">`, `.hero-desc`) — edit headline & description.
- `script.js` → `typedRole()` function near the top — edit the `roles` array (the rotating text under your name).

### Academics section
- `script.js` → find `(function academics(){ ... })()` → edit the `DATA` array.
  Each object is one timeline entry: `period`, `title`, `org`, `desc`, `tags`.

### Projects section
- `script.js` → find `(function projects(){ ... })()` → edit the `DATA` array.
  Each object is one project card: `name`, `tagline`, `desc`, `tags`,
  `img` (a URL to any image — screenshot of your project works great),
  `demo` and `code` (links to live demo / GitHub repo).
- Swap the `img` URLs for real screenshots of your own projects — just drop
  your image files into the project folder (e.g. `/images/project1.png`) and
  point `img: "images/project1.png"` at them.

### Contact links
- `index.html` → `#contact` section → edit the `mailto:`, GitHub, LinkedIn,
  and TryHackMe links to your real profiles.

### Colors / theme
- `style.css` → top of the file, the `:root { ... }` block. Change
  `--cyan`, `--amber`, `--bg-void` etc. to retint the entire site in one place.

---

## 3. Make the contact form actually send you emails

Right now the form simulates sending (so it works instantly with zero
backend). To make it real, the easiest no-backend option is **Formspree**:

1. Go to https://formspree.io/ → sign up free → "New Form" → copy your
   form endpoint (looks like `https://formspree.io/f/xxxxabcd`).
2. In `index.html`, find `<form id="contact-form" ...>` and change it to:
   ```html
   <form id="contact-form" class="contact-form" action="https://formspree.io/f/xxxxabcd" method="POST">
   ```
3. In `script.js`, find the `contactForm()` function and delete the
   `e.preventDefault();` line (and the simulated `setTimeout` block) so the
   browser does a normal form POST to Formspree — or keep the JS as-is for
   the visual "sending..." animation and instead `fetch()` the same endpoint
   with `FormData` inside that function. Formspree's docs show the exact
   snippet: https://help.formspree.io/hc/en-us/articles/360013470813

That's it — messages will land in your inbox.

---

## 4. Host it for free

Any of these work great for a static site like this. **GitHub Pages** is the
most common for a personal portfolio.

### Option A — GitHub Pages (recommended, free, custom domain support)

1. Create a free GitHub account: https://github.com/
2. Create a new repository, e.g. `vighnesh-portfolio` (Public).
3. In VS Code, open a terminal (`Terminal > New Terminal`) inside your
   project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/vighnesh-portfolio.git
   git push -u origin main
   ```
   (Install Git first if needed: https://git-scm.com/downloads)
4. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).
5. Under "Build and deployment" → Source: **Deploy from a branch** →
   Branch: `main`, folder: `/ (root)` → **Save**.
6. Wait ~1 minute, refresh the page — GitHub gives you a live URL like:
   `https://<your-username>.github.io/vighnesh-portfolio/`

### Option B — Netlify (drag-and-drop, fastest)

1. Go to https://app.netlify.com/drop
2. Drag your whole `vighnesh-portfolio` folder onto the page.
3. Netlify instantly deploys it and gives you a live URL
   (e.g. `random-name-123.netlify.app`).
4. Optional: create a free account to get a custom subdomain like
   `vighnesh.netlify.app` and enable auto-deploys from GitHub.

### Option C — Vercel

1. Go to https://vercel.com/ → sign up (can use GitHub login).
2. Push your project to a GitHub repo (see Option A steps 1–3).
3. On Vercel: **Add New… > Project** → import that repo → since this is a
   plain static site, leave the framework preset as "Other" and click
   **Deploy**. You'll get a live `*.vercel.app` URL.

### Custom domain (optional)
All three options let you attach a custom domain (e.g. `vighnesh.dev`)
for free once you own one (buy from Namecheap / GoDaddy / Google Domains) —
look for "Custom domain" in the project settings on whichever host you pick.

---

## 5. Notes / tips

- The 3D scene uses Three.js loaded from a CDN (`unpkg.com`) — no install
  needed, but it does need an internet connection to load that script, which
  is fine once hosted (and fine locally too).
- Everything is responsive down to mobile; the 3D scene, custom cursor, and
  hover-expand cards gracefully degrade to tap-to-expand / no-cursor on touch
  devices.
- `prefers-reduced-motion` is respected — animations shorten automatically
  for users who've set that OS-level preference.
- Want a real photo of yourself instead of the low-poly hooded figure? You
  can extend `script.js`'s Three.js scene with a `GLTFLoader` and drop in a
  free rigged/low-poly character model from https://sketchfab.com (filter by
  "Downloadable" + free license) — happy to help wire that up if you want it.

