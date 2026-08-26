/* ==========================================================================
   VIGHNESH :: CYBER COMMAND INTERFACE — SCRIPT
   --------------------------------------------------------------------------
   Mercedes-AMG Vault Edition
   ========================================================================== */


/* ==========================================================================
   1. CONTENT DATA
========================================================================== */

const TIMELINE_DATA = [
  {
    period: "2022 — 2025",
    title: "BCA (Bachelor's in Computer Applications)",
    org: "Somaiya Vidhyavihar University",
    desc: "SCoursework in technology, programming, networking, databases, web development and computer systems.",
    tags: ["Networking", "Web Development", "OS Security"]
  },
  {
    period: "2020 — 2022",
    title: "Higher Secondary (Commerce)",
    org: "SYDENHAM COLLEGE OF COMMERCE AND ECONOMICS",
    desc: "Studied commerce fundamentals before moving towards the IT and cybersecurity domain.",
    tags: ["Economics", "Mathematics", "BookKeeping/Acc"]
  },
  {
    period: "2020",
    title: "Secondary",
    org: "DR. ANTONIO DA SILVA HIGH SCHOOL",
    desc: "Built the foundational academic knowledge.",
    tags: ["Science", "Mathematics"]
  }
];


const CERT_DATA = [
  {
    badge: "⚔",
    title: "Certified Ethical Hacker",
    issuer: "Hacker School",
    desc: "Gained knowledge of ethical hacking, vulnerability assessment, network security, penetration testing, and cybersecurity best practices.",
    id: "CEH-F-0007",
    hash: "9f3a2c"
  },
  {
    badge: "🐍",
    title: "Python Programming: A Step-by-Step Programming Course",
    issuer: "Knowledge Nest — Udemy",
    desc: "Acquired practical, hands-on skills in Python programming through a structured, project-driven course.",
    id: "PY-002",
    hash: "b71de0"
  },
  {
    badge: "◧",
    title: "Meta Frontend Developer",
    issuer: "Meta",
    desc: "Completed a foundational front-end development course covering HTML, CSS, JavaScript, and UI principles.",
    id: "FE-003",
    hash: "44e9aa"
  },
  {
    badge: "🛰",
    title: "Agnirva Space Internship Program",
    issuer: "Recognized by AICTE",
    desc: "Completed a certified space technology internship program, gaining exposure to satellite systems, aerospace principles, and real-world applications.",
    id: "SPC-004",
    hash: "1c8f5d"
  },
  {
    badge: "🛡",
    title: "ISRO Outreach Program — IIRS",
    issuer: "Indian Institute of Remote Sensing",
    desc: "Participated in ISRO's certified online learning program focused on space research, geospatial technologies, and remote sensing applications.",
    id: "ISRO-005",
    hash: "1c8f5d"
  }
];


const PROJECT_DATA = [
  {
    idx: "01",
      title:
        "Advanced Vulnerability Scanner",

      tagline:
        "Real-time Vulnerability Scanner",

      desc:
        "Developed a web-based vulnerability scanner featuring multi-threaded port scanning, service detection, banner grabbing, SSL analysis, and CVE-based vulnerability assessment. Implemented authentication, scan history, downloadable TXT/JSON/HTML reports, dashboard analytics, and an admin management portal.",

      tags:[
        "Python",
        "Flask",
        "Nmap",
        "CVE",
        "SQLite"
      ],

      image:
        "images/vulnerability-scanner.jpg"
  },

  {
    idx: "02",
      title:
        "Food Hunter",

      tagline:
        "Real-time Food Delivery Website",

      desc:
        "A fully functional food delivery website developed using ASP.NET for the backend and MS SQL for the database. The platform supports user authentication, restaurant listings, order management, and real-time delivery status tracking.",

      tags:[
        "ASP.NET",
        "MS SQL"
      ],

      image:
        "images/food-hunter.jpg"
  },

  {
    idx: "03",
      title:
        "VS SPORTS BLOG",

      tagline:
        "Sports Blog Website",

      desc:
        "A dynamic blog platform centered around sports content, built using ASP.NET. It features a responsive layout, comment system, admin dashboard for post management, and SQL database integration.",

      tags:[
        "ASP.NET",
        "SQL"
      ],

      image:
        "images/vs-sports-blog.jpg"
    }
];


