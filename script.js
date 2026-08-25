import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";


/* ==========================================================================
   0. BOOT SEQUENCE
========================================================================== */

(function boot(){

  const lines = [

    {
      el:"#boot-line-1",
      text:"initiating secure session..."
    },

    {
      el:"#boot-line-2",
      text:"loading modules :: three.js, ui-core, matrix-grid"
    },

    {
      el:"#boot-line-3",
      text:"mounting profile :: vighnesh.dev"
    },

    {
      el:"#boot-line-4",
      text:"access granted."
    }

  ];

  let i = 0;

  function typeLine(callback){

    if(i >= lines.length){
      callback();
      return;
    }

    const {el,text} = lines[i];

    const node = document.querySelector(el);

    if(!node){
      i++;
      typeLine(callback);
      return;
    }

    let c = 0;

    const timer = setInterval(()=>{

      node.textContent =
        text.slice(0,c) +
        (c < text.length ? "▌" : "");

      c++;

      if(c > text.length){

        clearInterval(timer);

        node.textContent = text;

        i++;

        setTimeout(
          ()=>typeLine(callback),
          90
        );

      }

    },14);

  }


  let pct = 0;

  const fill =
    document.getElementById(
      "boot-progress-fill"
    );

  const pctLabel =
    document.getElementById(
      "boot-percent"
    );


  const progressTimer =
    setInterval(()=>{

      pct =
        Math.min(
          100,
          pct + Math.random()*14
        );

      if(fill)
        fill.style.width =
          pct+"%";

      if(pctLabel)
        pctLabel.textContent =
          Math.floor(pct)+"%";


      if(pct >= 100){

        clearInterval(
          progressTimer
        );

      }

    },110);


  typeLine(()=>{

    setTimeout(()=>{

      document
        .getElementById("boot-screen")
        ?.classList.add("hide");

      document.body.style.overflow = "";

    },500);

  });

})();



/* ==========================================================================
   1. CUSTOM CURSOR
========================================================================== */

(function cursor(){

  const dot =
    document.getElementById(
      "cursor-dot"
    );

  const ring =
    document.getElementById(
      "cursor-ring"
    );

  if(!dot || !ring)
    return;


  let mx = innerWidth / 2;
  let my = innerHeight / 2;

  let rx = mx;
  let ry = my;


  window.addEventListener(
    "mousemove",
    e=>{

      mx = e.clientX;
      my = e.clientY;

      dot.style.left =
        mx+"px";

      dot.style.top =
        my+"px";

    },
    {passive:true}
  );


  function loop(){

    rx +=
      (mx-rx)*0.18;

    ry +=
      (my-ry)*0.18;

    ring.style.left =
      rx+"px";

    ring.style.top =
      ry+"px";

    requestAnimationFrame(loop);

  }

  loop();


  function bind(){

    document
      .querySelectorAll(
        "a,button,.project-card,input,textarea"
      )
      .forEach(el=>{

        if(el.dataset.cursorBound)
          return;

        el.dataset.cursorBound = "1";


        el.addEventListener(
          "mouseenter",
          ()=>{
            ring.classList.add(
              "hovered"
            );
          }
        );


        el.addEventListener(
          "mouseleave",
          ()=>{
            ring.classList.remove(
              "hovered"
            );
          }
        );

      });

  }


  bind();

  window.__rebindCursor = bind;

})();



/* ==========================================================================
   2. GLOBAL NETWORK GRID
========================================================================== */

