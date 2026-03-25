// ============================================================
// CONFIG
// ============================================================
const STAR_COUNT = 800;
const WARP_STAR_COUNT = 300;

// Each planet has a 3D position in space (x, y offsets from center, z = depth)
// As we "fly forward" (scroll), z decreases → planet appears to come closer
// z: 1.0 = far away (tiny dot), 0.0 = right at camera (fills screen)
const PLANETS = [
  {
    name: "CAREER",
    // 3D position: slightly left and below center
    offX: -0.08,
    offY: 0.05,
    // scroll range where this planet is in view
    startProgress: 0.08,
    endProgress: 0.35,
    isLast: false,
    content: `
      <h3>EXPERIENCE</h3>
      <ul>
        <li>Frontend Developer @ Company A (2023~)</li>
        <li>Web Developer @ Company B (2021~2023)</li>
      </ul>
      <h3>SKILLS</h3>
      <ul>
        <li>React / Next.js / TypeScript</li>
        <li>Canvas API / WebGL</li>
        <li>Node.js / Express</li>
      </ul>
    `,
  },
  {
    name: "SIDE PROJECTS",
    offX: 0.1,
    offY: -0.04,
    startProgress: 0.25,
    endProgress: 0.52,
    isLast: false,
    content: `
      <h3>PROJECT 1</h3>
      <p>A cool side project description goes here.</p>
      <h3>PROJECT 2</h3>
      <p>Another side project description goes here.</p>
    `,
  },
  {
    name: "GITHUB",
    offX: -0.06,
    offY: -0.07,
    startProgress: 0.42,
    endProgress: 0.70,
    isLast: false,
    content: `
      <h3>GITHUB</h3>
      <p>Check out my repositories and contributions.</p>
      <ul>
        <li><a href="#" target="_blank">github.com/yourusername</a></li>
      </ul>
    `,
  },
  {
    name: "CONTACT",
    offX: 0,
    offY: 0,
    startProgress: 0.70,
    endProgress: 0.95,
    isLast: true,
    isTextOnly: true,
    content: `
      <h3>CONTACT</h3>
      <ul>
        <li>Email: hello@example.com</li>
        <li>LinkedIn: /in/yourname</li>
      </ul>
      <p>Feel free to reach out!</p>
    `,
  },
];

// ============================================================
// PIXEL ART ICONS (1 = white pixel, 0 = transparent)
// ============================================================
const PIXEL_ICONS = {
  // Spaceship — career/experience
  "CAREER": [
    [0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0],
    [0,0,1,1,0,1,0,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [1,1,0,1,1,1,1,1,0,1,1],
    [1,0,0,1,1,1,1,1,0,0,1],
    [1,0,0,0,1,1,1,0,0,0,1],
    [0,0,0,0,1,0,1,0,0,0,0],
    [0,0,0,1,0,0,0,1,0,0,0],
  ],
  // Rocket — side projects
  "SIDE PROJECTS": [
    [0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,0,1,1,0,0,0],
    [0,0,0,1,0,1,0,1,0,0,0],
    [0,0,0,1,1,0,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,1,1,1,0,0,1,0],
    [1,1,0,0,0,1,0,0,0,1,1],
    [1,0,0,0,1,1,1,0,0,0,1],
    [0,0,0,0,1,0,1,0,0,0,0],
    [0,0,0,1,1,0,1,1,0,0,0],
    [0,0,0,1,0,0,0,1,0,0,0],
  ],
  // Satellite — github
  "GITHUB": [
    [0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0],
    [1,1,0,0,0,1,0,0,0,1,1,0,0],
    [1,1,1,0,1,1,1,0,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,0,0,0],
    [1,1,1,0,1,1,1,0,1,1,1,0,0],
    [1,1,0,0,0,1,0,0,0,1,1,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1],
  ],
};

// ============================================================
// CANVAS SETUP
// ============================================================
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let W, H, cx, cy;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  cx = W / 2;
  cy = H / 2;
}
resize();
window.addEventListener("resize", resize);

// ============================================================
// BACKGROUND STARS
// ============================================================
class BgStar {
  constructor() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() < 0.5 ? 1 : 2;
    this.baseOpacity = 0.3 + Math.random() * 0.7;
    this.twinkleSpeed = 0.5 + Math.random() * 2;
    this.phase = Math.random() * Math.PI * 2;
  }
}

let bgStars = Array.from({ length: STAR_COUNT }, () => new BgStar());

// ============================================================
// WARP STARS
// ============================================================
class WarpStar {
  constructor() {
    this.respawn();
  }

  respawn() {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.max(W, H) * 0.7 + Math.random() * 200;
    this.x = cx + Math.cos(angle) * dist;
    this.y = cy + Math.sin(angle) * dist;
    this.size = Math.random() < 0.5 ? 1 : 2;
    this.speed = 0.3 + Math.random() * 0.7;
    this.opacity = 0.4 + Math.random() * 0.6;
  }
}