const ROLE_STRINGS = [
  "Cybersecurity Researcher",
  "Penetration Tester in Training",
  "Full-Stack Developer",
  "CTF Player"
];


/* ==========================================================================
   2. BOOT SEQUENCE
========================================================================== */

function typeInto(el, text, speed = 22) {
  return new Promise((resolve) => {
    if (!el) {
      resolve();
      return;
    }

    let i = 0;

    el.textContent = "";

    const step = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;

        setTimeout(step, speed);
      } else {
        resolve();
      }
    };

    step();
  });
}


async function runBootSequence() {
  const boot = document.getElementById("boot-screen");

  const line1 = document.getElementById("boot-line-1");
  const line2 = document.getElementById("boot-line-2");
  const line3 = document.getElementById("boot-line-3");
  const line4 = document.getElementById("boot-line-4");

  const fill = document.getElementById("boot-progress-fill");
  const percent = document.getElementById("boot-percent");


  await typeInto(
    line1,
    "./boot_portfolio.sh --verbose",
    20
  );


  await typeInto(
    line2,
    "[*] mounting secure filesystem ... OK",
    12
  );


  await typeInto(
    line3,
    "[*] initializing vault subsystem VGHX-07 ... OK",
    12
  );


  await typeInto(
    line4,
    "[*] handing off to interface layer",
    12
  );


  await new Promise((resolve) => {
    let p = 0;

    const interval = setInterval(() => {
      p += Math.random() * 14 + 6;

      if (p >= 100) {
        p = 100;
      }

      if (fill) {
        fill.style.width = p + "%";
      }

      if (percent) {
        percent.textContent = Math.floor(p) + "%";
      }

      if (p >= 100) {
        clearInterval(interval);

        setTimeout(resolve, 260);
      }
    }, 90);
  });


  if (boot) {
    boot.classList.add("hide");

    setTimeout(() => {
      boot.style.display = "none";
    }, 850);
  }
}


/* ==========================================================================
   3. CUSTOM CURSOR
========================================================================== */

function initCustomCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");


  if (
    !dot ||
    !ring ||
    matchMedia("(hover:none)").matches
  ) {
    return;
  }


  let mx = innerWidth / 2;
  let my = innerHeight / 2;

  let rx = mx;
  let ry = my;


  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;

    dot.style.transform =
      `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });


  function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;

    ring.style.transform =
      `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;

    requestAnimationFrame(loop);
  }


  loop();


  const hoverables =
    "a, button, input, textarea, .project-card, .cert-card, .tag-chip";


  document.addEventListener("mouseover", (e) => {
    if (
      e.target.closest &&
      e.target.closest(hoverables)
    ) {
      ring.classList.add("hovered");
    }
  });


  document.addEventListener("mouseout", (e) => {
    if (
      e.target.closest &&
      e.target.closest(hoverables)
    ) {
      ring.classList.remove("hovered");
    }
  });
}


/* ==========================================================================
   4. AMBIENT CANVAS
========================================================================== */