(function gridBg(){

  const canvas =
    document.getElementById(
      "grid-canvas"
    );

  if(!canvas)
    return;


  const ctx =
    canvas.getContext("2d");


  let w;
  let h;

  let nodes = [];


  const COUNT = 70;


  function resize(){

    w =
      canvas.width =
      innerWidth;

    h =
      canvas.height =
      document.documentElement.scrollHeight;

  }


  function initNodes(){

    nodes =
      Array.from(
        {length:COUNT},
        ()=>({

          x:Math.random()*w,
          y:Math.random()*h,

          vx:(Math.random()-.5)*.15,
          vy:(Math.random()-.5)*.15

        })
      );

  }


  resize();
  initNodes();


  window.addEventListener(
    "resize",
    ()=>{

      resize();
      initNodes();

    }
  );


  function draw(){

    ctx.clearRect(
      0,
      0,
      w,
      h
    );


    const viewTop =
      window.scrollY - 200;

    const viewBottom =
      window.scrollY +
      innerHeight +
      200;


    nodes.forEach(n=>{

      n.x += n.vx;
      n.y += n.vy;


      if(
        n.x < 0 ||
        n.x > w
      )
        n.vx *= -1;


      if(
        n.y < 0 ||
        n.y > h
      )
        n.vy *= -1;

    });


    for(
      let i=0;
      i<nodes.length;
      i++
    ){

      const a =
        nodes[i];


      if(
        a.y < viewTop ||
        a.y > viewBottom
      )
        continue;


      for(
        let j=i+1;
        j<nodes.length;
        j++
      ){

        const b =
          nodes[j];


        const dx =
          a.x-b.x;

        const dy =
          a.y-b.y;


        const dist =
          Math.sqrt(
            dx*dx +
            dy*dy
          );


        if(dist < 140){

          ctx.strokeStyle =
            `rgba(51,240,224,${
              .10*(1-dist/140)
            })`;

          ctx.lineWidth = 1;

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


      ctx.fillStyle =
        "rgba(51,240,224,.35)";


      ctx.beginPath();

      ctx.arc(
        a.x,
        a.y,
        1.4,
        0,
        Math.PI*2
      );

      ctx.fill();

    }


    requestAnimationFrame(draw);

  }


  draw();


  window.addEventListener(
    "load",
    ()=>{

      setTimeout(()=>{

        resize();
        initNodes();

      },400);

    }
  );

})();



/* ==========================================================================
   3. NAVIGATION
========================================================================== */

(function nav(){

  const navbar =
    document.getElementById(
      "navbar"
    );


  function updateNavbar(){

    navbar?.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

  }


  window.addEventListener(
    "scroll",
    updateNavbar,
    {passive:true}
  );


  updateNavbar();


  const burger =
    document.getElementById(
      "nav-burger"
    );


  const menu =
    document.getElementById(
      "mobile-menu"
    );


  burger?.addEventListener(
    "click",
    ()=>{
      menu?.classList.toggle(
        "open"
      );
    }
  );


  menu
    ?.querySelectorAll("a")
    .forEach(a=>{

      a.addEventListener(
        "click",
        ()=>{
          menu.classList.remove(
            "open"
          );
        }
      );

    });


  const sections = [
    "hero",
    "academics",
    "certifications",
    "projects",
    "contact"
  ]
    .map(id=>
      document.getElementById(id)
    )
    .filter(Boolean);


  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  function spy(){

    let current =
      sections[0];


    const y =
      window.scrollY +
      innerHeight*.35;


    sections.forEach(section=>{

      if(
        section.offsetTop <= y
      ){

        current =
          section;

      }

    });


    navLinks.forEach(a=>{

      a.classList.toggle(
        "active",
        a.getAttribute("href") ===
        "#"+current.id
      );

    });

  }


  window.addEventListener(
    "scroll",
    spy,
    {passive:true}
  );


  spy();

})();



/* ==========================================================================
   4. TILT ENGINE
========================================================================== */

function applyTilt(
  el,
  {
    max=10,
    scale=1.02
  }={}
){

  let raf = null;


  function onMove(e){

    const r =
      el.getBoundingClientRect();


    const px =
      (e.clientX-r.left) /
      r.width;


    const py =
      (e.clientY-r.top) /
      r.height;


    const rx =
      (.5-py)*max*2;


    const ry =
      (px-.5)*max*2;


    el.style.setProperty(
      "--mx",
      px*100+"%"
    );


    el.style.setProperty(
      "--my",
      py*100+"%"
    );


    if(raf)
      cancelAnimationFrame(raf);


    raf =
      requestAnimationFrame(()=>{

        el.style.transform =
          `translateY(-6px)
           scale(${scale})
           rotateX(${rx}deg)
           rotateY(${ry}deg)`;

      });

  }


  function onLeave(){

    if(raf)
      cancelAnimationFrame(raf);

    el.style.transform = "";

  }


  el.addEventListener(
    "mousemove",
    onMove
  );


  el.addEventListener(
    "mouseleave",
    onLeave
  );

}


function initTiltFor(
  selector,
  opts
){

  if(
    matchMedia(
      "(hover:none)"
    ).matches
  )
    return;


  document
    .querySelectorAll(selector)
    .forEach(
      el=>applyTilt(el,opts)
    );

}



/* ==========================================================================
   5. TYPED ROLE
========================================================================== */

(function typedRole(){

  const roles = [

    "Cybersecurity Enthusiast",
    "Aspiring Penetration Tester",
    "Network Security Learner",
    "Ethical Hacker in training"

  ];


  const el =
    document.getElementById(
      "typed-role"
    );


  if(!el)
    return;


  let ri=0;
  let ci=0;
  let deleting=false;


  function tick(){

    const word =
      roles[ri];


    if(!deleting){

      ci++;

      el.textContent =
        word.slice(0,ci);


      if(
        ci === word.length
      ){

        deleting = true;

        setTimeout(
          tick,
          1400
        );

        return;

      }

    }
    else{

      ci--;

      el.textContent =
        word.slice(0,ci);


      if(ci === 0){

        deleting = false;

        ri =
          (ri+1) %
          roles.length;

      }

    }


    setTimeout(
      tick,
      deleting ? 35 : 65
    );

  }


  tick();

})();



/* ==========================================================================
   6. THREE.JS CYBER VAULT — FINAL ACHIEVEMENT SYSTEM

   SEQUENCE:

   1. Terminal starts processing
   2. Security checks run
   3. Authentication completes
   4. ACCESS GRANTED appears
   5. Vault lock stops
   6. Vault interior activates
   7. Four vault doors separate
   8. Headlights turn on
   9. Car slowly exits the vault
   10. Car clears the vault
   11. Car continuously rotates
   12. Car remains visible until page is closed
========================================================================== */

(function cyberVault(){

  const canvas =
    document.getElementById(
      "vault-canvas"
    );

  const stage =
    document.getElementById(
      "vault-stage"
    );


  if(!canvas || !stage)
    return;



  /* ==============================================================
     SCENE
  ============================================================== */

  const scene =
    new THREE.Scene();


  const camera =
    new THREE.PerspectiveCamera(
      38,
      stage.clientWidth /
      stage.clientHeight,
      .1,
      100
    );


  camera.position.set(
    0,
    .25,
    9
  );


  const renderer =
    new THREE.WebGLRenderer({

      canvas,

      antialias:true,

      alpha:true

    });


  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );


  renderer.setSize(
    stage.clientWidth,
    stage.clientHeight
  );


  renderer.shadowMap.enabled =
    true;


  renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;



  /* ==============================================================
     LIGHTING
  ============================================================== */

  const ambient =
    new THREE.AmbientLight(
      0x071316,
      2.2
    );

  scene.add(
    ambient
  );


  const cyanLight =
    new THREE.PointLight(
      0x33f0e0,
      9,
      16
    );


  cyanLight.position.set(
    3,
    3,
    5
  );


  scene.add(
    cyanLight
  );


  const orangeLight =
    new THREE.PointLight(
      0xff9d22,
      3.5,
      14
    );


  orangeLight.position.set(
    -4,
    1,
    2
  );


  scene.add(
    orangeLight
  );


  const vaultLight =
    new THREE.PointLight(
      0x33f0e0,
      0,
      10
    );


  vaultLight.position.set(
    0,
    0,
    2.2
  );


  scene.add(
    vaultLight
  );



  /* ==============================================================
     MATERIALS
  ============================================================== */

  const vaultMetal =
    new THREE.MeshStandardMaterial({

      color:0x151d22,

      metalness:.92,

      roughness:.25

    });


  const darkMetal =
    new THREE.MeshStandardMaterial({

      color:0x060a0d,

      metalness:.9,

      roughness:.28

    });


  const edgeMaterial =
    new THREE.MeshStandardMaterial({

      color:0x33f0e0,

      emissive:0x33f0e0,

      emissiveIntensity:1.8,

      metalness:.7,

      roughness:.22

    });


  const blackMaterial =
    new THREE.MeshStandardMaterial({

      color:0x010304,

      metalness:.75,

      roughness:.32

    });


  const glassMaterial =
    new THREE.MeshPhysicalMaterial({

      color:0x071518,

      metalness:.15,

      roughness:.08,

      transmission:.15,

      transparent:true,

      opacity:.8

    });



  /* ==============================================================
     VAULT ROOT
  ============================================================== */

  const vault =
    new THREE.Group();


  vault.position.set(
    .2,
    .05,
    0
  );


  vault.rotation.y =
    -.16;


  scene.add(
    vault
  );



  /* ==============================================================
     VAULT BACK WALL

     IMPORTANT:
     We intentionally DO NOT use a solid front-facing box.

     This allows the car to actually be visible inside the vault.
  ============================================================== */

  const backWall =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        4.0,
        4.0,
        .22
      ),

      vaultMetal

    );


  backWall.position.z =
    -.55;


  vault.add(
    backWall
  );



  /* ==============================================================
     INNER CHAMBER
  ============================================================== */

  const chamber =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        3.35,
        3.35,
        .12
      ),

      blackMaterial

    );


  chamber.position.set(
    0,
    0,
    -.39
  );


  vault.add(
    chamber
  );



  /* ==============================================================
     INNER GLOW
  ============================================================== */

  const innerGlow =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        3.05,
        3.05
      ),

      new THREE.MeshBasicMaterial({

        color:0x33f0e0,

        transparent:true,

        opacity:.025

      })

    );


  innerGlow.position.set(
    0,
    0,
    -.28
  );


  vault.add(
    innerGlow
  );



  /* ==============================================================
     VAULT OUTER FRAME
  ============================================================== */

  function framePart(
    width,
    height,
    x,
    y,
    z
  ){

    const mesh =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          width,
          height,
          .3
        ),

        darkMetal

      );


    mesh.position.set(
      x,
      y,
      z
    );


    vault.add(
      mesh
    );


    return mesh;

  }


  framePart(
    .28,
    4.35,
    -2.0,
    0,
    .05
  );


  framePart(
    .28,
    4.35,
    2.0,
    0,
    .05
  );


  framePart(
    4.35,
    .28,
    0,
    2.0,
    .05
  );


  framePart(
    4.35,
    .28,
    0,
    -2.0,
    .05
  );



  /* ==============================================================
     CYAN FRAME EDGES
  ============================================================== */

  function glowingBar(
    width,
    height,
    x,
    y
  ){

    const mesh =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          width,
          height,
          .08
        ),

        edgeMaterial

      );


    mesh.position.set(
      x,
      y,
      .23
    );


    vault.add(
      mesh
    );

  }


  glowingBar(
    .055,
    3.75,
    -1.91,
    0
  );


  glowingBar(
    .055,
    3.75,
    1.91,
    0
  );


  glowingBar(
    3.75,
    .055,
    0,
    1.91
  );


  glowingBar(
    3.75,
    .055,
    0,
    -1.91
  );



  /* ==============================================================
     FOUR VAULT DOORS
  ============================================================== */

  const doors = [];


  function createDoor(
    width,
    height,
    x,
    y,
    type
  ){

    const pivot =
      new THREE.Group();


    pivot.position.set(
      x,
      y,
      .32
    );


    vault.add(
      pivot
    );


    const door =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          width,
          height,
          .18
        ),

        darkMetal

      );


    pivot.add(
      door
    );


    /* Inner metallic plate */

    const plate =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          width*.82,
          height*.82,
          .045
        ),

        vaultMetal

      );


    plate.position.z =
      .115;


    door.add(
      plate
    );


    /* Door border */

    const border =
      new THREE.LineSegments(

        new THREE.EdgesGeometry(
          new THREE.BoxGeometry(
            width*.88,
            height*.88,
            .055
          )
        ),

        new THREE.LineBasicMaterial({

          color:0x33f0e0,

          transparent:true,

          opacity:.55

        })

      );


    border.position.z =
      .15;


    door.add(
      border
    );


    doors.push({

      pivot,

      type,

      x,

      y,

      opened:false

    });

  }


  createDoor(
    1.92,
    1.92,
    -.96,
    .96,
    "top-left"
  );


  createDoor(
    1.92,
    1.92,
    .96,
    .96,
    "top-right"
  );


  createDoor(
    1.92,
    1.92,
    -.96,
    -.96,
    "bottom-left"
  );


  createDoor(
    1.92,
    1.92,
    .96,
    -.96,
    "bottom-right"
  );



  /* ==============================================================
     CENTRAL LOCK
  ============================================================== */

  const lock =
    new THREE.Group();


  lock.position.set(
    0,
    0,
    .55
  );


  vault.add(
    lock
  );


  const lockOuter =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .56,
        .56,
        .16,
        48
      ),

      darkMetal

    );


  lockOuter.rotation.x =
    Math.PI/2;


  lock.add(
    lockOuter
  );


  const lockRing =
    new THREE.Mesh(

      new THREE.TorusGeometry(
        .42,
        .045,
        12,
        48
      ),

      edgeMaterial

    );


  lockRing.position.z =
    .1;


  lock.add(
    lockRing
  );


  const lockCore =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .18,
        .18,
        .08,
        32
      ),

      edgeMaterial

    );


  lockCore.rotation.x =
    Math.PI/2;


  lockCore.position.z =
    .13;


  lock.add(
    lockCore
  );



  /* ==============================================================
     LOCK SPOKES
  ============================================================== */

  for(
    let i=0;
    i<8;
    i++
  ){

    const spoke =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .045,
          .62,
          .035
        ),

        edgeMaterial

      );


    spoke.rotation.z =
      i*Math.PI/4;


    spoke.position.z =
      .13;


    lock.add(
      spoke
    );

  }



  /* ==============================================================
     MERCEDES-INSPIRED PERFORMANCE CAR
     
     IMPORTANT:
     Car front faces the camera.
  ============================================================== */

  const car =
    new THREE.Group();


  car.visible =
    false;


  car.position.set(
    0,
    -.48,
    -.05
  );


  /*
     Rotate the car so its front
     points toward +Z / camera.
  */

  car.rotation.y =
    Math.PI/2;


  car.scale.setScalar(
    .78
  );


  vault.add(
    car
  );



  /* ==============================================================
     CAR MATERIALS
  ============================================================== */

  const carPaint =
    new THREE.MeshStandardMaterial({

      color:0x080b0e,

      metalness:.98,

      roughness:.13

    });


  const carBlack =
    new THREE.MeshStandardMaterial({

      color:0x020304,

      metalness:.88,

      roughness:.22

    });


  const chrome =
    new THREE.MeshStandardMaterial({

      color:0xb7c4c8,

      metalness:1,

      roughness:.15

    });


  const glass =
    new THREE.MeshPhysicalMaterial({

      color:0x071518,

      metalness:.25,

      roughness:.05,

      transparent:true,

      opacity:.82,

      transmission:.2

    });



  /* ==============================================================
     CAR BODY
  ============================================================== */

  const body =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2.55,
        .42,
        1.15
      ),

      carPaint

    );


  body.position.y =
    0;


  car.add(
    body
  );



  /* ==============================================================
     LOWER BODY
  ============================================================== */

  const lowerBody =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2.7,
        .18,
        1.2
      ),

      carBlack

    );


  lowerBody.position.y =
    -.22;


  car.add(
    lowerBody
  );



  /* ==============================================================
     HOOD
  ============================================================== */

  const hood =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        .95,
        .12,
        1.05
      ),

      carPaint

    );


  hood.position.set(
    .78,
    .25,
    0
  );


  car.add(
    hood
  );



  /* ==============================================================
     CABIN
  ============================================================== */

  const cabin =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        1.15,
        .45,
        .92
      ),

      glass

    );


  cabin.position.set(
    -.25,
    .42,
    0
  );


  cabin.rotation.z =
    -.08;


  car.add(
    cabin
  );



  /* ==============================================================
     ROOF
  ============================================================== */

  const roof =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        .72,
        .075,
        .88
      ),

      carBlack

    );


  roof.position.set(
    -.27,
    .69,
    0
  );


  car.add(
    roof
  );



  /* ==============================================================
     SIDE SKIRTS
  ============================================================== */

  const sideSkirt =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2.25,
        .12,
        1.23
      ),

      carBlack

    );


  sideSkirt.position.y =
    -.17;


  car.add(
    sideSkirt
  );



  /* ==============================================================
     WHEELS
  ============================================================== */

  function createWheel(
    x,
    z
  ){

    const wheel =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .31,
          .31,
          .16,
          32
        ),

        carBlack

      );


    wheel.rotation.x =
      Math.PI/2;


    wheel.position.set(
      x,
      -.29,
      z
    );


    car.add(
      wheel
    );


    const rim =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .15,
          .15,
          .17,
          24
        ),

        chrome

      );


    rim.rotation.x =
      Math.PI/2;


    rim.position.copy(
      wheel.position
    );


    car.add(
      rim
    );


    const hub =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .06,
          .06,
          .18,
          16
        ),

        edgeMaterial

      );


    hub.rotation.x =
      Math.PI/2;


    hub.position.copy(
      wheel.position
    );


    car.add(
      hub
    );

  }


  createWheel(
    .78,
    .55
  );


  createWheel(
    .78,
    -.55
  );


  createWheel(
    -.78,
    .55
  );


  createWheel(
    -.78,
    -.55
  );



  /* ==============================================================
     HEADLIGHTS
  ============================================================== */

  const headlights = [];


  function createHeadlight(
    z
  ){

    const housing =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .32,
          .07,
          .25
        ),

        carBlack

      );


    housing.position.set(
      1.13,
      .14,
      z
    );


    car.add(
      housing
    );


    const light =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .28,
          .045,
          .15
        ),

        new THREE.MeshStandardMaterial({

          color:0xffffff,

          emissive:0xcfffff,

          emissiveIntensity:0

        })

      );


    light.position.set(
      1.145,
      .145,
      z
    );


    car.add(
      light
    );


    headlights.push(
      light.material
    );


  }


  createHeadlight(
    .38
  );


  createHeadlight(
    -.38
  );



  /* ==============================================================
     HEADLIGHT LIGHT SOURCES
  ============================================================== */

  const headLightLeft =
    new THREE.SpotLight(
      0xcfffff,
      0,
      8,
      Math.PI/7,
      .5,
      1
    );


  headLightLeft.position.set(
    1.25,
    .12,
    .38
  );


  headLightLeft.target.position.set(
    3,
    -.05,
    .38
  );


  car.add(
    headLightLeft
  );


  car.add(
    headLightLeft.target
  );


  const headLightRight =
    new THREE.SpotLight(
      0xcfffff,
      0,
      8,
      Math.PI/7,
      .5,
      1
    );


  headLightRight.position.set(
    1.25,
    .12,
    -.38
  );


  headLightRight.target.position.set(
    3,
    -.05,
    -.38
  );


  car.add(
    headLightRight
  );


  car.add(
    headLightRight.target
  );



  /* ==============================================================
     FRONT GRILLE
  ============================================================== */

  const grille =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        .06,
        .27,
        .66
      ),

      chrome

    );


  grille.position.set(
    1.17,
    -.02,
    0
  );


  car.add(
    grille
  );



  /* ==============================================================
     CENTER EMBLEM
  ============================================================== */

  const emblem =
    new THREE.Mesh(

      new THREE.TorusGeometry(
        .13,
        .025,
        10,
        32
      ),

      chrome

    );


  emblem.position.set(
    1.205,
    .15,
    0
  );


  emblem.rotation.y =
    Math.PI/2;


  car.add(
    emblem
  );


  for(
    let i=0;
    i<3;
    i++
  ){

    const spoke =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .025,
          .23,
          .025
        ),

        chrome

      );


    spoke.rotation.z =
      i*Math.PI/3;


    spoke.position.set(
      1.21,
      .15,
      0
    );


    car.add(
      spoke
    );

  }



  /* ==============================================================
     UNDERGLOW
  ============================================================== */

  const underGlow =
    new THREE.PointLight(
      0x33f0e0,
      0,
      4
    );


  underGlow.position.set(
    0,
    -.45,
    0
  );


  car.add(
    underGlow
  );



  /* ==============================================================
     PARTICLES
  ============================================================== */

  const particleGeometry =
    new THREE.BufferGeometry();


  const particleCount =
    180;


  const particlePositions =
    new Float32Array(
      particleCount*3
    );


  for(
    let i=0;
    i<particleCount;
    i++
  ){

    particlePositions[i*3] =
      (Math.random()-.5)*8;


    particlePositions[i*3+1] =
      (Math.random()-.5)*7;


    particlePositions[i*3+2] =
      (Math.random()-.5)*5;

  }


  particleGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(
      particlePositions,
      3
    )

  );


  const particles =
    new THREE.Points(

      particleGeometry,

      new THREE.PointsMaterial({

        color:0x33f0e0,

        size:.025,

        transparent:true,

        opacity:.45

      })

    );


  scene.add(
    particles
  );



  /* ==============================================================
     MOUSE INTERACTION
  ============================================================== */

  let mouseX = 0;
  let mouseY = 0;

  let targetX = 0;
  let targetY = 0;


  stage.addEventListener(
    "mousemove",
    e=>{

      const rect =
        stage.getBoundingClientRect();


      mouseX =
        ((e.clientX-rect.left) /
        rect.width)*2-1;


      mouseY =
        ((e.clientY-rect.top) /
        rect.height)*2-1;

    }
  );


  stage.addEventListener(
    "mouseleave",
    ()=>{

      mouseX = 0;
      mouseY = 0;

    }
  );



  /* ==============================================================
     TERMINAL
  ============================================================== */

  const terminal =
    document.getElementById(
      "vault-log"
    );


  const access =
    document.getElementById(
      "vault-access"
    );


  const achievement =
    document.getElementById(
      "vault-achievement"
    );


  const terminalLines = [

    "initializing secure session...",
    "loading encryption layer...",
    "scanning perimeter...",
    "firewall detected :: analyzing",
    "packet tunnel established",
    "authentication node online",
    "decrypting vault protocol...",
    "security layer :: 07",
    "identity verification :: VIGHNESH",
    "biometric hash :: MATCH",
    "root privileges :: GRANTED"

  ];


  let terminalIndex = 0;


  function addTerminalLine(){

    if(!terminal)
      return;


    const line =
      document.createElement(
        "div"
      );


    line.className =
      "vault-log-line";


    const text =
      terminalLines[
        terminalIndex %
        terminalLines.length
      ];


    line.textContent =
      "> "+text;


    if(
      text.includes("GRANTED") ||
      text.includes("MATCH")
    ){

      line.classList.add(
        "success"
      );

    }


    if(
      text.includes("analyzing")
    ){

      line.classList.add(
        "warning"
      );

    }


    terminal.appendChild(
      line
    );


    while(
      terminal.children.length > 6
    ){

      terminal.removeChild(
        terminal.firstChild
      );

    }


    terminalIndex++;

  }



  /* ==============================================================
     TERMINAL START
  ============================================================== */

  for(
    let i=0;
    i<4;
    i++
  ){

    setTimeout(
      addTerminalLine,
      i*550
    );

  }


  const terminalTimer =
    setInterval(
      addTerminalLine,
      1100
    );



  /* ==============================================================
     ANIMATION STATE
  ============================================================== */

  let vaultOpened =
    false;


  let doorsProgress =
    0;


  let carProgress =
    0;


  let carRevealed =
    false;


  let carRotating =
    false;


  let headlightsOn =
    false;



  /* ==============================================================
     HEADLIGHT ACTIVATION
  ============================================================== */

  function activateHeadlights(){

    if(headlightsOn)
      return;


    headlightsOn =
      true;


    headlights.forEach(
      material=>{

        material.emissiveIntensity =
          5;

      }
    );


    headLightLeft.intensity =
      5;


    headLightRight.intensity =
      5;


    underGlow.intensity =
      1.5;

  }



  /* ==============================================================
     OPEN VAULT
  ============================================================== */

  function openVault(){

    if(vaultOpened)
      return;


    vaultOpened =
      true;


    /* ACCESS GRANTED */

    if(access){

      access.classList.add(
        "show"
      );


      setTimeout(()=>{

        access.classList.remove(
          "show"
        );

      },2200);

    }


    /* Stop lock rotation */

    lock.rotation.z =
      0;


    /* Vault interior light */

    setTimeout(()=>{

      vaultLight.intensity =
        8;

    },650);


    /* Start opening doors */

    setTimeout(()=>{

      doors.forEach(
        d=>{
          d.opened = true;
        }
      );

    },750);


    /* Headlights BEFORE car moves */

    setTimeout(()=>{

      activateHeadlights();

    },1900);


    /* Car enters animation */

    setTimeout(()=>{

      car.visible =
        true;

      carRevealed =
        true;

    },2300);


    /* Achievement message */

    setTimeout(()=>{

      achievement?.classList.add(
        "show"
      );

    },3200);


    setTimeout(()=>{

      achievement?.classList.remove(
        "show"
      );

    },6000);

  }



  /* ==============================================================
     AUTOMATIC UNLOCK
  ============================================================== */

  setTimeout(
    openVault,
    8500
  );



  /* ==============================================================
     CLOCK
  ============================================================== */

  const clock =
    new THREE.Clock();



  /* ==============================================================
     ANIMATION LOOP
  ============================================================== */

  function animate(){

    requestAnimationFrame(
      animate
    );


    const t =
      clock.getElapsedTime();



    /* --------------------------------------------------------------
       MOUSE SMOOTHING
    -------------------------------------------------------------- */

    targetX +=
      (mouseX*.20-targetX)
      *.035;


    targetY +=
      (mouseY*.12-targetY)
      *.035;



    /* --------------------------------------------------------------
       VAULT IDLE MOVEMENT
    -------------------------------------------------------------- */

    if(!vaultOpened){

      vault.rotation.y =
        -.16 +
        Math.sin(t*.35)*.035 +
        targetX;


      vault.rotation.x =
        targetY;

    }
    else{

      /*
         After opening the vault stays
         mostly stable so the car becomes
         the main attraction.
      */

      vault.rotation.y +=
        (-.16-targetX-vault.rotation.y)
        *.015;


      vault.rotation.x +=
        (targetY-vault.rotation.x)
        *.015;

    }



    /* --------------------------------------------------------------
       LOCK ROTATION
    -------------------------------------------------------------- */

    if(!vaultOpened){

      lock.rotation.z =
        t*.65;

    }



    /* --------------------------------------------------------------
       PARTICLES
    -------------------------------------------------------------- */

    particles.rotation.y =
      t*.015;


    particles.rotation.x =
      Math.sin(t*.1)*.04;



    /* --------------------------------------------------------------
       VAULT DOOR ANIMATION
    -------------------------------------------------------------- */

    if(vaultOpened){

      doorsProgress +=
        (1-doorsProgress)
        *.035;


      const eased =
        1-Math.pow(
          1-doorsProgress,
          3
        );


      doors.forEach(
        d=>{

          if(!d.opened)
            return;


          switch(
            d.type
          ){

            /* TOP LEFT */

            case "top-left":

              d.pivot.position.x =
                d.x-eased*.65;


              d.pivot.position.y =
                d.y+eased*1.55;


              d.pivot.rotation.z =
                -eased*.42;

              break;



            /* TOP RIGHT */

            case "top-right":

              d.pivot.position.x =
                d.x+eased*.65;


              d.pivot.position.y =
                d.y+eased*1.55;


              d.pivot.rotation.z =
                eased*.42;

              break;



            /* BOTTOM LEFT */

            case "bottom-left":

              d.pivot.position.x =
                d.x-eased*.65;


              d.pivot.position.y =
                d.y-eased*1.55;


              d.pivot.rotation.z =
                eased*.42;

              break;



            /* BOTTOM RIGHT */

            case "bottom-right":

              d.pivot.position.x =
                d.x+eased*.65;


              d.pivot.position.y =
                d.y-eased*1.55;


              d.pivot.rotation.z =
                -eased*.42;

              break;

          }

        }
      );



      /* ------------------------------------------------------------
         CAR REVEAL
      ------------------------------------------------------------ */

      if(carRevealed){

        carProgress +=
          (.98-carProgress)
          *.018;


        const carEase =
          1-Math.pow(
            1-carProgress,
            3
          );


        /*
           Car starts deep inside
           and moves toward camera.
        */

        car.position.z =
          -.05 +
          carEase*2.25;


        /*
           Slight vertical suspension.
        */

        car.position.y =
          -.48 +
          Math.sin(t*2.1)
          *.018;


        /*
           Small forward roll.
        */

        if(
          carProgress < .92
        ){

          car.rotation.x =
            Math.sin(t*2)
            *.008;

        }
        else{

          car.rotation.x =
            0;

        }


        /*
           Once the car has fully emerged,
           begin permanent showcase rotation.
        */

        if(
          carProgress > .94
        ){

          carRotating =
            true;

        }

      }



      /* ------------------------------------------------------------
         PERMANENT CAR ROTATION
      ------------------------------------------------------------ */

      if(carRotating){

        /*
           Slow premium showroom rotation.
           This continues indefinitely.
        */

        car.rotation.y =
          Math.PI/2 +
          (t-9)*.28;

      }

    }



    /* --------------------------------------------------------------
       CAMERA PARALLAX
    -------------------------------------------------------------- */

    camera.position.x +=
      (
        mouseX*.22 -
        camera.position.x
      )*.025;


    camera.position.y +=
      (
        .25 -
        mouseY*.08 -
        camera.position.y
      )*.025;


    camera.lookAt(
      .15,
      0,
      .35
    );


    renderer.render(
      scene,
      camera
    );

  }


  animate();



  /* ==============================================================
     RESIZE
  ============================================================== */

  function resizeVault(){

    const w =
      stage.clientWidth;


    const h =
      stage.clientHeight;


    if(!w || !h)
      return;


    camera.aspect =
      w/h;


    camera.updateProjectionMatrix();


    renderer.setSize(
      w,
      h
    );

  }


  window.addEventListener(
    "resize",
    resizeVault
  );


  resizeVault();



  /* ==============================================================
     SCROLL VISIBILITY
  ============================================================== */

  function updateVaultVisibility(){

    const hero =
      document.getElementById(
        "hero"
      );


    if(!hero)
      return;


    const rect =
      hero.getBoundingClientRect();


    const heroHeight =
      hero.offsetHeight;


    const progress =
      Math.min(
        1,
        Math.max(
          0,
          -rect.top /
          (heroHeight*.75)
        )
      );


    /*
       HOME
       Fully visible
    */

    if(progress < .15){

      stage.classList.remove(
        "vault-faded",
        "vault-hidden"
      );

    }


    /*
       ACADEMICS TRANSITION
       Slight fade
    */

    else if(progress < .5){

      stage.classList.add(
        "vault-faded"
      );


      stage.classList.remove(
        "vault-hidden"
      );

    }


    /*
       OTHER SECTIONS
       Hide
    */

    else{

      stage.classList.add(
        "vault-hidden"
      );


      stage.classList.remove(
        "vault-faded"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateVaultVisibility,
    {
      passive:true
    }
  );


  updateVaultVisibility();



  /* ==============================================================
     CLEANUP
  ============================================================== */

  window.addEventListener(
    "beforeunload",
    ()=>{

      clearInterval(
        terminalTimer
      );

      renderer.dispose();

    }
  );


})();



