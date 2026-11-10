import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { chromium } from 'playwright';
const ROOT = path.dirname(fileURLToPath(import.meta.url)); const OUT = process.argv[2];
const T = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png' };
const srv = http.createServer((req, res) => { const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/art$/, '/tools-channel-art.html')); if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': T[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res); }).listen(0);
const port = srv.address().port; const b = await chromium.launch({ executablePath: process.env.CHROME_PATH });
for (const [mode, w, h] of [['banner', 2560, 1440], ['logo', 800, 800]]) {
  const pg = await b.newPage({ viewport: { width: w, height: h } }); pg.on('pageerror', e => console.log('ERR', e.message)); pg.on('console', m => /error/i.test(m.text()) && console.log(m.text()));
  await pg.goto(`http://localhost:${port}/art?mode=${mode}`); await pg.waitForFunction('window.READY===true', null, { timeout: 30000 });
  await pg.locator('canvas').screenshot({ path: path.join(OUT, mode + '.png') }); await pg.close();
}
await b.close(); srv.close(); console.log('ok');