function initAmbientCanvas(canvas, opts = {}) {
  if (!canvas) {
    return;
  }


  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }


  const density = opts.density || 42;

  let w = 0;
  let h = 0;
  let points = [];


  function resize() {
    const parent = canvas.parentElement;

    if (!parent) {
      return;
    }


    const rect = parent.getBoundingClientRect();

    w = canvas.width =
      rect.width * devicePixelRatio;

    h = canvas.height =
      rect.height * devicePixelRatio;


    canvas.style.width =
      rect.width + "px";

    canvas.style.height =
      rect.height + "px";


    const count =
      Math.max(
        24,
        Math.floor(
          (rect.width * rect.height) /
          (density * 900)
        )
      );


    points =
      new Array(count)
        .fill(0)
        .map(() => ({
          x: Math.random() * w,
          y: Math.random() * h,

          vx:
            (Math.random() - 0.5) *
            0.25 *
            devicePixelRatio,

          vy:
            (Math.random() - 0.5) *
            0.25 *
            devicePixelRatio,

          r:
            Math.random() * 1.6 + 0.6
        }));
  }


  function frame() {
    if (!w || !h || !points.length) {
      requestAnimationFrame(frame);
      return;
    }


    ctx.clearRect(0, 0, w, h);


    ctx.fillStyle =
      "rgba(50,245,227,.55)";


    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;


      if (
        p.x < 0 ||
        p.x > w
      ) {
        p.vx *= -1;
      }


      if (
        p.y < 0 ||
        p.y > h
      ) {
        p.vy *= -1;
      }


      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.r * devicePixelRatio,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }


    ctx.strokeStyle =
      "rgba(50,245,227,.08)";

    ctx.lineWidth = 1;


    for (
      let i = 0;
      i < points.length;
      i++
    ) {

      for (
        let j = i + 1;
        j < points.length;
        j++
      ) {

        const a = points[i];
        const b = points[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;

        const dist =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        if (
          dist <
          140 * devicePixelRatio
        ) {

          ctx.beginPath();

          ctx.moveTo(
            a.x,
            a.y
          );

          ctx.lineTo(
            b.x,
            b.y
          );

          ctx.stroke();
        }
      }
    }


    requestAnimationFrame(frame);
  }


  resize();

  window.addEventListener(
    "resize",
    resize
  );

  frame();
}


/* ==========================================================================
   5. NAVBAR
========================================================================== */

function initNavbar() {
  const navbar =
    document.getElementById("navbar");

  const burger =
    document.getElementById("nav-burger");

  const mobileMenu =
    document.getElementById("mobile-menu");


  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  const mobileLinks =
    document.querySelectorAll(
      "#mobile-menu a"
    );


  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 40) {

        if (navbar) {
          navbar.classList.add("scrolled");
        }

      } else {

        if (navbar) {
          navbar.classList.remove("scrolled");
        }

      }
    }
  );


  if (
    burger &&
    mobileMenu
  ) {

    burger.addEventListener(
      "click",
      () => {

        burger.classList.toggle("active");

        mobileMenu.classList.toggle("open");

      }
    );


    mobileLinks.forEach(
      (a) => {

        a.addEventListener(
          "click",
          () => {

            burger.classList.remove("active");

            mobileMenu.classList.remove("open");

          }
        );

      }
    );

  }


  const sections = [
    "hero",
    "academics",
    "certifications",
    "projects",
    "contact"
  ]
    .map(
      (id) =>
        document.getElementById(id)
    )
    .filter(Boolean);


  if (!sections.length) {
    return;
  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              const id =
                entry.target.id;


              navLinks.forEach(
                (a) => {

                  a.classList.toggle(
                    "active",
                    a.getAttribute("href") === "#" + id
                  );

                }
              );

            }

          }
        );

      },
      {
        rootMargin:
          "-45% 0px -45% 0px",

        threshold: 0
      }
    );


  sections.forEach(
    (section) =>
      observer.observe(section)
  );
}


/* ==========================================================================
   6. TYPED ROLE
========================================================================== */

function initTypedRole() {
  const el =
    document.getElementById(
      "typed-role"
    );


  if (!el) {
    return;
  }


  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;


  function tick() {

    const word =
      ROLE_STRINGS[
        wordIndex %
        ROLE_STRINGS.length
      ];


    if (!deleting) {

      charIndex++;

      el.textContent =
        word.slice(
          0,
          charIndex
        );


      if (
        charIndex ===
        word.length
      ) {

        deleting = true;

        setTimeout(
          tick,
          1500
        );

        return;
      }

    } else {

      charIndex--;

      el.textContent =
        word.slice(
          0,
          charIndex
        );


      if (
        charIndex === 0
      ) {

        deleting = false;

        wordIndex++;
      }
    }


    setTimeout(
      tick,
      deleting ? 28 : 55
    );
  }


  tick();
}


/* ==========================================================================
   7. CONTENT
========================================================================== */

function populateTimeline() {
  const root =
    document.getElementById(
      "timeline"
    );


  if (!root) {
    return;
  }


  root.innerHTML =
    TIMELINE_DATA.map(
      (item) => `

        <div class="timeline-item reveal">

          <div class="timeline-node"></div>

          <span class="t-period">
            ${item.period}
          </span>

          <h3>
            ${item.title}
          </h3>

          <div class="t-org">
            ${item.org}
          </div>

          <p class="t-desc">
            ${item.desc}
          </p>

          <div class="tag-row">

            ${item.tags
              .map(
                (tag) =>
                  `<span class="tag-chip">${tag}</span>`
              )
              .join("")}

          </div>

        </div>

      `
    ).join("");
}