/* ==========================================================================
   7. HACKER SCROLL FADE
========================================================================== */

(function hackerScroll(){

  const rig =
    document.getElementById(
      "hacker-rig"
    );


  const hero =
    document.getElementById(
      "hero"
    );


  if(!rig || !hero)
    return;


  function update(){

    const scrollY =
      window.scrollY;


    const heroHeight =
      hero.offsetHeight;


    let progress =
      scrollY /
      (heroHeight*.75);


    progress =
      Math.max(
        0,
        Math.min(
          1,
          progress
        )
      );


    rig.style.setProperty(
      "--scroll-progress",
      progress
    );


    if(progress > .22){

      rig.classList.add(
        "scrolled-away"
      );

    }
    else{

      rig.classList.remove(
        "scrolled-away"
      );

    }


    let opacity =
      1-progress*.80;


    opacity =
      Math.max(
        .20,
        opacity
      );


    if(
      window.innerWidth <= 700
    ){

      opacity *= .65;

    }


    if(
      window.innerWidth <= 430
    ){

      opacity *= .65;

    }


    rig.style.opacity =
      opacity.toFixed(3);

  }


  window.addEventListener(
    "scroll",
    update,
    {
      passive:true
    }
  );


  window.addEventListener(
    "resize",
    update
  );


  update();

})();



