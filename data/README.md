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



import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

/* ==========================================================================
   0. BOOT SEQUENCE
   ========================================================================== */
(function boot(){
  const lines = [
    { el: "#boot-line-1", text: "initiating secure session..." },
    { el: "#boot-line-2", text: "loading modules :: three.js, ui-core, matrix-grid" },
    { el: "#boot-line-3", text: "mounting profile :: vighnesh.dev" },
    { el: "#boot-line-4", text: "access granted." },
  ];
  let i = 0;

  function typeLine(cb){
    if(i >= lines.length) return cb();
    const { el, text } = lines[i];
    const node = document.querySelector(el);
    let c = 0;
    const t = setInterval(()=>{
      node.textContent = text.slice(0, c) + (c < text.length ? "▌" : "");
      c++;
      if(c > text.length){
        clearInterval(t);
        node.textContent = text;
        i++;
        setTimeout(()=> typeLine(cb), 90);
      }
    }, 14);
  }

  let pct = 0;
  const fill = document.getElementById("boot-progress-fill");
  const pctLabel = document.getElementById("boot-percent");
  const progressTimer = setInterval(()=>{
    pct = Math.min(100, pct + Math.random()*14);
    fill.style.width = pct + "%";
    pctLabel.textContent = Math.floor(pct) + "%";
    if(pct >= 100) clearInterval(progressTimer);
  }, 110);

  typeLine(()=>{
    setTimeout(()=>{
      document.getElementById("boot-screen").classList.add("hide");
      document.body.style.overflow = "";
    }, 500);
  });
})();

/* ==========================================================================
   1. CUSTOM CURSOR
   ========================================================================== */