function populateCerts() {
  const root =
    document.getElementById(
      "cert-grid"
    );


  if (!root) {
    return;
  }


  root.innerHTML =
    CERT_DATA.map(
      (c) => `

        <div class="cert-card reveal">

          <div class="cert-card-top">

            <div class="cert-badge">
              ${c.badge}
            </div>

            <span class="cert-verified">
              verified
            </span>

          </div>

          <h3>
            ${c.title}
          </h3>

          <span class="cert-issuer">
            ${c.issuer}
          </span>

          <p class="cert-desc">
            ${c.desc}
          </p>

          <div class="cert-card-foot">

            <span class="id-tag">
              ID: ${c.id}
            </span>

            <span class="hash">
              #${c.hash}
            </span>

          </div>

        </div>

      `
    ).join("");


  root
    .querySelectorAll(".cert-card")
    .forEach(
      (card) => {

        card.addEventListener(
          "mousemove",
          (e) => {

            const rect =
              card.getBoundingClientRect();


            card.style.setProperty(
              "--mx",
              e.clientX -
              rect.left +
              "px"
            );


            card.style.setProperty(
              "--my",
              e.clientY -
              rect.top +
              "px"
            );

          }
        );

      }
    );
}


function populateProjects() {
  const root =
    document.getElementById(
      "project-grid"
    );


  if (!root) {
    return;
  }


  root.innerHTML =
    PROJECT_DATA.map(
      (p) => `

        <article class="project-card reveal">

          <div
            class="project-card-media"
            style="background-image:url('${p.image}')"
          ></div>

          <div class="project-card-top">

            <span class="project-idx">
              ${p.idx}
            </span>

          </div>

          <div class="project-card-body">

            <h3>
              ${p.title}
            </h3>

            <p class="p-tagline">
              ${p.tagline}
            </p>

            <div class="project-card-more">

              <p>
                ${p.desc}
              </p>

              <div class="project-tags">

                ${p.tags
                  .map(
                    (tag) =>
                      `<span>${tag}</span>`
                  )
                  .join("")}

              </div>

              <div class="project-links">

                <a
                  href="${p.github}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source
                </a>

                <a
                  href="${p.demo}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  demo
                </a>

              </div>

            </div>

          </div>

        </article>

      `
    ).join("");
}


/* ==========================================================================
   8. SCROLL REVEAL
========================================================================== */

function initScrollReveal() {
  const revealEls =
    document.querySelectorAll(
      ".reveal, .section-head"
    );


  revealEls.forEach(
    (el) =>
      el.classList.add("reveal")
  );


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "in-view"
              );


              observer.unobserve(
                entry.target
              );
            }

          }
        );

      },
      {
        threshold: 0.15
      }
    );


  document
    .querySelectorAll(".reveal")
    .forEach(
      (el) =>
        observer.observe(el)
    );
}


/* ==========================================================================
   9. CONTACT FORM
========================================================================== */

function initContactForm() {
  const form =
    document.getElementById(
      "contact-form"
    );


  const status =
    document.getElementById(
      "form-status"
    );


  const label =
    document.getElementById(
      "submit-label"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();


      if (label) {
        label.textContent =
          "sending...";
      }


      if (status) {
        status.textContent = "";
        status.className =
          "form-status";
      }


      try {

        const res =
          await fetch(
            form.action,
            {
              method: "POST",

              body:
                new FormData(form),

              headers: {
                Accept:
                  "application/json"
              }
            }
          );


        if (res.ok) {

          if (status) {

            status.textContent =
              "> message sent // I'll respond within 24h";

            status.classList.add(
              "ok"
            );

          }

          form.reset();

        } else {

          throw new Error(
            "send failed"
          );

        }

      } catch (err) {

        if (status) {

          status.textContent =
            "> transmission failed // try email directly";

          status.classList.add(
            "err"
          );

        }

      } finally {

        if (label) {

          label.textContent =
            "execute ./send";

        }

      }

    }
  );
}