const warpStars = Array.from({ length: WARP_STAR_COUNT }, () => new WarpStar());

// ============================================================
// SCROLL STATE
// ============================================================
let scrollProgress = 0;
let isScrolling = false;
let scrollTimeout = null;
let warpAmount = 0;

function updateScroll() {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  scrollProgress = Math.min(window.scrollY / maxScroll, 1);

  isScrolling = true;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 150);
}
window.addEventListener("scroll", updateScroll, { passive: true });

// ============================================================
// DOM REFS & MODAL
// ============================================================
const hero = document.getElementById("hero");
const planetLabel = document.getElementById("planet-label");
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const contactOverlay = document.getElementById("contact-overlay");
let modalOpen = false;

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

function openModal(planet) {
  modalTitle.textContent = planet.name;
  modalBody.innerHTML = planet.content;
  modalOverlay.classList.remove("hidden");
  modalOpen = true;
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  modalOpen = false;
}

// ============================================================
// 3D PERSPECTIVE PLANET HELPERS
// ============================================================
// Focal length for perspective projection
const FOCAL = 600;
// Planet's real-world radius (arbitrary unit)
const PLANET_WORLD_RADIUS = 80;

function getPlanetZ(planet, globalProgress) {
  // Map scroll progress to z-depth
  // At startProgress: z = far (1000)
  // At endProgress: z depends on isLast
  const range = planet.endProgress - planet.startProgress;
  const t = (globalProgress - planet.startProgress) / range;

  if (t < 0) return 2000; // not yet visible
  if (t > 1 && !planet.isLast) return -500; // passed by

  const clamped = Math.max(0, Math.min(t, 1));

  if (planet.isLast) {
    // Last planet: approach to a comfortable viewing distance, then stop
    const zFar = 1200;
    const zNear = 250; // stops here — nice readable size
    return zFar - clamped * (zFar - zNear);
  }

  // Normal planets: fly from far to behind camera
  const zFar = 1200;
  const zBehind = -300; // goes behind us
  return zFar - clamped * (zFar - zBehind);
}

function projectPlanet(planet, z) {
  // 3D → 2D perspective projection
  if (z <= 1) z = 1; // prevent division by zero

  const scale = FOCAL / z;
  const screenX = cx + planet.offX * W * scale;
  const screenY = cy + planet.offY * H * scale;
  const screenRadius = PLANET_WORLD_RADIUS * scale;

  return { x: screenX, y: screenY, radius: screenRadius, scale };
}

// ============================================================
// PLANET CLICK / HOVER
// ============================================================
function hitTestPlanet(mx, my) {
  for (const planet of PLANETS) {
    if (planet.isTextOnly) continue;

    const z = getPlanetZ(planet, scrollProgress);
    if (z < 1 || z > 1500) continue;

    const proj = projectPlanet(planet, z);
    if (proj.radius < 15 || proj.radius > 2000) continue;

    // Use bounding box of the icon area
    const hitR = proj.radius * 1.2;
    const dx = mx - proj.x;
    const dy = my - proj.y;
    if (Math.abs(dx) < hitR && Math.abs(dy) < hitR) {
      return planet;
    }
  }
  return null;
}

canvas.addEventListener("click", (e) => {
  if (modalOpen) return;
  const rect = canvas.getBoundingClientRect();
  const hit = hitTestPlanet(e.clientX - rect.left, e.clientY - rect.top);
  if (hit) openModal(hit);
});

canvas.addEventListener("mousemove", (e) => {
  if (modalOpen) return;
  const rect = canvas.getBoundingClientRect();
  const hit = hitTestPlanet(e.clientX - rect.left, e.clientY - rect.top);
  canvas.style.cursor = hit ? "pointer" : "default";
});

// ============================================================
// RENDER
// ============================================================
let time = 0;
let prevTime = performance.now();