(function cursor(){
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;

  window.addEventListener("mousemove", e=>{
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
  });

  function loop(){
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll("a, button, .project-card, input, textarea").forEach(el=>{
    el.addEventListener("mouseenter", ()=> ring.classList.add("hovered"));
    el.addEventListener("mouseleave", ()=> ring.classList.remove("hovered"));
  });
  // Re-bind after dynamic content renders
  window.__rebindCursor = function(){
    document.querySelectorAll("a, button, .project-card, input, textarea").forEach(el=>{
      el.addEventListener("mouseenter", ()=> ring.classList.add("hovered"));
      el.addEventListener("mouseleave", ()=> ring.classList.remove("hovered"));
    });
  };
})();

/* ==========================================================================
   2. AMBIENT NETWORK-GRID BACKGROUND (2D canvas, full page)
   ========================================================================== */
(function gridBg(){
  const canvas = document.getElementById("grid-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, nodes = [];
  const COUNT = 70;

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }
  window.addEventListener("resize", ()=>{ resize(); initNodes(); });

  function initNodes(){
    nodes = Array.from({length: COUNT}, ()=>({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
    }));
  }

  resize(); initNodes();

  function draw(){
    ctx.clearRect(0,0,w,h);
    const viewTop = window.scrollY - 200;
    const viewBottom = window.scrollY + innerHeight + 200;

    for(const n of nodes){
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > w) n.vx *= -1;
      if(n.y < 0 || n.y > h) n.vy *= -1;
    }

    for(let i=0;i<nodes.length;i++){
      const a = nodes[i];
      if(a.y < viewTop || a.y > viewBottom) continue;
      for(let j=i+1;j<nodes.length;j++){
        const b = nodes[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 140){
          ctx.strokeStyle = `rgba(51,240,224,${0.10 * (1 - dist/140)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(51,240,224,0.35)";
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.4, 0, Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();

  // Resize canvas height when content grows (after dynamic render)
  window.addEventListener("load", ()=> setTimeout(()=>{ resize(); initNodes(); }, 400));
})();

/* ==========================================================================
   3. NAVBAR + MOBILE MENU + SMOOTH SCROLL SPY
   ========================================================================== */
(function nav(){
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", ()=>{
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  const burger = document.getElementById("nav-burger");
  const menu = document.getElementById("mobile-menu");
  burger.addEventListener("click", ()=> menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach(a=> a.addEventListener("click", ()=> menu.classList.remove("open")));
})();

/* ==========================================================================
   4. TYPED ROLE TEXT
   ========================================================================== */
(function typedRole(){
  const roles = [
    "Cybersecurity Enthusiast",
    "Aspiring Penetration Tester",
    "Network Security Learner",
    "Ethical Hacker in training",
  ];
  const el = document.getElementById("typed-role");
  let ri = 0, ci = 0, deleting = false;

  function tick(){
    const word = roles[ri];
    if(!deleting){
      ci++;
      el.textContent = word.slice(0, ci);
      if(ci === word.length){ deleting = true; setTimeout(tick, 1400); return; }
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if(ci === 0){ deleting = false; ri = (ri+1) % roles.length; }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
})();

/* ==========================================================================
   5. THREE.JS HERO SCENE — 3D "hacker terminal" laptop
   ========================================================================== */
(function heroScene(){
  const canvasEl = document.getElementById("hero-canvas");
  const heroSection = document.getElementById("hero");
  const infoPanel = document.getElementById("hacker-info-panel");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, heroSection.clientWidth/heroSection.clientHeight, 0.1, 100);
  camera.position.set(0, 1.1, 6.2);

  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);

  // Lighting
  scene.add(new THREE.AmbientLight(0x2b3a42, 1.2));
  const key = new THREE.PointLight(0x33f0e0, 14, 16);
  key.position.set(2.5, 3, 3);
  scene.add(key);
  const rim = new THREE.PointLight(0xffb020, 6, 14);
  rim.position.set(-3, 1, -2);
  scene.add(rim);

  // --- Group: hooded figure (stylised, low-poly silhouette) ---
  const figure = new THREE.Group();
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0c1116, roughness:0.75, metalness:0.15 });
  const darkMat2 = new THREE.MeshStandardMaterial({ color: 0x141c22, roughness:0.7, metalness:0.2 });

  // torso
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.82, 1.5, 8), darkMat);
  torso.position.set(0, 0.3, -0.3);
  figure.add(torso);

  // hood/head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), darkMat2);
  head.position.set(0, 1.32, -0.15);
  figure.add(head);
  const hoodCone = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.55, 16, 1, true), darkMat);
  hoodCone.position.set(0, 1.55, -0.2);
  hoodCone.rotation.x = Math.PI;
  figure.add(hoodCone);

  // arms
  const armGeo = new THREE.CylinderGeometry(0.13, 0.16, 1.05, 8);
  const armL = new THREE.Mesh(armGeo, darkMat2);
  armL.position.set(-0.62, 0.35, 0.35);
  armL.rotation.z = 0.55; armL.rotation.x = -0.5;
  figure.add(armL);
  const armR = armL.clone();
  armR.position.x = 0.62; armR.rotation.z = -0.55;
  figure.add(armR);

  figure.position.set(-1.15, -0.85, -0.4);
  figure.rotation.y = 0.35;
  scene.add(figure);

  // --- Group: laptop ---
  const laptop = new THREE.Group();
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x1a2229, roughness:0.4, metalness:0.6 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 1.15), baseMat);
  laptop.add(base);

  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.02, 0.9),
    new THREE.MeshStandardMaterial({ color: 0x0a0f14, roughness:0.8 })
  );
  keyboard.position.set(0, 0.05, 0.03);
  laptop.add(keyboard);

  const screenGroup = new THREE.Group();
  const screenBack = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.05, 0.06), baseMat);
  screenBack.position.set(0, 0.52, 0);
  screenGroup.add(screenBack);

  // Screen display (canvas texture) — the hoverable "hot" surface
  const dispCanvas = document.createElement("canvas");
  dispCanvas.width = 512; dispCanvas.height = 320;
  const dctx = dispCanvas.getContext("2d");
  const dispTex = new THREE.CanvasTexture(dispCanvas);

  function drawScreen(hovered){
    dctx.fillStyle = "#040a0a";
    dctx.fillRect(0,0,dispCanvas.width,dispCanvas.height);
    dctx.font = "13px monospace";
    const chars = "01{}<>#$/\\;:ABCDEF01hack_root_su__";
    const lines = hovered ? 20 : 14;
    for(let i=0;i<lines;i++){
      let s = "";
      const len = 34 + Math.floor(Math.random()*10);
      for(let j=0;j<len;j++) s += chars[Math.floor(Math.random()*chars.length)];
      dctx.fillStyle = hovered
        ? (i % 4 === 0 ? "#ffb020" : "#33f0e0")
        : "rgba(51,240,224,0.35)";
      dctx.fillText(s, 6, 16 + i*16);
    }
    if(hovered){
      dctx.fillStyle = "#39ff7a";
      dctx.font = "bold 22px monospace";
      dctx.fillText("ACCESS: VIGHNESH", 30, 300);
    }
    dispTex.needsUpdate = true;
  }
  drawScreen(false);

  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.86),
    new THREE.MeshBasicMaterial({ map: dispTex, toneMapped:false })
  );
  screenMesh.position.set(0, 0.52, 0.031);
  screenMesh.name = "hotscreen";
  screenGroup.add(screenMesh);

  const screenGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.55, 0.9),
    new THREE.MeshBasicMaterial({ color:0x33f0e0, transparent:true, opacity:0.06 })
  );
  screenGlow.position.set(0,0.52,0.028);
  screenGroup.add(screenGlow);

  screenGroup.position.set(0, 0.04, -0.55);
  screenGroup.rotation.x = -0.32;
  laptop.add(screenGroup);

  laptop.scale.setScalar(1.35);
  laptop.position.set(0.55, -0.85, 0.6);
  laptop.rotation.y = -0.45;
  scene.add(laptop);

  // Floating particles (data motes)
  const moteGeo = new THREE.BufferGeometry();
  const moteCount = 90;
  const positions = new Float32Array(moteCount*3);
  for(let i=0;i<moteCount;i++){
    positions[i*3] = (Math.random()-0.5)*10;
    positions[i*3+1] = (Math.random()-0.5)*6;
    positions[i*3+2] = (Math.random()-0.5)*6 - 1;
  }
  moteGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({ color:0x33f0e0, size:0.02, transparent:true, opacity:0.5 }));
  scene.add(motes);

  // Interaction: raycast on laptop screen
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2(-99,-99);
  let hovered = false;
  let targetRotY = laptop.rotation.y;

  heroSection.addEventListener("mousemove", (e)=>{
    const rect = heroSection.getBoundingClientRect();
    mouseNDC.x = ((e.clientX - rect.left)/rect.width)*2 - 1;
    mouseNDC.y = -(((e.clientY - rect.top)/rect.height)*2 - 1);
  });
  heroSection.addEventListener("mouseleave", ()=>{ mouseNDC.set(-99,-99); });

  function checkHover(){
    raycaster.setFromCamera(mouseNDC, camera);
    const hits = raycaster.intersectObject(screenMesh);
    const isHover = hits.length > 0;
    if(isHover !== hovered){
      hovered = isHover;
      drawScreen(hovered);
      infoPanel.classList.toggle("visible", hovered);
      document.getElementById("cursor-ring")?.classList.toggle("hovered", hovered);
    }
  }

  // subtle parallax camera + laptop idle animation
  let clock = new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    checkHover();

    laptop.position.y = -0.85 + Math.sin(t*0.8)*0.04;
    targetRotY = -0.45 + (mouseNDC.x * 0.25 || 0);
    laptop.rotation.y += (targetRotY - laptop.rotation.y) * 0.04;

    figure.rotation.y = 0.35 + Math.sin(t*0.4)*0.03;

    motes.rotation.y = t * 0.02;

    camera.position.x += ((mouseNDC.x||0)*0.4 - camera.position.x) * 0.02;
    camera.position.y += (1.1 + (mouseNDC.y||0)*0.15 - camera.position.y) * 0.02;
    camera.lookAt(0.1, 0.1, 0);

    if(hovered && Math.random() < 0.15) drawScreen(true);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", ()=>{
    camera.aspect = heroSection.clientWidth/heroSection.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  });
})();

/* ==========================================================================
   6. SCROLL REVEAL
   ========================================================================== */
function setupReveal(root=document){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add("in-view"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  root.querySelectorAll(".reveal").forEach(el=> io.observe(el));
}

/* ==========================================================================
   7. ACADEMICS TIMELINE DATA
   ========================================================================== */
(function academics(){
  const DATA = [
    {
      period: "2023 — 2025",
      title: "BCA (Bachelor's in Computer Applications)",
      org: "Somaiya Vidhyavihar University",
      desc: "Coursework in every minute part of technology.",
      tags: ["Networks", "Webdev", "OS Security"],
    },
    {
      period: "2022",
      title: "Commerce",
      org: "SYDENHAM COLLEGE OF COMMERCE AND ECONOMICS",
      desc: "Fundamentals of Commerce which later found boring and made me switch to IT field.",
      tags: ["Economics", "Mathematics"],
    },
    {
      period: "2020",
      title: "Secondary",
      org: "DR. ANTONIO da SILVA HIGH SCHOOL",
      desc: "Built the basic knowldge.",
      tags: ["Mathematics", "Science"],
    },
  ];

  const wrap = document.getElementById("timeline");
  wrap.innerHTML = DATA.map((d, i)=> `
    <div class="timeline-item reveal">
      <span class="timeline-node"></span>
      <span class="t-period">${d.period}</span>
      <h3>${d.title}</h3>
      <p class="t-org">${d.org}</p>
      <p class="t-desc">${d.desc}</p>
      <div class="tag-row">${d.tags.map(t=>`<span class="tag-chip">${t}</span>`).join("")}</div>
    </div>
  `).join("");

  setupReveal(wrap);
})();


/* ==========================================================================
   7b. CERTIFICATIONS DATA + CARDS
   ========================================================================== */
(function certifications(){
  const DATA = [
    {
      icon: "⚔",
      title: "Certified Ethical Hacker",
      issuer: "Hacker School",
      desc: "Gained knowledge of ethical hacking, vulnerability assessment, network security, penetration testing, and cybersecurity best practices.",
      id: "CEH-001",
    },
    {
      icon: "🐍",
      title: "Python Programming: A Step-by-Step Programming Course",
      issuer: "Knowledge Nest — Udemy",
      desc: "Acquired practical, hands-on skills in Python programming through a structured, project-driven course.",
      id: "PY-002",
    },
    {
      icon: "◧",
      title: "Meta Frontend Developer",
      issuer: "Meta",
      desc: "Completed a foundational front-end development course covering HTML, CSS, JavaScript, and UI principles. Focused on building responsive web pages and understanding core front-end structures.",
      id: "FE-003",
    },
    {
      icon: "🛰",
      title: "Agnirva Space Internship Program",
      issuer: "Recognized by AICTE",
      desc: "Completed a certified space technology internship program, gaining exposure to satellite systems, aerospace principles, and real-world applications in the space-tech domain.",
      id: "SPC-004",
    },
    {
      icon: "🛱",
      title: "ISRO Outreach Program — IIRS",
      issuer: "Indian Institute of Remote Sensing",
      desc: "Participated in ISRO's certified online learning program focused on space research, geospatial technologies, and remote sensing applications, enhancing awareness of satellite data in practical scenarios.",
      id: "ISRO-005",
    },
  ];

  const grid = document.getElementById("cert-grid");
  grid.innerHTML = DATA.map((c,i)=> `
    <article class="cert-card reveal" style="transition-delay:${i*70}ms">
      <div class="cert-card-top">
        <span class="cert-badge">${c.icon}</span>
        <span class="cert-verified">verified</span>
      </div>
      <h3>${c.title}</h3>
      <span class="cert-issuer">${c.issuer}</span>
      <p class="cert-desc">${c.desc}</p>
      <div class="cert-card-foot">
        <span class="id-tag">ID: ${c.id}</span>
        <span class="hash">#${(i+1).toString().padStart(2,"0")}</span>
      </div>
    </article>
  `).join("");

  setupReveal(grid);
  initTiltFor(".cert-card", { max: 8, scale: 1.015 });
  window.__rebindCursor && window.__rebindCursor();
})();

/* ==========================================================================
   8. PROJECTS DATA + CARDS
   ========================================================================== */
(function projects(){
  const DATA = [
    {
      name: "Advanced Vulnerability Scanner",
      tagline: "Real-time Vulnerability Scanner",
      desc: "Developed a web-based vulnerability scanner featuring multi-threaded port scanning, service detection, banner grabbing, SSL analysis, and CVE-based vulnerability assessment. Implemented user authentication, scan history, downloadable TXT/JSON/HTML reports, dashboard analytics, and an admin management portal.  Built a responsive interface with real-time security scoring, severity visualization, and detailed remediation recommendations. Python, Flask, SQLite technologies were used.",
      tags: [" multi-threaded port scanning", "service detection", "banner grabbing"],
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      demo: "#", code: "#",
    },
    {
      name: "Food Hunter",
      tagline: "Real-time Food Delivery Website",
      desc: "A fully functional food delivery website developed using ASP.NET for the backend and MS SQL for the database. The platform supports user authentication, restaurant listings, order management, and real-time delivery status tracking.",
      tags: ["ASP.NET", "SQL"],
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      demo: "#", code: "#",
    },
    {
      name: "VS SPORTS BLOG",
      tagline: "Basic Sports Blog Website",
      desc: "A dynamic blog platform centered around sports content, built using ASP.NET. It features a responsive layout, comment system, admin dashboard for post management, and SQL database integration for content storage.",
      tags: ["ASP.NET"],
      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      demo: "#", code: "#",
    },
  ];

  const grid = document.getElementById("project-grid");
  grid.innerHTML = DATA.map((p,i)=> `
    <article class="project-card reveal" tabindex="0" style="transition-delay:${i*60}ms">
      <div class="project-card-media" style="background-image:url('${p.img}')"></div>
      <div class="project-card-body">
        <div class="project-card-top">
          <span class="project-idx">PROJECT/0${i+1}</span>
        </div>
        <h3>${p.name}</h3>
        <p class="p-tagline">${p.tagline}</p>
        <div class="project-card-more">
          <p>${p.desc}</p>
          <div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
          <div class="project-links">
            <a href="${p.demo}" target="_blank" rel="noopener">live demo →</a>
            <a href="${p.code}" target="_blank" rel="noopener">source code →</a>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  // tap-to-expand for touch devices
  grid.querySelectorAll(".project-card").forEach(card=>{
    card.addEventListener("click", (e)=>{
      if(matchMedia("(hover: none)").matches){
        card.classList.toggle("expanded");
      }
    });
  });

  setupReveal(grid);
  window.__rebindCursor && window.__rebindCursor();
})();

/* ==========================================================================
   9. CONTACT FORM — Formspree
   ========================================================================== */
(function contactForm(){
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const label = document.getElementById("submit-label");

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    label.textContent = "sending...";
    status.textContent = "";
    status.className = "form-status";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        status.textContent = "✔ message sent successfully.";
        status.classList.add("ok");
        label.textContent = "execute ./send";
        form.reset();
      } else {
        status.textContent = "✖ transmission failed — try again.";
        status.classList.add("err");
        label.textContent = "execute ./send";
      }
    } catch (error) {
      status.textContent = "✖ transmission failed — try again.";
      status.classList.add("err");
      label.textContent = "execute ./send";
    }
  });
})();

