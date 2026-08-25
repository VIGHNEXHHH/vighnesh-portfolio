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

  // scroll-spy: highlight the nav link for the section currently in view
  const sections = ["hero","academics","certifications","projects","contact"]
    .map(id=> document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll(".nav-links a");

  function spy(){
    let current = sections[0];
    const y = window.scrollY + innerHeight * 0.35;
    for(const s of sections){ if(s.offsetTop <= y) current = s; }
    navLinks.forEach(a=>{
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });
  }
  window.addEventListener("scroll", spy, { passive:true });
  spy();
})();

/* ==========================================================================
   3b. REUSABLE 3D TILT ENGINE (mouse-follow perspective tilt + sheen)
   ========================================================================== */
function applyTilt(el, { max = 10, scale = 1.02 } = {}){
  let raf = null;
  function onMove(e){
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.setProperty("--mx", (px*100) + "%");
    el.style.setProperty("--my", (py*100) + "%");
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(()=>{
      el.style.transform = `translateY(-6px) scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  }
  function onLeave(){
    if(raf) cancelAnimationFrame(raf);
    el.style.transform = "";
  }
  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
}

function initTiltFor(selector, opts){
  if(matchMedia("(hover:none)").matches) return;
  document.querySelectorAll(selector).forEach(el=> applyTilt(el, opts));
}

/* ==========================================================================
   4. TYPED ROLE TEXT
   ========================================================================== */
(function typedRole(){
  const roles = [
    "Cybersecurity Enthusiast",
    "Aspiring Penetration Tester",
    "CTF Player",
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
    desc: "Developed a web-based vulnerability scanner featuring multi-threaded port scanning, service detection, banner grabbing, SSL analysis, and CVE-based vulnerability assessment. Implemented user authentication, scan history, downloadable TXT/JSON/HTML reports, dashboard analytics, and an admin management portal. Built a responsive interface with real-time security scoring, severity visualization, and detailed remediation recommendations. Python, Flask, SQLite technologies were used.",
    tags: ["multi-threaded port scanning", "service detection", "banner grabbing"],
    img: "images/vulnerability-scanner.jpg",
  },
  {
    name: "Food Hunter",
    tagline: "Real-time Food Delivery Website",
    desc: "A fully functional food delivery website developed using ASP.NET for the backend and MS SQL for the database. The platform supports user authentication, restaurant listings, order management, and real-time delivery status tracking.",
    tags: ["ASP.NET", "SQL"],
    img: "images/food-hunter.jpg",
  },
  {
    name: "VS SPORTS BLOG",
    tagline: "Basic Sports Blog Website",
    desc: "A dynamic blog platform centered around sports content, built using ASP.NET. It features a responsive layout, comment system, admin dashboard for post management, and SQL database integration for content storage.",
    tags: ["ASP.NET"],
    img: "images/vs-sports-blog.jpg",
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
  initTiltFor(".project-card", { max: 7, scale: 1.02 });
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