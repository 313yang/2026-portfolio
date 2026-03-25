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
      <div class="experience-item">
        <h4>코넥시오에이치 | Frontend Developer</h4>
        <span class="period">(2025.04 ~ 현재) — 금융권 대상 사업자 데이터 시각화 B2B 서비스</span>
        <ul class="project-list">
          <li class="project-item" data-project="crepan">🏦 은행 영업원 대상 사업자 매출데이터 시각화 서비스</li>
          <li class="project-item" data-project="ecommerce">📊 이커머스 가격 모니터링·분석 서비스</li>
        </ul>
      </div>

      <div class="experience-item">
        <h4>투네이션 | Frontend Developer</h4>
        <span class="period">(2023.03 ~ 2024.10) — 200만+ 사용자 스트리밍 후원 플랫폼</span>
        <ul class="project-list">
          <li class="project-item" data-project="widget">🏆 신규 벽지위젯 개발</li>
          <li class="project-item" data-project="naver-login">🔐 네이버 로그인 기능 추가</li>
          <li class="project-item" data-project="redesign">🔄 크리에이터 페이지 대규모 개편</li>
        </ul>
      </div>

      <div class="experience-item">
        <h4>샘랩 주식회사 | Frontend Developer</h4>
        <span class="period">(2021.07 ~ 2023.02) — O2O 교육 학습 플랫폼 솔루션 개발 스타트업</span>
        <ul class="project-list">
          <li class="project-item" data-project="kiosk">🖥️ 스터디카페/학원용 키오스크 소프트웨어 개발</li>
        </ul>
      </div>
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
      <div class="experience-item">
        <h4>엔데이 (Enday) - 매일 쓰는 AI 일기</h4>
        <span class="period">(2026.02) — AI 영어 일기 교정 웹앱</span>
        <ul class="project-list">
          <li><a href="https://enday.vercel.app/" target="_blank" class="project-link">🤖 AI 문법 검사 및 토큰 기반 사용량 제한 시스템</a></li>
        </ul>
      </div>

      <div class="experience-item">
        <h4>사과게임 - Apple Crush!</h4>
        <span class="period">(2025.02) — 웹뷰 기반 iOS 퍼즐 게임</span>
        <ul class="project-list">
          <li><a href="https://apps.apple.com/kr/app/%EC%82%AC%EA%B3%BC%EA%B2%8C%EC%9E%84-apple-crush/id6758998502" target="_blank" class="project-link">🎮 Claude AI 활용한 웹뷰 기반 iOS 앱</a></li>
        </ul>
      </div>

      <div class="experience-item">
        <h4>Soundy - 스포티파이 플레이리스트 스트리밍</h4>
        <span class="period">(2023.01~02) — 음원 스트리밍 웹 서비스</span>
        <ul class="project-list">
          <li><a href="https://www.soundy-playlist.link/" target="_blank" class="project-link">🎵 Spotify API + YouTube 연동 음악 플레이어</a></li>
        </ul>
      </div>
    `,
  },
  {
    name: "BLOG",
    offX: -0.06,
    offY: -0.07,
    startProgress: 0.42,
    endProgress: 0.70,
    isLast: false,
    content: `
      <h3>BLOG & ARTICLES</h3>
      <p>Technical blog posts and development insights.</p>
      <ul>
        <li>Frontend Development Tips</li>
        <li>Canvas API & WebGL Tutorials</li>
        <li>JavaScript Deep Dive</li>
      </ul>
    `,
  },
];

const CONTACT_PLANET = {
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
      <li>Email: <a href="mailto:fghsxvef@naver.com">fghsxvef@naver.com</a></li>
      <li>GitHub: <a href="https://github.com/313yang">github.com/313yang</a></li>
      <li>Resume: <a href="https://www.notion.so/Frontend-Developer-30b79093cbf0803088f2d29879d97381">Frontend Developer Portfolio</a></li>
    </ul>
    <p>Feel free to reach out!</p>
  `,
};