/* ==========================================================================
   10. VAULT HACKING LOG
========================================================================== */

const VAULT_LOG_LINES = [

  {
    text:
      "root@vighnesh:~$ ./breach_vault.sh --target VGHX-07",
    cls: ""
  },

  {
    text:
      "[*] scanning vault firmware ...... OK",
    cls: ""
  },

  {
    text:
      "[*] negotiating AES-256 handshake",
    cls: ""
  },

  {
    text:
      "[!] intrusion detection triggered",
    cls: "warning"
  },

  {
    text:
      "[*] spoofing auth token ... 96%",
    cls: ""
  },

  {
    text:
      "[+] auth token forged successfully",
    cls: "success"
  },

  {
    text:
      "[+] ACCESS GRANTED :: LEVEL 07",
    cls: "success"
  }

];


function appendVaultLine(line, delay) {
  return new Promise(
    (resolve) => {

      setTimeout(
        () => {

          const log =
            document.getElementById(
              "vault-log"
            );


          if (!log) {
            resolve();
            return;
          }


          const div =
            document.createElement(
              "div"
            );


          div.className =
            "vault-log-line" +
            (
              line.cls
                ? " " + line.cls
                : ""
            );


          div.textContent =
            line.text;


          log.appendChild(div);


          while (
            log.children.length >
            6
          ) {

            log.removeChild(
              log.firstChild
            );

          }


          log.scrollTop =
            log.scrollHeight;


          resolve();

        },
        delay
      );

    }
  );
}


/* ==========================================================================
   11. MERCEDES THREE.JS SYSTEM
========================================================================== */

let THREE = null;
let GLTFLoader = null;

let mercedesRenderer = null;
let mercedesScene = null;
let mercedesCamera = null;
let mercedesRoot = null;

let mercedesLoaded = false;

let headlightObjects = [];
let headlightLights = [];

let mercedesCanvas = null;
let mercedesStage = null;

let mercedesLastTime =
  performance.now();


/* ==========================================================================
   12. INITIALIZE MERCEDES
========================================================================== */

async function initMercedes() {

  mercedesStage =
    document.getElementById(
      "vault-stage"
    );


  mercedesCanvas =
    document.getElementById(
      "vault-canvas"
    );


  if (
    !mercedesStage ||
    !mercedesCanvas
  ) {

    console.error(
      "Mercedes: vault-stage or vault-canvas not found."
    );

    return;
  }


  try {

    const threeModule =
      await import("three");


    const loaderModule =
      await import(
        "three/addons/loaders/GLTFLoader.js"
      );


    THREE =
      threeModule;


    GLTFLoader =
      loaderModule.GLTFLoader;


    createMercedesScene();

    loadMercedesModel();

  } catch (error) {

    console.error(
      "Mercedes initialization failed:",
      error
    );

  }
}


/* ==========================================================================
   13. CREATE MERCEDES SCENE
========================================================================== */

function createMercedesScene() {

  mercedesRenderer =
    new THREE.WebGLRenderer({

      canvas: mercedesCanvas,

      alpha: true,

      antialias: true,

      powerPreference:
        "high-performance"

    });


  mercedesRenderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );


  if (
    "outputColorSpace"
    in mercedesRenderer
  ) {

    mercedesRenderer.outputColorSpace =
      THREE.SRGBColorSpace;

  }


  mercedesRenderer.toneMapping =
    THREE.ACESFilmicToneMapping;


  mercedesRenderer.toneMappingExposure =
    1.15;


  mercedesScene =
    new THREE.Scene();


  mercedesCamera =
    new THREE.PerspectiveCamera(
      28,
      1,
      0.01,
      1000
    );


  mercedesCamera.position.set(
    4.8,
    1.55,
    6.8
  );


  mercedesCamera.lookAt(
    0,
    0.65,
    0
  );


  /* ------------------------------------------------------------------------
     LIGHTING
  ------------------------------------------------------------------------ */

  const hemi =
    new THREE.HemisphereLight(
      0xd9f5ff,
      0x020306,
      1.7
    );


  mercedesScene.add(
    hemi
  );


  const key =
    new THREE.DirectionalLight(
      0xffffff,
      2.4
    );


  key.position.set(
    4,
    7,
    5
  );


  mercedesScene.add(
    key
  );


  const cyanRim =
    new THREE.DirectionalLight(
      0x32f5e3,
      2.3
    );


  cyanRim.position.set(
    -5,
    3,
    4
  );


  mercedesScene.add(
    cyanRim
  );


  


  

  /* ------------------------------------------------------------------------
     FLOOR
  ------------------------------------------------------------------------ */

  const floorGeometry =
    new THREE.CircleGeometry(
      4,
      64
    );


  const floorMaterial =
    new THREE.MeshStandardMaterial({

      color: 0x020406,

      metalness: 0.85,

      roughness: 0.24,

      transparent: true,

      opacity: 0.85

    });


  const floor =
    new THREE.Mesh(
      floorGeometry,
      floorMaterial
    );


  floor.rotation.x =
    -Math.PI / 2;


  floor.position.y =
    -0.04;


  mercedesScene.add(
    floor
  );


  resizeMercedes();
}


