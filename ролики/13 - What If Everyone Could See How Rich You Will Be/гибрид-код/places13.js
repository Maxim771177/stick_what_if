// Места ролика 13, нарисованные кодом (стиль «комикс и стикеры»). Земля y=0, мир ±2000. far — дальний слой (параллакс .35, размытие), mid — рабочий, near — ближний (параллакс 1.45, размытие).
import { registerPlaces, rect, circ, poly, line, dots, rr, outline, stext, clamp, lerp, sm, rnd, FONT, burst } from "/hybrid13/engine13.js";

const fl = (c, y0, y1, col, lines, lcol = 'rgba(0,0,0,.12)', step = 70) => { c.fillStyle = col; c.fillRect(-3200, y0, 6400, y1 - y0); c.strokeStyle = lcol; c.lineWidth = 3; for (let y = y0 + step; y < y1; y += step) { c.beginPath(); c.moveTo(-3200, y); c.lineTo(3200, y); c.stroke(); } };
const wallDots = (c, y0, y1, col = 'rgba(0,0,0,.05)') => dots(c, -3200, y0, 6400, y1 - y0, col, 34, 5);
const baseboard = (c) => { c.fillStyle = '#6b4a2a'; c.fillRect(-3200, -26, 6400, 26); c.beginPath(); c.moveTo(-3200, 0); c.lineTo(3200, 0); c.lineWidth = 10; c.strokeStyle = '#111'; c.stroke(); };
function clock(c, x, y, r, h, m) { circ(c, x, y, r, '#fff', 8); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; line(c, [[x + Math.sin(a) * r * .8, y - Math.cos(a) * r * .8], [x + Math.sin(a) * r * .92, y - Math.cos(a) * r * .92]], 4); } const ha = ((h % 12) + m / 60) / 12 * 6.283, ma = m / 60 * 6.283; line(c, [[x, y], [x + Math.sin(ha) * r * .5, y - Math.cos(ha) * r * .5]], 9); line(c, [[x, y], [x + Math.sin(ma) * r * .78, y - Math.cos(ma) * r * .78]], 6); circ(c, x, y, 7, '#111', 0); }
export { clock };
function windowFrame(c, x, y, w, h, sky = '#9bdcff', t = 0, tree = true) { c.save(); rr(c, x, y, w, h, 10); c.clip(); c.fillStyle = sky; c.fillRect(x, y, w, h); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(x + w * .3, y + h * .3, 40, 0, 7); c.arc(x + w * .3 + 50, y + h * .27, 52, 0, 7); c.arc(x + w * .3 + 100, y + h * .3, 38, 0, 7); c.fill(); if (tree) { c.fillStyle = '#5bbf5a'; c.beginPath(); c.arc(x + w * .78, y + h * .62, 90, 0, 7); c.fill(); c.fillStyle = '#7a5230'; c.fillRect(x + w * .78 - 12, y + h * .62, 24, h); c.fillStyle = '#7bd35a'; c.fillRect(x, y + h * .88, w, h * .12); } c.restore(); rr(c, x, y, w, h, 10); c.lineWidth = 12; c.strokeStyle = '#111'; c.stroke(); line(c, [[x + w / 2, y], [x + w / 2, y + h]], 8); line(c, [[x, y + h / 2], [x + w, y + h / 2]], 8); rect(c, x - 18, y + h, w + 36, 18, '#f1e6d0', 6, 7); }
export { windowFrame };

