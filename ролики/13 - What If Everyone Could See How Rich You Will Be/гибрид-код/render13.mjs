// Рендер ролика 13: стоп-кадры, листы кадров, полный видеорендер (только на Mac владельца).
//  node render13.mjs --stills S001:0.5,S010:0.9 --out DIR
//  node render13.mjs --sheet [--ids S001-S024] [--phases 0.1,0.5,0.9] --out DIR
//  node render13.mjs --video --from 0 --to 60 --out DIR   (секунды ВЫХОДНОГО видео)
import { createRequire } from 'module'; import http from 'http'; import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url'; import { spawn } from 'child_process';
const ROOT = process.env.RAZGON_ROOT || '/Users/maksim/stick_what_if/razgon-animation-studio'; const require = createRequire(ROOT + '/package.json'); const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url)); const args = process.argv.slice(2); const get = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1]; }; const has = (k) => args.includes(k);
const T = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.jpg': 'image/jpeg' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); let p; if (u.startsWith('/hybrid13/')) p = path.join(here, u.slice(10)); else if (u === '/data/scenes.json') p = path.join(here, '..', 'сцены.json'); else p = path.join(ROOT, u);
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': T[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0);
const OUT = path.resolve(get('--out', path.join(here, 'out'))); fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
pg.on('pageerror', (e) => console.log('PAGEERROR', e.message)); pg.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
await pg.goto(`http://localhost:${srv.address().port}/hybrid13/scene13.html`); await pg.evaluate(() => window.ready); await pg.waitForTimeout(200);
const ids = await pg.evaluate(() => window.SCENES);
const sel = (spec) => { if (!spec) return ids; const out = []; for (const part of spec.split(',')) { if (part.includes('-')) { const [a, b2] = part.split('-'); out.push(...ids.slice(ids.indexOf(a), ids.indexOf(b2) + 1)); } else out.push(part); } return out; };
const shot = async (id, ph) => { await pg.evaluate(([i, p]) => window.still(i, p), [id, ph]); return Buffer.from((await pg.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.92))).split(',')[1], 'base64'); };
if (get('--stills')) { for (const s of get('--stills').split(',')) { const [id, ph] = s.split(':'); fs.writeFileSync(path.join(OUT, `${id}_${ph}.jpg`), await shot(id, parseFloat(ph))); } }
else if (has('--sheet')) {
  const phases = get('--phases', '0.1,0.5,0.9').split(',').map(parseFloat); const list = sel(get('--ids')); const per = parseInt(get('--per', '24'));
  for (let s0 = 0; s0 < list.length; s0 += per) { const chunk = list.slice(s0, s0 + per); const frames = [];
    for (const id of chunk) for (const ph of phases) { const buf = await shot(id, ph); frames.push({ id, ph, buf }); }
    // собираем лист в странице: ячейка 320x180, по 2 сцены в ряд
    const rows = Math.ceil(chunk.length / 2), cw = 316, ch = 178; const pg2 = await b.newPage({ viewport: { width: cw * phases.length * 2 + 12, height: rows * (ch + 22) + 6 } });
    const html = `<body style="margin:0;background:#111;font:bold 15px Arial;color:#fff"><div style="display:grid;grid-template-columns:repeat(2,auto);gap:6px 12px;padding:3px">${chunk.map((id) => `<div><div style="height:18px">${id}</div><div style="display:flex;gap:2px">${frames.filter((f) => f.id === id).map((f) => `<img width="${cw}" height="${ch}" src="data:image/jpeg;base64,${f.buf.toString('base64')}">`).join('')}</div></div>`).join('')}</div></body>`;
    await pg2.setContent(html); await pg2.waitForTimeout(150); const name = `sheet_${chunk[0]}-${chunk[chunk.length - 1]}.png`; await pg2.screenshot({ path: path.join(OUT, name), fullPage: true }); await pg2.close(); console.log('sheet', name); }
}
else if (has('--video')) {
  const from = parseFloat(get('--from', '0')), to = parseFloat(get('--to', String((await pg.evaluate(() => window.DUR)) / 1.2 + 2.5))); const fps = 60, n0 = Math.round(from * fps), n1 = Math.round(to * fps);
  const outf = path.join(OUT, `silent_${from}-${to}.mp4`); const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', outf], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = n0; i < n1; i++) { await pg.evaluate((t) => window.draw(t), i / fps); const d = await pg.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.93)); const buf = Buffer.from(d.split(',')[1], 'base64'); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); if (i % 300 === 0) console.log('frame', i, '/', n1); }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r)); console.log('video', outf);
}
const errs = await pg.evaluate(() => window.ERRS); for (const e of errs) console.log(e); console.log('ERRORS:', errs.length);
await b.close(); srv.close(); console.log('done');