/* ==========================================================================
   14. LOAD MERCEDES GLB
========================================================================== */

function loadMercedesModel() {

  const loader =
    new GLTFLoader();


  const MODEL_URL =
    "./assets/mercedes-amg.glb";


  console.log(
    "Loading Mercedes:",
    MODEL_URL
  );


  loader.load(

    MODEL_URL,

    (gltf) => {

      const model =
        gltf.scene;


      console.log(
        "Mercedes-AMG loaded successfully."
      );


      /* ----------------------------------------------------------------------
         MODEL MATERIALS
      ---------------------------------------------------------------------- */

      model.traverse(
        (object) => {

          if (!object.isMesh) {
            return;
          }


          object.castShadow =
            false;


          object.receiveShadow =
            false;


          const materials =
            Array.isArray(
              object.material
            )
              ? object.material
              : [object.material];


          materials.forEach(
            (material) => {

              if (
                material &&
                "envMapIntensity"
                in material
              ) {

                material.envMapIntensity =
                  1.5;

              }


              if (material) {
                material.needsUpdate =
                  true;
              }

            }
          );

        }
      );


      /* ----------------------------------------------------------------------
         CALCULATE MODEL SIZE
      ---------------------------------------------------------------------- */

      const box =
        new THREE.Box3()
          .setFromObject(model);


      const size =
        new THREE.Vector3();


      box.getSize(size);


      const maxDimension =
        Math.max(
          size.x,
          size.y,
          size.z
        );


      const targetSize =
        3.15;


      const scale =
        targetSize /
        Math.max(
          maxDimension,
          0.001
        );


      model.scale.setScalar(
        scale
      );


      /* ----------------------------------------------------------------------
         RECALCULATE AFTER SCALE
      ---------------------------------------------------------------------- */

      const scaledBox =
        new THREE.Box3()
          .setFromObject(model);


      const center =
        new THREE.Vector3();


      scaledBox.getCenter(
        center
      );


      model.position.x -=
        center.x;


      model.position.z -=
        center.z;


      model.position.y -=
        scaledBox.min.y;


      model.position.y -=
        0.015;


      /* ----------------------------------------------------------------------
         ROOT GROUP
      ---------------------------------------------------------------------- */

      mercedesRoot =
        new THREE.Group();


      mercedesRoot.add(
        model
      );


      mercedesScene.add(
        mercedesRoot
      );


      mercedesRoot.rotation.y =
        -Math.PI * 0.18;


      /*
         Start almost invisible.
         illuminateMercedes() will turn
         the headlights on later.
      */

      mercedesRoot.scale.setScalar(
        0.001
      );


      mercedesLoaded =
        true;


      createMercedesHeadlights(
        scaledBox
      );


      console.log(
        "Mercedes ready inside vault."
      );

    },


    undefined,


    (error) => {

      console.error(
        "Mercedes GLB failed to load.",
        error
      );

    }

  );
}



/* ==========================================================================
   16. HEADLIGHT + CAR REVEAL
========================================================================== */

