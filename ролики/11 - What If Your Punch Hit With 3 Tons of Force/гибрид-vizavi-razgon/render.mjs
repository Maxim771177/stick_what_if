import { createRequire } from 'module'; import { spawn } from 'child_process'; import http from 'http';
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const ROOT='/Users/maksim/stick_what_if/razgon-animation-studio'; const require=createRequire(ROOT+'/package.json'); const { chromium }=require('playwright');
const here=path.dirname(fileURLToPath(import.meta.url)); const args=process.argv.slice(2); const get=(k,d)=>{const i=args.indexOf(k);return i<0?d:args[i+1]};
const TYPES={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.woff2':'font/woff2','.woff':'font/woff','.png':'image/png','.jpg':'image/jpeg'};
const server=http.createServer((req,res)=>{const u=decodeURIComponent(req.url.split('?')[0]);const p=u.startsWith('/hybrid/')?path.join(here,u.slice(8)):path.join(ROOT,u);
 if(!fs.existsSync(p)||fs.statSync(p).isDirectory()){res.writeHead(404);return res.end()}res.writeHead(200,{'Content-Type':TYPES[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(res)}).listen(0);
const port=server.address().port; const motion=get('--motion','razgon');
const chrome=process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({executablePath:chrome}); const page=await browser.newPage({viewport:{width:1920,height:1080}});
page.on('pageerror',e=>console.log('PAGEERROR',e.message)); page.on('console',m=>{if(m.type()==='error'||/missing/i.test(m.text()))console.log('CONSOLE',m.text())});
await page.goto(`http://localhost:${port}/hybrid/scene.html?motion=${motion}`); await page.evaluate(()=>window.fontsReady);
const grab=async t=>{await page.evaluate(t=>window.draw(t),t);const d=await page.evaluate(()=>document.getElementById('c').toDataURL('image/jpeg',0.93));return Buffer.from(d.split(',')[1],'base64')};
if(get('--stills')){const out=get('--out',path.join(here,'stills-'+motion));fs.mkdirSync(out,{recursive:true});for(const s of get('--stills').split(','))fs.writeFileSync(path.join(out,`t${s}.jpg`),await grab(parseFloat(s)/1.2))}
else{const dur=31.4/1.2,fps=60,n=Math.round(dur*fps);const outf=path.join(here,`silent-${motion}.mp4`);
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p',outf],{stdio:['pipe','inherit','inherit']});
 for(let i=0;i<n;i++){const b=await grab(i/fps);if(!ff.stdin.write(b))await new Promise(r=>ff.stdin.once('drain',r));if(i%120===0)console.log('frame',i,'/',n)}
 ff.stdin.end();await new Promise(r=>ff.on('close',r))}
await browser.close();server.close();console.log('done');