function render(now) {
  const dt = (now - prevTime) / 1000;
  prevTime = now;
  time += dt;

  // -- Warp
  const warpTarget = isScrolling ? Math.min(scrollProgress / 0.1, 1) : 0;
  const warpSpeed = isScrolling ? 4 : 2;
  warpAmount += (warpTarget - warpAmount) * Math.min(dt * warpSpeed, 1);

  // -- Clear
  if (warpAmount > 0.05) {
    const trailAlpha = 0.05 + (1 - warpAmount) * 0.15;
    ctx.fillStyle = `rgba(0, 0, 0, ${trailAlpha})`;
    ctx.fillRect(0, 0, W, H);
  } else {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
  }

  // -- Hero fade
  hero.style.opacity = Math.max(0, 1 - scrollProgress * 12);

  // -- Background stars
  for (const star of bgStars) {
    const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.phase);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.baseOpacity * twinkle})`;
    ctx.fillRect(Math.round(star.x), Math.round(star.y), star.size, star.size);
  }

  // -- Warp stars
  if (warpAmount > 0.02) {
    for (const ws of warpStars) {
      const dx = cx - ws.x;
      const dy = cy - ws.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 5) {
        ws.respawn();
        continue;
      }

      const moveSpeed = warpAmount * ws.speed * 1200 * dt;
      ws.x += (dx / dist) * moveSpeed;
      ws.y += (dy / dist) * moveSpeed;

      const maxDist = Math.sqrt(cx * cx + cy * cy);
      const depthRatio = dist / maxDist;
      const depthAlpha = depthRatio * depthRatio;

      const trailLen = Math.min(warpAmount * ws.speed * 50, dist * 0.6);
      const tx = ws.x - (dx / dist) * trailLen;
      const ty = ws.y - (dy / dist) * trailLen;

      const grad = ctx.createLinearGradient(
        Math.round(tx), Math.round(ty),
        Math.round(ws.x), Math.round(ws.y)
      );
      const baseAlpha = ws.opacity * warpAmount * depthAlpha;
      grad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(baseAlpha * 1.2, 1)})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${baseAlpha * 0.15})`);

      ctx.beginPath();
      ctx.moveTo(Math.round(ws.x), Math.round(ws.y));
      ctx.lineTo(Math.round(tx), Math.round(ty));
      ctx.strokeStyle = grad;
      ctx.lineWidth = ws.size;
      ctx.stroke();

      ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha * 0.3})`;
      ctx.fillRect(Math.round(ws.x), Math.round(ws.y), ws.size, ws.size);
    }
  }

  // -- Reset contact overlay (will be shown by render if in range)
  contactOverlay.style.display = "none";
  contactOverlay.style.opacity = 0;

  // -- Planets (sorted by z, far first so closer ones draw on top)
  const planetRenders = [];
  for (const planet of PLANETS) {
    const z = getPlanetZ(planet, scrollProgress);
    if (z < 1 || z > 1500) continue;
    const proj = projectPlanet(planet, z);
    if (proj.radius < 0.3) continue;
    planetRenders.push({ planet, z, proj });
  }
  planetRenders.sort((a, b) => b.z - a.z); // far first

  let activePlanetName = "";
  for (const { planet, z, proj } of planetRenders) {
    const { x, y, radius } = proj;

    // Opacity: fade in when far, full when close, fade out when passing behind
    let opacity = 1;
    if (z > 1000) opacity = Math.max(0, (1200 - z) / 200);
    else if (z < 20 && !planet.isLast) opacity = Math.max(0, z / 20);

    if (opacity < 0.01) continue;

    // CONTACT: text-only, no icon
    if (planet.isTextOnly) {
      contactOverlay.innerHTML = planet.content;
      contactOverlay.style.opacity = opacity;
      contactOverlay.style.display = "flex";
      continue;
    }

    // Draw pixel art icon
    const icon = PIXEL_ICONS[planet.name];
    if (icon) {
      const gridH = icon.length;
      const gridW = icon[0].length;
      // Scale pixel size based on radius
      const pixelSize = Math.max(1, radius / Math.max(gridW, gridH) * 2);
      const totalW = gridW * pixelSize;
      const totalH = gridH * pixelSize;
      const startX = x - totalW / 2;
      const startY = y - totalH / 2;

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      for (let row = 0; row < gridH; row++) {
        for (let col = 0; col < gridW; col++) {
          if (icon[row][col]) {
            ctx.fillRect(
              Math.round(startX + col * pixelSize),
              Math.round(startY + row * pixelSize),
              Math.ceil(pixelSize),
              Math.ceil(pixelSize)
            );
          }
        }
      }

      // Name label below icon when big enough
      if (radius > 40 && radius < 500) {
        const fontSize = Math.min(Math.max(Math.floor(radius * 0.12), 8), 24);
        ctx.save();
        ctx.font = `${fontSize}px 'Press Start 2P', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
        ctx.fillText(planet.name, x, startY + totalH + pixelSize * 2);
        ctx.restore();
      }
    }

    if (radius >= 15 && radius < 600 && opacity > 0.3) {
      activePlanetName = planet.name;
    }
  }

  // -- Planet label
  if (activePlanetName && !modalOpen) {
    planetLabel.textContent = activePlanetName;
    planetLabel.style.opacity = "1";
  } else {
    planetLabel.style.opacity = "0";
  }

  requestAnimationFrame(render);
}

requestAnimationFrame(render);

// ============================================================
// RESIZE
// ============================================================
window.addEventListener("resize", () => {
  bgStars = Array.from({ length: STAR_COUNT }, () => new BgStar());
  for (const ws of warpStars) ws.respawn();
});