function illuminateMercedes() {

  if (!mercedesLoaded || !mercedesRoot) {
    return;
  }


  const start =
    performance.now();


  const duration =
    1200;


  function animate(now) {

    const progress =
      Math.min(
        1,
        (now - start) /
        duration
      );


    const eased =
      progress *
      progress *
      (3 - 2 * progress);


    /* ----------------------------------------------------------------------
       CAR REVEAL
    ---------------------------------------------------------------------- */

    const carScale =
      0.001 +
      eased * 0.999;


    mercedesRoot.scale.setScalar(
      carScale
    );


    /* ----------------------------------------------------------------------
       HEADLIGHT POWER
    ---------------------------------------------------------------------- */

    headlightObjects.forEach(
      (lamp) => {

        if (
          lamp.material
        ) {

          lamp.material.emissiveIntensity =
            eased * 4;

        }

      }
    );


    headlightLights.forEach(
      (light) => {

        light.intensity =
          eased * 4;

      }
    );


    /* ----------------------------------------------------------------------
       CSS GLOW
    ---------------------------------------------------------------------- */

    const glows =
      document.querySelectorAll(
        ".headlight-glow"
      );


    glows.forEach(
      (glow) => {

        glow.style.opacity =
          String(
            eased * 0.8
          );


        glow.style.transform =
          `scale(${0.7 + eased * 0.35})`;

      }
    );


    if (progress < 1) {

      requestAnimationFrame(
        animate
      );

    }

  }


  requestAnimationFrame(
    animate
  );
}


/* ==========================================================================
   17. MERCEDES RENDER LOOP
========================================================================== */

function mercedesRenderLoop(now) {

  const dt =
    Math.min(
      0.05,
      (now - mercedesLastTime) /
      1000
    );


  mercedesLastTime =
    now;


  if (
    mercedesRoot &&
    mercedesLoaded
  ) {

    const time =
      now * 0.001;


    /* ----------------------------------------------------------------------
       VERY SUBTLE IDLE MOVEMENT
    ---------------------------------------------------------------------- */

    mercedesRoot.position.y =
      Math.sin(
        time * 1.1
      ) * 0.008;


    /* ----------------------------------------------------------------------
       SUBTLE ROTATION
    ---------------------------------------------------------------------- */

    mercedesRoot.rotation.y +=
      Math.sin(
        time * 0.35
      ) *
      dt *
      0.008;

    /* =========================================================
        CONTINUOUS MERCEDES ROTATION
      ========================================================= */

      mercedesRoot.rotation.y += dt * 0.35;

  }


  /* ------------------------------------------------------------------------
     RENDER
  ------------------------------------------------------------------------ */

  if (
    mercedesRenderer &&
    mercedesScene &&
    mercedesCamera
  ) {

    mercedesRenderer.render(
      mercedesScene,
      mercedesCamera
    );

  }


  requestAnimationFrame(
    mercedesRenderLoop
  );
}


/* ==========================================================================
   18. RESIZE MERCEDES
========================================================================== */

function resizeMercedes() {

  if (
    !mercedesRenderer ||
    !mercedesStage ||
    !mercedesCamera
  ) {

    return;
  }


  const width =
    mercedesStage.clientWidth ||
    1;


  const height =
    mercedesStage.clientHeight ||
    1;


  mercedesRenderer.setSize(
    width,
    height,
    false
  );


  mercedesCamera.aspect =
    width / height;


  mercedesCamera.updateProjectionMatrix();
}


window.addEventListener(
  "resize",
  resizeMercedes
);


/* ==========================================================================
   19. VAULT HACK SEQUENCE
========================================================================== */