/* ==========================================================================
   10. MISC
   ========================================================================== */
document.getElementById("year").textContent = new Date().getFullYear();
setupReveal();







<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Vighnesh :: Security Researcher</title>
<meta name="description" content="Vighnesh — Cybersecurity enthusiast, portfolio and projects." />

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="style.css" />
</head>
<body>

<!-- ============ BOOT SCREEN ============ -->
<div id="boot-screen">
  <div class="boot-terminal">
    <p><span class="prompt">root@vighnesh</span>:<span class="path">~</span>$ <span id="boot-line-1"></span></p>
    <p id="boot-line-2"></p>
    <p id="boot-line-3"></p>
    <p id="boot-line-4"></p>
    <div class="boot-progress-wrap">
      <div class="boot-progress-bar"><div id="boot-progress-fill"></div></div>
      <span id="boot-percent">0%</span>
    </div>
  </div>
</div>

<!-- ============ AMBIENT CANVAS LAYERS ============ -->
<canvas id="grid-canvas"></canvas>
<div class="scanline-overlay"></div>
<div class="vignette-overlay"></div>
<div class="noise-overlay"></div>
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>

<!-- ============ NAV ============ -->
<nav id="navbar">
  <div class="nav-inner">
    <a href="#hero" class="brand">
      <span class="brand-bracket">[</span>💻<span class="brand-accent">_</span>V.I.G.H.N.E.S.H<span class="brand-accent">_</span><span class="brand-bracket">]</span>
    </a>
    <ul class="nav-links">
      <li><a href="#hero"><span class="nav-idx">0x00</span> home</a></li>
      <li><a href="#academics"><span class="nav-idx">0x01</span> academics</a></li>
      <li><a href="#projects"><span class="nav-idx">0x02</span> projects</a></li>
      <li><a href="#contact"><span class="nav-idx">0x03</span> contact</a></li>
    </ul>
    <button id="nav-burger" aria-label="menu"><span></span><span></span><span></span></button>
  </div>