registerPlaces({
  VOID: {
    bg: '#0b1530', far(c, t) { const g = c.createRadialGradient(0, -450, 100, 0, -450, 1500); g.addColorStop(0, '#1d3a78'); g.addColorStop(1, '#0a1230'); c.fillStyle = g; c.fillRect(-4000, -2200, 8000, 3400); dots(c, -2600, -1400, 5200, 1900, 'rgba(255,255,255,.07)', 46, 4); c.strokeStyle = 'rgba(120,170,255,.08)'; c.lineWidth = 3; for (let x = -2600; x < 2600; x += 120) { c.beginPath(); c.moveTo(x, -1500); c.lineTo(x, 500); c.stroke(); } for (let y = -1400; y < 500; y += 120) { c.beginPath(); c.moveTo(-2600, y); c.lineTo(2600, y); c.stroke(); } },
    mid() { }, near() { }
  },
  CLASS: {
    bg: '#f3e4bd', far(c) { c.fillStyle = '#f3e4bd'; c.fillRect(-4000, -2000, 8000, 2000); },
    mid(c, t, k) {
      c.fillStyle = '#f3e4bd'; c.fillRect(-3200, -1500, 6400, 1500); wallDots(c, -1500, 0); c.fillStyle = '#6fb39a'; c.fillRect(-3200, -230, 6400, 204); c.fillStyle = '#4f967c'; c.fillRect(-3200, -240, 6400, 14); fl(c, 0, 900, '#d9a35f', 0, 'rgba(90,50,10,.22)', 78); baseboard(c);
      // доска
      rect(c, -1560, -600, 780, 380, '#2f6b52', 12, 12); rect(c, -1540, -228, 740, 22, '#9a6a3a', 6, 7); c.fillStyle = 'rgba(255,255,255,.88)'; c.font = `46px ${FONT}`; c.textAlign = 'left'; c.fillText('2 + 2 = ?', -1500, -520); c.fillText('x² + y² = z²', -1500, -450); line(c, [[-1500, -380], [-1100, -380]], 5, 'rgba(255,255,255,.7)'); c.fillText(k.sc.board || 'ATTENDANCE', -1500, -320);
      // часы
      const ck = k.sc.clock || [8, 12]; clock(c, -560, -860, 82, ck[0], ck[1]);
      // окно, плакаты, доска объявлений
      windowFrame(c, 760, -790, 520, 470, '#9bdcff', t); rect(c, -330, -650, 210, 150, '#ffd23f', 8, 7); stext(c, 'ABC', -225, -575, 70, '#e0242b', 0, 1, '#111', false); rect(c, -40, -660, 220, 170, '#cfe8ff', 8, 7); circ(c, 70, -575, 52, '#5bbf5a', 6); line(c, [[20, -560], [120, -590]], 5); rect(c, 340, -640, 300, 200, '#c58b4b', 8, 8); for (let i = 0; i < 6; i++) rect(c, 365 + (i % 3) * 90, -620 + Math.floor(i / 3) * 90, 70, 70, ['#ff7eb6', '#9be15d', '#8ab6ff', '#ffd23f', '#ff9c3a', '#b58cff'][i], 3, 4);
      // дверь справа
      rect(c, 1500, -560, 250, 560, '#a4693a', 10, 10); rect(c, 1540, -520, 170, 200, '#b9e2ff', 8, 7); circ(c, 1700, -250, 14, '#ffd23f', 5);
    },
    near(c, t) { for (const x of [-900, 100, 1100]) { line(c, [[x, -1400], [x, -960]], 5); rect(c, x - 110, -990, 220, 54, '#fff7c4', 14, 8); } }
  },
  CAFE: {
    bg: '#f6e9b8', far(c) { c.fillStyle = '#f6e9b8'; c.fillRect(-4000, -2000, 8000, 2000); },
    mid(c, t, k) {
      c.fillStyle = '#f6e9b8'; c.fillRect(-3200, -1500, 6400, 1500); wallDots(c, -1500, 0, 'rgba(0,0,0,.04)'); c.fillStyle = '#ef8a5a'; c.fillRect(-3200, -240, 6400, 214);
      // плитка пола
      c.fillStyle = '#e7dcc3'; c.fillRect(-3200, 0, 6400, 900); for (let j = 0; j < 12; j++) for (let i = -30; i < 30; i++) if ((i + j) % 2) { c.fillStyle = '#cbbf9f'; c.fillRect(i * 120, j * 75, 120, 75); } baseboard(c);
      // окно слева (фургон за ним)
      if (k.sc.vanWindow !== false) { windowFrame(c, -620, -820, 640, 520, '#a9e0ff', t, false); c.save(); rr(c, -620, -820, 640, 520, 10); c.clip(); c.fillStyle = '#c9c1b0'; c.fillRect(-620, -430, 640, 130); rect(c, -140 + (k.sc.van ? (1 - sm(clamp(k.lt / 2.6))) * 260 : 0), -520, 170, 90, '#e8eef5', 14, 5); circ(c, -100 + (k.sc.van ? (1 - sm(clamp(k.lt / 2.6))) * 260 : 0), -418, 18, '#222', 3); circ(c, -10 + (k.sc.van ? (1 - sm(clamp(k.lt / 2.6))) * 260 : 0), -418, 18, '#222', 3); rect(c, -560, -560, 60, 130, '#7a5230', 4, 5); c.restore(); }
      // раздача справа
      rect(c, 600, -300, 1000, 300, '#cfd6df', 10, 10); rect(c, 580, -330, 1040, 36, '#7b8696', 8, 8); for (let i = 0; i < 4; i++) { rect(c, 660 + i * 230, -400, 200, 70, ['#e0242b', '#ffd23f', '#5bbf5a', '#e4872b'][i], 10, 7); } rect(c, 600, -560, 1000, 14, '#bfe6ff', 3, 5); line(c, [[620, -546], [620, -330]], 6); line(c, [[1580, -546], [1580, -330]], 6); rect(c, 600, -700, 1000, 20, '#9aa6b5', 4, 6);
      // табло меню без текста
      rect(c, 850, -1040, 480, 140, '#2b3a33', 12, 10); for (let i = 0; i < 3; i++) line(c, [[890, -990 + i * 38], [1290 - i * 80, -990 + i * 38]], 7, 'rgba(255,255,255,.65)');
      // дальние столы
      for (const x of [-1500, -1150, -250]) { rect(c, x, -250, 300, 36, '#b98b52', 6, 7); line(c, [[x + 30, -214], [x + 30, 0]], 8); line(c, [[x + 270, -214], [x + 270, 0]], 8); }
    },
    near(c) { for (const x of [-1100, 400]) { line(c, [[x, -1400], [x, -980]], 5); circ(c, x, -950, 56, '#fff7c4', 8); } }
  },
  HALL: {
    bg: '#d8e6f0', far(c) { c.fillStyle = '#d8e6f0'; c.fillRect(-4000, -2000, 8000, 2000); },
    mid(c, t, k) {
      c.fillStyle = '#e5eef5'; c.fillRect(-3200, -1500, 6400, 1500); fl(c, 0, 900, '#c4cdd6', 0, 'rgba(0,0,0,.14)', 80); c.fillStyle = '#9aa6b5'; c.fillRect(-3200, -26, 6400, 26); baseboard(c);
      const cols = ['#3a78c9', '#e4572e', '#3a78c9', '#5bbf5a', '#3a78c9', '#e4572e']; for (let i = -9; i < 10; i++) { const x = i * 190; rect(c, x, -620, 170, 600, cols[(i + 20) % 6], 8, 8); for (let r = 0; r < 4; r++) line(c, [[x + 30, -560 + r * 28], [x + 140, -560 + r * 28]], 4, 'rgba(0,0,0,.45)'); circ(c, x + 138, -300, 8, '#ffd23f', 3); rect(c, x + 30, -470, 110, 40, '#ffd23f', 3, 4); }
      rect(c, -2000, -1000, 600, 320, '#fff7c4', 12, 8); // доска
      rect(c, 760, -250, 500, 40, '#a4693a', 6, 7); line(c, [[800, -210], [800, 0]], 9); line(c, [[1220, -210], [1220, 0]], 9);
      windowFrame(c, 1500, -900, 420, 330, '#a9e0ff', t, false);
    },
    near(c) { }
  },
  STREET: {
    bg: '#8fd3ff', far(c, t) { const g = c.createLinearGradient(0, -1800, 0, 0); g.addColorStop(0, '#46b9ee'); g.addColorStop(1, '#cdefff'); c.fillStyle = g; c.fillRect(-4000, -1800, 8000, 1800); for (const [x, y, s] of [[-900, -1050, 1.1], [300, -1220, .9], [1300, -980, 1.2], [-2000, -1150, 1], [2300, -1060, 1]]) { c.save(); c.translate(x, y); c.scale(s, s); c.beginPath(); c.arc(0, 0, 60, 0, 7); c.arc(70, -20, 75, 0, 7); c.arc(150, 6, 58, 0, 7); c.rect(0, 0, 150, 58); outline(c, '#fff', 9); c.restore(); } c.beginPath(); c.moveTo(-3200, 0); for (let x = -3200; x <= 3200; x += 100) c.lineTo(x, -120 - 60 * Math.sin(x * .004) - 40 * Math.sin(x * .011)); c.lineTo(3200, 300); c.lineTo(-3200, 300); c.closePath(); outline(c, '#7bd35a', 9); },
    mid(c, t, k) {
      c.fillStyle = '#8fdc62'; c.fillRect(-3200, -220, 6400, 220); dots(c, -3200, -220, 6400, 220, 'rgba(40,120,50,.25)', 28, 5);
      // тротуар
      c.fillStyle = '#d7d2c8'; c.fillRect(-3200, 0, 6400, 120); line(c, [[-3200, 0], [3200, 0]], 8); for (let x = -3200; x < 3200; x += 220) line(c, [[x, 0], [x, 120]], 4, 'rgba(0,0,0,.25)'); rect(c, -3200, 120, 6400, 36, '#a9a49a', 0, 8);
      // дорога
      c.fillStyle = '#5a5f6b'; c.fillRect(-3200, 156, 6400, 520); for (let x = -3200; x < 3200; x += 260) rect(c, x, 400, 130, 22, '#f5e26b', 4, 4);
      // дом Leon справа
      const hx = 700; rect(c, hx, -640, 760, 640, '#f2d9a0', 10, 10); poly(c, [[hx - 50, -640], [hx + 380, -940], [hx + 810, -640]], '#c0504d', 10); rect(c, hx + 80, -480, 190, 220, '#b9e2ff', 8, 8); rect(c, hx + 520, -480, 170, 220, '#b9e2ff', 8, 8); line(c, [[hx + 175, -480], [hx + 175, -260]], 6); line(c, [[hx + 605, -480], [hx + 605, -260]], 6); rect(c, hx + 330, -420, 130, 420, '#a4693a', 8, 9); circ(c, hx + 440, -200, 10, '#ffd23f', 4);
      // подъездная дорожка
      poly(c, [[300, 0], [700, 0], [700, 140], [200, 140]], '#bdb8ae', 7);
      // дом соседа слева
      const nx = -1700; rect(c, nx, -600, 700, 600, '#cfe3f7', 10, 10); poly(c, [[nx - 50, -600], [nx + 350, -880], [nx + 750, -600]], '#6b7fa3', 10); rect(c, nx + 80, -460, 220, 200, '#ffe9a8', 8, 8); rect(c, nx + 420, -440, 120, 440, '#a4693a', 8, 9);
      // дерево
      rect(c, -430, -480, 44, 480, '#7a5230', 6, 8); circ(c, -408, -540, 150, '#4fb050', 9); circ(c, -300, -500, 100, '#5bbf5a', 9);
    },
    near() { }
  },
  KITCHEN: {
    bg: '#f9ecc0', far(c) { c.fillStyle = '#f9ecc0'; c.fillRect(-4000, -2000, 8000, 2000); },
    mid(c, t, k) {
      c.fillStyle = '#f9ecc0'; c.fillRect(-3200, -1500, 6400, 1500); wallDots(c, -1500, 0); c.fillStyle = '#ffffff'; for (let i = -30; i < 30; i++) for (let j = 0; j < 4; j++) { c.strokeStyle = 'rgba(0,0,0,.1)'; c.lineWidth = 2; c.strokeRect(i * 90, -430 + j * 90, 90, 90); } c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(-3200, -430, 6400, 360); fl(c, 0, 900, '#c98f58', 0, 'rgba(60,30,0,.2)', 80); baseboard(c);
      // окно слева
      windowFrame(c, -1000, -850, 560, 480, k.sc.sky || '#9bdcff', t, false); if (k.sc.street) k.sc.street(c, -1000, -850, 560, 480);
      // входная дверь слева
      rect(c, -1650, -620, 260, 620, '#a4693a', 10, 10); rect(c, -1600, -560, 160, 180, '#b9e2ff', 8, 7); circ(c, -1420, -280, 14, '#ffd23f', 5); rect(c, -1700, 0, 360, 26, '#7a5230', 4, 7);
      // задняя дверь справа
      rect(c, 1260, -620, 260, 620, '#7aa0c8', 10, 10); rect(c, 1310, -560, 160, 340, '#d7efff', 8, 7); rect(c, 1230, 0, 340, 26, '#7a5230', 4, 7);
      // холодильник и тумба
      rect(c, 760, -760, 240, 760, '#e8eef5', 14, 10); line(c, [[760, -470], [1000, -470]], 7); line(c, [[800, -400], [800, -300]], 12); line(c, [[800, -690], [800, -560]], 12);
      rect(c, 80, -170, 80, 170, '#a4693a', 4, 8); rect(c, 500, -170, 80, 170, '#a4693a', 4, 8); // ножки стола (ниже)
      // часы
      const ck = k.sc.clock || [8, 40]; clock(c, 120, -980, 66, ck[0], ck[1]);
    },
    near(c) { }
  },
  GARAGE: {
    bg: '#8a8f98', far(c) { c.fillStyle = '#9ba1ab'; c.fillRect(-4000, -2000, 8000, 2000); },
    mid(c, t, k) {
      c.fillStyle = '#a8aeb8'; c.fillRect(-3200, -1500, 6400, 1500); dots(c, -3200, -1500, 6400, 1500, 'rgba(0,0,0,.07)', 30, 5); fl(c, 0, 900, '#7d838d', 0, 'rgba(0,0,0,.2)', 90); baseboard(c);
      // пегборд
      rect(c, 700, -940, 900, 560, '#c9a86a', 10, 9); dots(c, 720, -920, 860, 520, 'rgba(0,0,0,.22)', 36, 4); for (const [x, y, w, h, col] of [[760, -860, 160, 40, '#e0242b'], [980, -860, 40, 150, '#3a78c9'], [1100, -860, 200, 36, '#ffd23f'], [1360, -870, 60, 170, '#5bbf5a'], [800, -720, 40, 140, '#e4872b'], [1180, -740, 180, 40, '#e0242b']]) rect(c, x, y, w, h, col, 6, 6);
      // верстак
      rect(c, 780, -330, 720, 54, '#a4693a', 8, 9); line(c, [[830, -276], [830, 0]], 11); line(c, [[1450, -276], [1450, 0]], 11); rect(c, 840, -150, 600, 28, '#8a5a2e', 4, 6);
      // рольставни слева
      rect(c, -1700, -860, 900, 860, '#d7dce3', 10, 10); for (let y = -840; y < 0; y += 70) line(c, [[-1690, y], [-810, y]], 4, 'rgba(0,0,0,.35)'); rect(c, -1700, -860, 900, 16, '#8a8f98', 4, 6); rect(c, -1140, -140, 180, 140, '#ffeaa0', 0, 0);
      // шины
      for (let i = 0; i < 3; i++) circ(c, -700 + i * 150, -80, 78, '#2b2b33', 9);
    },
    near(c) { }
  },
  ROAD: {
    bg: '#8fd3ff', far(c, t) { const g = c.createLinearGradient(0, -1800, 0, 0); g.addColorStop(0, '#46b9ee'); g.addColorStop(1, '#cdefff'); c.fillStyle = g; c.fillRect(-4000, -1800, 8000, 1800); for (const [x, y, s] of [[-900, -1000, 1.1], [500, -1180, .9], [1500, -960, 1.2], [-2200, -1100, 1]]) { c.save(); c.translate(x, y); c.scale(s, s); c.beginPath(); c.arc(0, 0, 60, 0, 7); c.arc(70, -20, 75, 0, 7); c.arc(150, 6, 58, 0, 7); c.rect(0, 0, 150, 58); outline(c, '#fff', 9); c.restore(); } for (let i = -8; i < 10; i++) { const x = i * 330, h = 280 + rnd(i + 5) * 260; rect(c, x, -h - 40, 270, h + 40, ['#f2d9a0', '#cfe3f7', '#ffd0d0', '#d8f0c8'][((i % 4) + 4) % 4], 6, 9); poly(c, [[x - 20, -h - 40], [x + 135, -h - 150], [x + 290, -h - 40]], ['#c0504d', '#6b7fa3', '#8a6a4a'][((i % 3) + 3) % 3], 9); rect(c, x + 60, -h + 30, 70, 80, '#b9e2ff', 4, 6); rect(c, x + 160, -h + 30, 70, 80, '#b9e2ff', 4, 6); } },
    mid(c, t, k) {
      c.fillStyle = '#8fdc62'; c.fillRect(-3200, -120, 6400, 120); dots(c, -3200, -120, 6400, 120, 'rgba(40,120,50,.25)', 28, 5);
      c.fillStyle = '#d7d2c8'; c.fillRect(-3200, 0, 6400, 140); line(c, [[-3200, 0], [3200, 0]], 8); for (let x = -3200; x < 3200; x += 240) line(c, [[x, 0], [x, 140]], 4, 'rgba(0,0,0,.25)'); rect(c, -3200, 140, 6400, 36, '#a9a49a', 0, 8); c.fillStyle = '#5a5f6b'; c.fillRect(-3200, 176, 6400, 500);
      // забор и деревья
      for (let x = -3000; x < 3000; x += 70) rect(c, x, -230, 56, 230, '#f4efe1', 3, 5); line(c, [[-3000, -170], [3000, -170]], 8); for (const x of [-1000, 300, 1500]) { rect(c, x, -460, 40, 460, '#7a5230', 6, 8); circ(c, x + 20, -530, 140, '#4fb050', 9); }
      // табличка школы вдали справа
      rect(c, 1800, -420, 360, 140, '#2f5db0', 10, 9); stext(c, 'SCHOOL', 1980, -350, 70, '#fff', 0, 1, '#111', false);
    },
    near(c, t) { }
  },
  BACKYARD: {
    bg: '#8fd3ff', far(c, t) { const g = c.createLinearGradient(0, -1800, 0, 0); g.addColorStop(0, '#46b9ee'); g.addColorStop(1, '#cdefff'); c.fillStyle = g; c.fillRect(-4000, -1800, 8000, 1800); for (const [x, y, s] of [[-800, -1000, 1.1], [700, -1180, .9], [1700, -960, 1.2]]) { c.save(); c.translate(x, y); c.scale(s, s); c.beginPath(); c.arc(0, 0, 60, 0, 7); c.arc(70, -20, 75, 0, 7); c.arc(150, 6, 58, 0, 7); c.rect(0, 0, 150, 58); outline(c, '#fff', 9); c.restore(); } },
    mid(c, t, k) {
      c.fillStyle = '#7bd35a'; c.fillRect(-3200, 0, 6400, 900); dots(c, -3200, 0, 6400, 900, 'rgba(40,120,50,.3)', 32, 5); line(c, [[-3200, 0], [3200, 0]], 8);
      for (let x = -3200; x < 3200; x += 80) rect(c, x, -360, 64, 360, '#f4efe1', 4, 6); line(c, [[-3200, -270], [3200, -270]], 9); line(c, [[-3200, -110], [3200, -110]], 9);
      // дом слева
      rect(c, -1700, -820, 900, 820, '#f2d9a0', 10, 10); poly(c, [[-1760, -820], [-1250, -1120], [-740, -820]], '#c0504d', 10); rect(c, -1560, -640, 220, 240, '#ffe9a8', 8, 8); rect(c, -1130, -560, 220, 560, '#7aa0c8', 8, 9);
      // дерево справа
      rect(c, 1000, -620, 60, 620, '#7a5230', 6, 9); circ(c, 1030, -700, 200, '#4fb050', 9); circ(c, 1160, -640, 120, '#5bbf5a', 9);
    },
    near(c) { }
  },
  YARD: {
    bg: '#0c1633', far(c, t) { const g = c.createLinearGradient(0, -1800, 0, 0); g.addColorStop(0, '#08102a'); g.addColorStop(1, '#233a73'); c.fillStyle = g; c.fillRect(-4000, -1800, 8000, 1800); for (let i = 0; i < 90; i++) { const x = (rnd(i) - .5) * 5000, y = -1700 + rnd(i + 9) * 1100, r = 3 + rnd(i + 3) * 5; c.fillStyle = `rgba(255,255,255,${.5 + .4 * Math.sin(t * 2 + i)})`; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); } circ(c, 500, -1300, 120, '#fff6c4', 9); c.fillStyle = 'rgba(255,246,196,.18)'; c.beginPath(); c.arc(500, -1300, 260, 0, 7); c.fill(); },
    mid(c, t, k) {
      c.fillStyle = '#2d5a3a'; c.fillRect(-3200, 0, 6400, 900); dots(c, -3200, 0, 6400, 900, 'rgba(10,40,20,.5)', 32, 5); line(c, [[-3200, 0], [3200, 0]], 8);
      for (let x = -3200; x < 3200; x += 80) rect(c, x, -370, 64, 370, '#4a5a78', 4, 6); line(c, [[-3200, -270], [3200, -270]], 9); line(c, [[-3200, -110], [3200, -110]], 9);
      // дом на дальнем плане с тёплым окном
      rect(c, 1500, -900, 600, 900, '#34416b', 10, 10); rect(c, 1600, -700, 220, 260, '#ffd770', 8, 9); c.fillStyle = 'rgba(255,215,112,.18)'; c.beginPath(); c.moveTo(1600, -440); c.lineTo(1820, -440); c.lineTo(2000, 0); c.lineTo(1500, 0); c.closePath(); c.fill();
      // качели справа
      const sx = 560; line(c, [[sx, 0], [sx + 140, -520], [sx + 280, 0]], 16); line(c, [[sx + 560, 0], [sx + 420, -520], [sx + 280, 0]], 16); line(c, [[sx + 120, -540], [sx + 440, -540]], 20, '#8a8f98'); line(c, [[sx + 120, -540], [sx + 440, -540]], 10, '#aab0ba');
      const sw = Math.sin(t * 1.6) * .05; for (const dx of [250]) { c.save(); c.translate(sx + dx, -535); c.rotate(sw); line(c, [[-34, 0], [-34, 445]], 5); line(c, [[34, 0], [34, 445]], 5); rect(c, -64, 440, 128, 22, '#a4693a', 6, 7); c.restore(); }
    },
    near(c) { }
  },
  GYM: {
    bg: '#e8d3a2', far(c) { c.fillStyle = '#e9d6a6'; c.fillRect(-4000, -2000, 8000, 2000); },
    mid(c, t, k) {
      c.fillStyle = '#e9d6a6'; c.fillRect(-3200, -1600, 6400, 1600); wallDots(c, -1600, 0); c.fillStyle = '#3a78c9'; c.fillRect(-3200, -330, 6400, 300); c.fillStyle = '#fff'; c.fillRect(-3200, -350, 6400, 20);
      fl(c, 0, 900, '#e8b56a', 0, 'rgba(90,50,10,.24)', 82); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 7; c.beginPath(); c.moveTo(-3200, 230); c.lineTo(3200, 230); c.stroke(); baseboard(c);
      // баннеры
      for (let i = 0; i < 6; i++) { const x = -300 + i * 190; poly(c, [[x, -1380], [x + 140, -1380], [x + 140, -1160], [x + 70, -1110], [x, -1160]], ['#e0242b', '#3a78c9', '#ffd23f'][i % 3], 7); }
      // часы
      const ck = k.sc.clock || [3, 40]; clock(c, 150, -1000, 100, ck[0], ck[1]);
      // сцена слева
      rect(c, -1700, -190, 980, 190, '#8a5a2e', 6, 10); rect(c, -1700, -210, 980, 26, '#a4693a', 4, 8); // помост
      poly(c, [[-1700, -1130], [-720, -1130], [-720, -210], [-1700, -210]], '#6b1f2b', 10); for (let i = 0; i < 9; i++) line(c, [[-1680 + i * 110, -1100], [-1680 + i * 110, -230]], 5, 'rgba(0,0,0,.28)'); rect(c, -1400, -1090, 420, 120, '#ffd23f', 8, 8); stext(c, k.sc.banner || 'SCIENCE FAIR', -1190, -1030, 62, '#e0242b', 0, 1, '#111', false);
      // ступеньки на сцену слева
      for (let i = 0; i < 3; i++) rect(c, -1860 + i * 56, -62 * (i + 1), 190 - i * 56, 62, '#c98f58', 4, 8);
      // трибуны справа
      for (let r = 0; r < 4; r++) { rect(c, 560 + r * 90, -80 - r * 90, 1260 - r * 90, 90, r % 2 ? '#b98b52' : '#c9996a', 3, 8); line(c, [[560 + r * 90, -90 - r * 90], [1820, -90 - r * 90]], 5, 'rgba(0,0,0,.25)'); }
      // дверь справа
      rect(c, 1950, -600, 280, 600, '#a4693a', 10, 10); rect(c, 2000, -560, 180, 200, '#b9e2ff', 8, 7);
      // ярмарочные столы у дальней стены справа
      rect(c, 1000, -240, 640, 36, '#d9c9a0', 6, 8); rect(c, 2100, -240, 40, 40, '#d9c9a0', 6, 8);
    },
    near(c, t) { for (const x of [-1000, 400, 1500]) { line(c, [[x, -1500], [x, -1180]], 5); rect(c, x - 100, -1210, 200, 50, '#fff7c4', 12, 8); } }
  },
});