async function runVaultHackSequence() {

  const doors =
    document.getElementById(
      "vault-doors"
    );


  const hudStatus =
    document.getElementById(
      "vault-hud-status"
    );


  const integrityLabel =
    document.getElementById(
      "vault-integrity-label"
    );


  const access =
    document.getElementById(
      "vault-access"
    );


  const achievement =
    document.getElementById(
      "vault-achievement"
    );


  /* ------------------------------------------------------------------------
     START HACKING
  ------------------------------------------------------------------------ */

  if (doors) {

    doors.classList.add(
      "hacking"
    );

  }


  if (hudStatus) {

    hudStatus.textContent =
      "SECURE VAULT // BREACHING";

  }


  /* ------------------------------------------------------------------------
     TERMINAL LOG
  ------------------------------------------------------------------------ */

  for (
    const line
    of VAULT_LOG_LINES
  ) {

    await appendVaultLine(
      line,
      620
    );

  }


  /* ------------------------------------------------------------------------
     ACCESS GRANTED
  ------------------------------------------------------------------------ */

  if (hudStatus) {

    hudStatus.textContent =
      "SECURE VAULT // ACCESS GRANTED";

  }


  if (integrityLabel) {

    integrityLabel.textContent =
      "VAULT INTEGRITY BYPASSED";

  }


  await new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        350
      )
  );


  if (access) {

    access.classList.add(
      "show"
    );

  }


  await new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        1150
      )
  );


  if (access) {

    access.classList.remove(
      "show"
    );

  }


  /* ------------------------------------------------------------------------
     ACHIEVEMENT
  ------------------------------------------------------------------------ */

  if (achievement) {

    achievement.classList.add(
      "show"
    );

  }


  await new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        450
      )
  );


  /* ------------------------------------------------------------------------
     OPEN VAULT
  ------------------------------------------------------------------------ */

  if (doors) {

    /* Stop hacking animation */
    doors.classList.remove(
      "hacking"
    );

    /* Open the four vault doors */
    doors.classList.add(
      "open"
    );

    /* After the doors visually open,
      remove the entire vault-door layer */

    setTimeout(() => {

      doors.classList.add(
        "vault-hidden"
      );

    }, 750);

  }


  /* ------------------------------------------------------------------------
     REVEAL MERCEDES
  ------------------------------------------------------------------------ */

  await new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        900
      )
  );


  const stage =
    document.getElementById(
      "vault-stage"
    );


  if (stage) {

    stage.classList.add(
      "revealed"
    );

  }


  illuminateMercedes();


  /* ------------------------------------------------------------------------
     FINISH ACHIEVEMENT
  ------------------------------------------------------------------------ */

  await new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        1100
      )
  );


  if (achievement) {

    achievement.classList.remove(
      "show"
    );

  }
}


/* ==========================================================================
   20. BOOTSTRAP
========================================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /* ----------------------------------------------------------------------
       CURRENT YEAR
    ---------------------------------------------------------------------- */

    const yearEl =
      document.getElementById(
        "year"
      );


    if (yearEl) {

      yearEl.textContent =
        new Date()
          .getFullYear();

    }


    /* ----------------------------------------------------------------------
       CUSTOM CURSOR
    ---------------------------------------------------------------------- */

    initCustomCursor();


    /* ----------------------------------------------------------------------
       AMBIENT CANVASES

       IMPORTANT:
       vault-canvas is NOT initialized here because
       Three.js uses that canvas for WebGL.
    ---------------------------------------------------------------------- */

    initAmbientCanvas(
      document.getElementById(
        "grid-canvas"
      ),
      {
        density: 60
      }
    );


    initAmbientCanvas(
      document.getElementById(
        "hero-canvas"
      ),
      {
        density: 34
      }
    );


    /* ----------------------------------------------------------------------
       NAVBAR
    ---------------------------------------------------------------------- */

    initNavbar();


    /* ----------------------------------------------------------------------
       TYPED ROLE
    ---------------------------------------------------------------------- */

    initTypedRole();


    /* ----------------------------------------------------------------------
       CONTENT
    ---------------------------------------------------------------------- */

    populateTimeline();

    populateCerts();

    populateProjects();


    /* ----------------------------------------------------------------------
       SCROLL REVEAL
    ---------------------------------------------------------------------- */

    initScrollReveal();


    /* ----------------------------------------------------------------------
       CONTACT
    ---------------------------------------------------------------------- */

    initContactForm();


    /* ----------------------------------------------------------------------
       START MERCEDES THREE.JS
    ---------------------------------------------------------------------- */

    initMercedes();


    /*
       Start ONE and ONLY ONE Mercedes render loop.
    */

    requestAnimationFrame(
      mercedesRenderLoop
    );


    /* ----------------------------------------------------------------------
       BOOT → VAULT HACK
    ---------------------------------------------------------------------- */

    runBootSequence()
      .then(
        () => {

          setTimeout(
            () => {

              runVaultHackSequence();

            },
            700
          );

        }
      );

  }
);