</nav>

<div id="mobile-menu">
  <a href="#hero">home</a>
  <a href="#academics">academics</a>
  <a href="#projects">projects</a>
  <a href="#contact">contact</a>
</div>

<main>

  <!-- ============ HERO ============ -->
  <section id="hero">
    <canvas id="hero-canvas"></canvas>

    <div class="hero-content">
      <p class="eyebrow"><span class="dot-live"></span> status: online // securing systems since 2026</p>
      <h1 class="hero-title">
        <span class="hero-hi">whoami →</span>
        <span class="glitch-text" data-text="VIGHNESH">VIGHNESH</span>
      </h1>
      <p class="hero-sub">
        <span id="typed-role"></span><span class="cursor-blink">_</span>
      </p>
      <p class="hero-desc">
        I break things on purpose, patch them on principle. Currently obsessed with
        offensive security, network defense, and building tools that make attackers'
        lives harder.
      </p>
      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary"><span>view_projects.sh</span></a>
        <a href="#contact" class="btn btn-ghost"><span>./contact_me</span></a>
      </div>

      <div class="hero-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M4 6v10a2 2 0 0 0 2 2h3m9-12v10a2 2 0 0 1-2 2h-3m0 0v2m0-2H9m0 0v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        hover the laptop below to decrypt my profile
      </div>
    </div>

    <!-- Info panel revealed on laptop hover -->
    <aside id="hacker-info-panel" class="info-panel">
      <div class="info-panel-head">
        <span class="blink-tag">● DECRYPTED</span>
        <span class="info-panel-file">profile.enc</span>
      </div>
      <div class="info-panel-row"><span>NAME</span><b>Vighnesh</b></div>
      <div class="info-panel-row"><span>ROLE</span><b>Cybersecurity Enthusiast</b></div>
      <div class="info-panel-row"><span>FOCUS</span><b>AppSec · Network Security </b></div>
      <div class="info-panel-row"><span>STATUS</span><b class="text-live">Open to opportunities</b></div>
      <div class="info-panel-bar"><div></div></div>
    </aside>

    <div class="scroll-indicator">
      <span>scroll</span>
      <div class="scroll-line"><div class="scroll-dot"></div></div>
    </div>
  </section>

  <!-- ============ ACADEMICS ============ -->
  <section id="academics">
    <div class="section-head">
      <span class="section-tag">0x01 / background</span>
      <h2>Academic <span class="accent">Log</span></h2>
      <p class="section-sub">A chronological trace of the trail — education, certifications, and the systems I learned to break along the way.</p>
    </div>

    <div class="timeline" id="timeline">
      <!-- JS populated, fallback below for no-js -->
    </div>
  </section>

  <!-- ============ CERTIFICATIONS ============ -->
  <section id="certifications">
    <div class="cert-bg-grid" aria-hidden="true"></div>
    <div class="section-head reveal">
      <span class="section-tag">0x02 / credentials</span>
      <h2>Verified <span class="accent">Certifications</span></h2>
      <p class="section-sub">Signed, sealed, and stamped — the courses, programs, and training that leveled up my skill tree.</p>
    </div>

    <div class="cert-grid" id="cert-grid"></div>
  </section>

  <!-- ============ PROJECTS ============ -->
  <section id="projects">
    <div class="section-head">
      <span class="section-tag">0x02 / payloads</span>
      <h2>Selected <span class="accent">Exploits</span></h2>
      <p class="section-sub">Hover a card to unpack it. Each one is a real build — tools, labs, and research I've shipped.</p>
    </div>

    <div class="project-grid" id="project-grid"></div>
  </section>

  <!-- ============ CONTACT ============ -->
  <section id="contact">
    <div class="section-head">
      <span class="section-tag">0x03 / uplink</span>
      <h2>Establish <span class="accent">Connection</span></h2>
      <p class="section-sub">Got a role, a bug bounty, a research collab, or just want to talk infosec? Open a channel below.</p>
    </div>

    <div class="contact-wrap">
         <form id="contact-form" class="contact-form" action="https://formspree.io/f/mwledrwq" method="POST">
        <div class="terminal-bar">
          <span class="dot red"></span><span class="dot amber"></span><span class="dot green"></span>
          <span class="terminal-title">send_message.sh</span>
        </div>

        <label>
          <span>$ set --name</span>
          <input type="text" name="name" placeholder="your_name" required />
        </label>
        <label>
          <span>$ set --email</span>
          <input type="email" name="email" placeholder="you@domain.com" required />
        </label>
        <label>
          <span>$ set --message</span>
          <textarea name="message" rows="5" placeholder="type your payload here..." required></textarea>
        </label>

        <button type="submit" class="btn btn-primary submit-btn">
          <span id="submit-label">execute ./send</span>
        </button>
        <p id="form-status" class="form-status"></p>
      </form>

      <div class="contact-side">
        <div class="contact-card">
          <h3>Direct channels</h3>
          <a class="channel" href="mailto:vighnesh@example.com">
            <span class="channel-ico">✉</span>
            <span><b>Email</b><small>vighneshshinde0610@gmail.com</small></span>
          </a>
          <a class="channel" href="https://github.com/" target="_blank" rel="noopener">
            <span class="channel-ico">⌥</span>
            <span><b>GitHub</b><small> www.linkedin.com/in/vighnesh-shinde </small></span>
          </a>
          <a class="channel" href="https://linkedin.com/" target="_blank" rel="noopener">
            <span class="channel-ico">in</span>
            <span><b>LinkedIn</b><small>https://www.linkedin.com/in/vighnesh-shinde-164890250/</small></span>
          </a>
        </div>

        <div class="contact-card small">
          <h3>Signal strength</h3>
          <div class="signal-bars">
            <span style="--h:30%"></span><span style="--h:55%"></span>
            <span style="--h:75%"></span><span style="--h:95%"></span><span style="--h:65%"></span>
          </div>
          <p>Response time: usually &lt; 24h</p>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <p>© <span id="year"></span> Vighnesh — built from scratch, encrypted with care.</p>
    <p class="footer-tag">// end of file</p>
  </footer>

</main>

<script type="module" src="script.js"></script>
</body>
</html>
