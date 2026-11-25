// Рендер ролика 12 (гибрид). Режимы: --check, --sheet a-b [--phases .1,.5,.9], --still t, --video [--from s --to s] [--fps 30]
import { createRequire } from 'module'; import { spawn } from 'child_process'; import http from 'http'; import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url)); const DIR = path.dirname(here);
const ROOT = process.env.RAZGON_ROOT || path.resolve(here, '../../../razgon-animation-studio'); const require = createRequire(ROOT + '/package.json'); const { chromium } = require('playwright');
const args = process.argv.slice(2); const get = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1]; }; const has = k => args.includes(k);
const TY = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); const p = u.startsWith('/hybrid12/') ? path.join(here, u.slice(10)) : u.startsWith('/data/') ? path.join(DIR, u.slice(6)) : path.join(ROOT, u);
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': TY[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0);
const OUT = path.resolve(get('--out', path.join(here, 'out'))); fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
pg.on('pageerror', e => console.log('PAGEERROR', e.message)); pg.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
await pg.goto(`http://localhost:${srv.address().port}/hybrid12/stage.html`); await pg.evaluate(() => window.fontsReady);
const scenes = await pg.evaluate(() => window.SCN.map(s => [s.id, s.start, s.end]));
const ph = (get('--phases', '.1,.5,.9')).split(',').map(Number);
const range = (get('--sheet', get('--check', '1-152'))).split('-').map(Number); const [ra, rb] = [range[0], range[1] ?? range[0]];
if (has('--check')) { let n = 0; for (let i = ra; i <= rb; i++) { const [id, s, e] = scenes[i - 1]; for (const f of ph) { const errs = await pg.evaluate(t => window.check(t), s + (e - s) * f); errs.forEach(x => { console.log('ERROR frame-check', x); n++; }); } } console.log('frame-check done, errors:', n); }
else if (has('--sheet')) { const per = +get('--per', 12); let idx = 0; for (let i = ra; i <= rb; i += per) { const items = []; for (let j = i; j < Math.min(rb + 1, i + per); j++) { const [id, s, e] = scenes[j - 1]; ph.forEach(f => items.push([s + (e - s) * f, id.replace('S', 'S') + ' ' + f])); } const d = await pg.evaluate(it => window.sheet(it, 3, 640, 360), items); fs.writeFileSync(path.join(OUT, `sheet-${String(i).padStart(3, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64')); console.log('sheet', i); } }
else if (has('--still')) { for (const t of get('--still').split(',')) { await pg.evaluate(t => window.draw(t), +t); const d = await pg.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', .92)); fs.writeFileSync(path.join(OUT, `still-${t}.jpg`), Buffer.from(d.split(',')[1], 'base64')); } }
else if (has('--video')) { const fps = +get('--fps', 30), t0 = +get('--from', 0), t1 = +get('--to', await pg.evaluate(() => window.END)); const n = Math.round((t1 - t0) * fps); const outf = path.join(OUT, get('--name', 'silent.mp4'));
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', outf], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) { await pg.evaluate(t => window.draw(t), t0 + i / fps); const d = await pg.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', .93)); const buf = Buffer.from(d.split(',')[1], 'base64'); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 300 === 0) console.log('frame', i, '/', n); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('video', outf); }
await b.close(); srv.close();