/* ==========================================================================
   8. SCROLL REVEAL
========================================================================== */

function setupReveal(
  root=document
){

  const io =
    new IntersectionObserver(

      entries=>{

        entries.forEach(
          entry=>{

            if(
              entry.isIntersecting
            ){

              entry.target
                .classList
                .add(
                  "in-view"
                );


              io.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold:.15
      }

    );


  root
    .querySelectorAll(
      ".reveal"
    )
    .forEach(
      el=>io.observe(el)
    );

}



/* ==========================================================================
   9. ACADEMICS
========================================================================== */

(function academics(){

  const DATA = [

    {
      period:"2023 — 2025",

      title:
        "BCA (Bachelor's in Computer Applications)",

      org:
        "Somaiya Vidhyavihar University",

      desc:
        "Coursework in technology, programming, networking, databases, web development and computer systems.",

      tags:[
        "Networks",
        "Web Development",
        "OS Security"
      ]

    },


    {
      period:"2022",

      title:
        "Commerce",

      org:
        "SYDENHAM COLLEGE OF COMMERCE AND ECONOMICS",

      desc:
        "Studied commerce fundamentals before moving towards the IT and cybersecurity domain.",

      tags:[
        "Economics",
        "Mathematics"
      ]

    },


    {
      period:"2020",

      title:
        "Secondary",

      org:
        "DR. ANTONIO DA SILVA HIGH SCHOOL",

      desc:
        "Built the foundational academic knowledge that later developed into an interest in technology.",

      tags:[
        "Mathematics",
        "Science"
      ]

    }

  ];


  const wrap =
    document.getElementById(
      "timeline"
    );


  if(!wrap)
    return;


  wrap.innerHTML =
    DATA.map(
      d=>`

        <div class="timeline-item reveal">

          <span class="timeline-node"></span>

          <span class="t-period">
            ${d.period}
          </span>

          <h3>
            ${d.title}
          </h3>

          <p class="t-org">
            ${d.org}
          </p>

          <p class="t-desc">
            ${d.desc}
          </p>

          <div class="tag-row">

            ${d.tags.map(
              tag=>`
                <span class="tag-chip">
                  ${tag}
                </span>
              `
            ).join("")}

          </div>

        </div>

      `
    ).join("");


  setupReveal(
    wrap
  );

})();



/* ==========================================================================
   10. CERTIFICATIONS
========================================================================== */

(function certifications(){

  const DATA = [

    {
      icon:"⚔",

      title:
        "Certified Ethical Hacker",

      issuer:
        "Hacker School",

      desc:
        "Gained knowledge of ethical hacking, vulnerability assessment, network security, penetration testing, and cybersecurity best practices.",

      id:"CEH-001"
    },


    {
      icon:"🐍",

      title:
        "Python Programming: A Step-by-Step Programming Course",

      issuer:
        "Knowledge Nest — Udemy",

      desc:
        "Acquired practical, hands-on skills in Python programming through a structured, project-driven course.",

      id:"PY-002"
    },


    {
      icon:"◧",

      title:
        "Meta Frontend Developer",

      issuer:
        "Meta",

      desc:
        "Completed a foundational front-end development course covering HTML, CSS, JavaScript, and UI principles.",

      id:"FE-003"
    },


    {
      icon:"🛰",

      title:
        "Agnirva Space Internship Program",

      issuer:
        "Recognized by AICTE",

      desc:
        "Completed a certified space technology internship program, gaining exposure to satellite systems, aerospace principles, and real-world applications.",

      id:"SPC-004"
    },


    {
      icon:"🛡",

      title:
        "ISRO Outreach Program — IIRS",

      issuer:
        "Indian Institute of Remote Sensing",

      desc:
        "Participated in ISRO's certified online learning program focused on space research, geospatial technologies, and remote sensing applications.",

      id:"ISRO-005"
    }

  ];


  const grid =
    document.getElementById(
      "cert-grid"
    );


  if(!grid)
    return;


  grid.innerHTML =
    DATA.map(
      (c,i)=>`

        <article
          class="cert-card reveal"
          style="transition-delay:${i*70}ms"
        >

          <div class="cert-card-top">

            <span class="cert-badge">
              ${c.icon}
            </span>

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
              #${String(i+1).padStart(2,"0")}
            </span>

          </div>

        </article>

      `
    ).join("");


  setupReveal(
    grid
  );


  initTiltFor(
    ".cert-card",
    {
      max:8,
      scale:1.015
    }
  );


  window.__rebindCursor?.();

})();



/* ==========================================================================
   11. PROJECTS
========================================================================== */

(function projects(){

  const DATA = [

    {
      name:
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

      img:
        "images/vulnerability-scanner.jpg"
    },


    {
      name:
        "Food Hunter",

      tagline:
        "Real-time Food Delivery Website",

      desc:
        "A fully functional food delivery website developed using ASP.NET for the backend and MS SQL for the database. The platform supports user authentication, restaurant listings, order management, and real-time delivery status tracking.",

      tags:[
        "ASP.NET",
        "MS SQL"
      ],

      img:
        "images/food-hunter.jpg"
    },


    {
      name:
        "VS SPORTS BLOG",

      tagline:
        "Sports Blog Website",

      desc:
        "A dynamic blog platform centered around sports content, built using ASP.NET. It features a responsive layout, comment system, admin dashboard for post management, and SQL database integration.",

      tags:[
        "ASP.NET",
        "SQL"
      ],

      img:
        "images/vs-sports-blog.jpg"
    }

  ];


  const grid =
    document.getElementById(
      "project-grid"
    );


  if(!grid)
    return;


  grid.innerHTML =
    DATA.map(
      (p,i)=>`

        <article
          class="project-card reveal"
          tabindex="0"
          style="transition-delay:${i*60}ms"
        >

          <div
            class="project-card-media"
            style="background-image:url('${p.img}')"
          ></div>


          <div class="project-card-body">

            <div class="project-card-top">

              <span class="project-idx">
                PROJECT/0${i+1}
              </span>

            </div>


            <h3>
              ${p.name}
            </h3>


            <p class="p-tagline">
              ${p.tagline}
            </p>


            <div class="project-card-more">

              <p>
                ${p.desc}
              </p>


              <div class="project-tags">

                ${p.tags.map(
                  tag=>`
                    <span>
                      ${tag}
                    </span>
                  `
                ).join("")}

              </div>

            </div>

          </div>

        </article>

      `
    ).join("");


  grid
    .querySelectorAll(
      ".project-card"
    )
    .forEach(card=>{

      card.addEventListener(
        "click",
        ()=>{

          if(
            matchMedia(
              "(hover:none)"
            ).matches
          ){

            card.classList.toggle(
              "expanded"
            );

          }

        }
      );

    });


  setupReveal(
    grid
  );


  initTiltFor(
    ".project-card",
    {
      max:7,
      scale:1.02
    }
  );


  window.__rebindCursor?.();

})();



/* ==========================================================================
   12. CONTACT FORM
========================================================================== */

(function contactForm(){

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


  if(!form)
    return;


  form.addEventListener(
    "submit",
    async e=>{

      e.preventDefault();


      label.textContent =
        "sending...";


      status.textContent =
        "";


      status.className =
        "form-status";


      try{

        const response =
          await fetch(
            form.action,
            {

              method:"POST",

              body:
                new FormData(form),

              headers:{
                Accept:
                  "application/json"
              }

            }
          );


        if(response.ok){

          status.textContent =
            "✔ message sent successfully.";

          status.classList.add(
            "ok"
          );

          label.textContent =
            "execute ./send";

          form.reset();

        }
        else{

          throw new Error(
            "Transmission failed"
          );

        }

      }
      catch(error){

        status.textContent =
          "✖ transmission failed — try again.";

        status.classList.add(
          "err"
        );

        label.textContent =
          "execute ./send";

      }

    }
  );

})();



/* ==========================================================================
   13. MOUSE GLOW
========================================================================== */

(function mouseGlow(){

  const root =
    document.documentElement;


  window.addEventListener(
    "mousemove",
    e=>{

      root.style.setProperty(
        "--mouse-x",
        e.clientX+"px"
      );


      root.style.setProperty(
        "--mouse-y",
        e.clientY+"px"
      );

    },
    {
      passive:true
    }
  );

})();



/* ==========================================================================
   14. CARD PULSE
========================================================================== */

(function cardPulse(){

  const cards =
    document.querySelectorAll(
      ".cert-card,.project-card,.contact-card"
    );


  cards.forEach(
    card=>{

      card.addEventListener(
        "mouseenter",
        ()=>{

          card.style.setProperty(
            "--card-active",
            "1"
          );

        }
      );


      card.addEventListener(
        "mouseleave",
        ()=>{

          card.style.setProperty(
            "--card-active",
            "0"
          );

        }
      );

    }
  );

})();



/* ==========================================================================
   15. NAVBAR HIDE / SHOW
========================================================================== */

(function navMotion(){

  const navbar =
    document.getElementById(
      "navbar"
    );


  if(!navbar)
    return;


  let lastScroll =
    window.scrollY;


  window.addEventListener(
    "scroll",
    ()=>{

      const current =
        window.scrollY;


      if(
        current > 120 &&
        current > lastScroll
      ){

        navbar.style.transform =
          "translateY(-100%)";

      }
      else{

        navbar.style.transform =
          "translateY(0)";

      }


      lastScroll =
        current;

    },
    {
      passive:true
    }
  );

})();



/* ==========================================================================
   16. YEAR
========================================================================== */

const year =
  document.getElementById(
    "year"
  );


if(year){

  year.textContent =
    new Date().getFullYear();

}


setupReveal();



/* ==========================================================================
   17. FINAL LAYOUT REFRESH
========================================================================== */

window.addEventListener(
  "load",
  ()=>{

    setTimeout(
      ()=>{

        window.dispatchEvent(
          new Event("resize")
        );

      },
      800
    );

  }
);