PLANETS.push(CONTACT_PLANET);

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
  // Document/Paper — blog
  "BLOG": [
    [1,1,1,1,1,1,1,1,1,1,0],
    [1,0,0,0,0,0,0,0,0,1,1],
    [1,0,1,1,1,1,1,1,0,1,1],
    [1,0,0,0,0,0,0,0,0,1,1],
    [1,0,1,1,1,1,1,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,1,1],
    [1,0,1,1,1,1,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,1,1],
    [1,0,1,1,1,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1],
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

// CONTACT 링크 클릭 핸들러
function handleLinkClick(e) {
  console.log('Link clicked:', e.target.href);
  e.preventDefault();
  e.stopPropagation();
  window.open(e.target.href, '_blank');
}


modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

function openModal(planet) {
  modalTitle.textContent = planet.name;
  modalBody.innerHTML = planet.content;
  modalOverlay.classList.remove("hidden");
  modalOpen = true;

  // 모달 내 링크들에 새창 열기 이벤트 바인딩
  const modalLinks = modalBody.querySelectorAll('a[target="_blank"]');
  console.log('Found modal links:', modalLinks.length);
  modalLinks.forEach(link => {
    console.log('Binding click event to:', link.href);
    link.addEventListener('click', function(e) {
      console.log('Link clicked:', this.href);
      e.stopPropagation();
      e.preventDefault();
      window.open(this.href, '_blank');
    });
  });
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

  // -- Clear (별 잔상은 유지하되, 섹션 스크롤 잔상은 제거)
  const baseTrailAlpha = 0.15; // 별들의 기본 잔상
  const scrollTrailReduction = isScrolling ? 0.1 : 0; // 스크롤 중일 때 잔상 더 제거
  const trailAlpha = Math.max(0.05, baseTrailAlpha + scrollTrailReduction);

  ctx.fillStyle = `rgba(0, 0, 0, ${trailAlpha})`;
  ctx.fillRect(0, 0, W, H);

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

    // CONTACT: text-only with scale/zoom effect
    if (planet.isTextOnly) {
      // innerHTML은 한번만 설정 (내용이 비어있을 때만)
      if (!contactOverlay.innerHTML.trim()) {
        contactOverlay.innerHTML = planet.content;

        // 링크에 이벤트 리스너 바인딩 (한번만)
        const links = contactOverlay.querySelectorAll('a[href^="https://"]');
        links.forEach(link => {
          link.addEventListener('click', handleLinkClick);
        });
      }

      contactOverlay.style.opacity = opacity;
      contactOverlay.style.display = "flex";

      // 멀리서 나타나는 효과: 작게 시작해서 커지기
      const scale = 0.3 + opacity * 0.7; // 0.3에서 1.0까지
      const translateY = (1 - opacity) * 100; // 아래에서 위로 올라오는 효과

      contactOverlay.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      contactOverlay.style.filter = `blur(${(1 - opacity) * 5}px)`; // 블러 효과

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

// ============================================================
// PROJECT DETAILS DATA
// ============================================================
const PROJECT_DETAILS = {
  "crepan": `
    <p class="tech-stack">Turborepo · pnpm workspace · Next.js · TypeScript</p>

    <div class="highlight-box">
      📌 B2B SaaS 환경에서 여러 프로젝트에서 공통으로 사용하는 UI 컴포넌트 라이브러리를 구축 및 모노레포 아키텍처 마이그레이션 작업을 주도하여 진행했습니다.
    </div>

    <ul class="detail-list">
      <li><strong>모노레포 아키텍처 마이그레이션</strong> — 도메인별 브랜치로 분리된 프로젝트 구조로 인해 공통 컴포넌트·훅·스타일 변경 시 각 브랜치에 개별 반영해야 하는 동기화 비용이 반복 발생. Turborepo + pnpm workspace 기반 모노레포 아키텍처로 마이그레이션을 설계 및 주도.</li>
      <li>공통 UI 패키지 분리 및 dependency 구조 재정립</li>
      <li>shared eslint/tsconfig 설정 통합</li>
      <li>변경 사항 단일 PR 반영 구조로 전환</li>
      <li class="result">→ 공통 코드 중복 제거 및 유지보수 비용 감소, 신규 프로젝트 셋업 시간 단축</li>
    </ul>
  `,
  "ecommerce": `
    <p class="tech-stack">Remix · React 18 · TypeScript · Zustand · TanStack Query · Vite · SCSS</p>

    <div class="highlight-box">
      📌 e커머스 업체를 위한 경쟁사 가격 모니터링 및 분석 웹 서비스를 개발했습니다.
    </div>

    <ul class="detail-list">
      <li><strong>Context + Custom Hook 설계</strong> — 페이지 내 다수의 하위 컴포넌트가 동일한 상태·핸들러를 공유하는 구조에서 Prop Drilling 방지를 위해 페이지 단위로 Context Provider를 구성하고 로직을 Custom Hook으로 캡슐화.</li>
      <li><strong>JWT 자동 갱신 시스템</strong> — Axios 인터셉터로 토큰 만료 감지, 갱신 중 요청 대기열 관리 후 일괄 재시도.</li>
      <li><strong>대용량 리스트 렌더링 최적화</strong> — 3,000+ row 전체 렌더링 구조에서 발생하던 reflow 기반 프레임 드랍 문제를 @tanstack/react-virtual 도입하여 viewport 영역의 row만 렌더링하도록 아키텍처를 개선.</li>
      <li class="result">→ DOM 노드 수 3,000개 → 200개 수준 감소 및 스크롤 60fps 유지 및 사용자 체감 성능 개선</li>
    </ul>
  `,
  "widget": `
    <p class="tech-stack">Preact · Vue · Vite · TypeScript · WebSocket</p>

    <div class="highlight-box">
      📌 크리에이터 방송 화면에 노출되는 신규 수익 모델 위젯을 프론트엔드 2인 체제에서 위젯 설정 UI 및 WebSocket 렌더링 로직 전담 개발했습니다.
    </div>

    <ul class="detail-list">
      <li>기획팀과 협업하여 위젯 설정 UI 및 CRUD 기능 개발</li>
      <li>Vue 기반 웹리모컨에 벽지 추가/복사/삭제 및 사이즈·위치 조절 로직 구현</li>
      <li><strong>WebSocket 패킷 데이터를 반응형 이미지로 실시간 렌더링</strong></li>
    </ul>
  `,
  "naver-login": `
    <p class="tech-stack">Preact · Vue · Electron.js · OAuth</p>

    <div class="highlight-box">
      📌 크리에이터 페이지 및 Electron.js 리모컨 앱에 REST API 연동을 통해 네이버 OAuth 구현했습니다.
    </div>

    <ul class="detail-list">
      <li>네이버 OAuth 연동 및 치지직 채널 연동 UI 개발</li>
      <li><strong>기획/디자인팀과의 일정 조율 및 의사결정을 주도하며 프로젝트 완수</strong></li>
    </ul>
  `,
  "redesign": `
    <p class="tech-stack">Preact · Vite · TypeScript · Storybook</p>

    <div class="highlight-box">
      📌 200만+ 사용자 플랫폼의 대규모 서비스 개편에 참여했습니다.
    </div>

    <ul class="detail-list">
      <li>모두의 보이스, 간편설정, 계정설정, 인벤토리 파트 개발</li>
      <li><strong>QA 1,100건 중 330건(30%) 디버깅 및 이슈 해결 주도</strong></li>
      <li><strong>Storybook을 활용한 공통 컴포넌트 문서화</strong> 작성 담당</li>
    </ul>
  `,
  "kiosk": `
    <p class="tech-stack">Electron · React · TypeScript · Socket.io · SerialPort</p>

    <div class="highlight-box">
      📌 하드웨어 연동이 필요한 B2B 키오스크 시스템을 단독으로 개발했습니다.
    </div>

    <ul class="detail-list">
      <li>지문인식기, 현금리더기, 영수증프린트 등 <strong>SerialPort 통신 및 결제 모듈 연동</strong></li>
      <li>다중 키오스크 간 <strong>Socket.io 실시간 데이터 동기화</strong> 구현</li>
      <li>문자 → 웹 → 키오스크 <strong>원격 결제 플로우 설계 및 개발</strong></li>
      <li><strong>Sentry를 활용한 에러 모니터링 시스템</strong> 구축</li>
    </ul>
  `
};

// ============================================================
// PROJECT ACCORDION FUNCTIONALITY
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // 아코디언 클릭 이벤트 처리
  document.addEventListener('click', function(e) {
    // 링크 클릭은 그대로 동작하게 하고 버블링 중단
    if (e.target.tagName === 'A') {
      e.stopPropagation();
      return;
    }

    if (e.target.classList.contains('project-item')) {
      e.preventDefault();

      const projectId = e.target.getAttribute('data-project');
      const existingDetail = e.target.nextElementSibling;

      // 이미 열려있는 경우 닫기
      if (existingDetail && existingDetail.classList.contains('project-detail')) {
        existingDetail.style.maxHeight = '0px';
        setTimeout(() => {
          existingDetail.remove();
        }, 300);
        return;
      }

      // 같은 레벨의 다른 열린 아코디언 닫기
      const projectList = e.target.parentElement;
      const openDetails = projectList.querySelectorAll('.project-detail');
      openDetails.forEach(detail => {
        detail.style.maxHeight = '0px';
        setTimeout(() => {
          detail.remove();
        }, 300);
      });

      // 새 상세 내용 추가
      if (PROJECT_DETAILS[projectId]) {
        const detailDiv = document.createElement('div');
        detailDiv.className = 'project-detail';
        detailDiv.innerHTML = PROJECT_DETAILS[projectId];
        detailDiv.style.maxHeight = '0px';
        detailDiv.style.overflow = 'hidden';
        detailDiv.style.transition = 'max-height 0.3s ease';

        e.target.parentNode.insertBefore(detailDiv, e.target.nextSibling);

        // 애니메이션을 위한 지연
        setTimeout(() => {
          detailDiv.style.maxHeight = detailDiv.scrollHeight + 'px';
        }, 10);
      }
    }
  });
});
