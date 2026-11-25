import { createRequire } from 'module';
import { spawn } from 'child_process';
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const require = createRequire('/Users/maksim/stick_what_if/razgon-animation-studio/package.json');
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2); const get=(k,d)=>{const i=args.indexOf(k);return i<0?d:args[i+1]};
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({ executablePath: chrome, args:['--disable-gpu-vsync'] });
const page = await browser.newPage({ viewport:{width:1920,height:1080} });
page.on('pageerror', e=>console.log('PAGEERROR', e.message)); page.on('console', m=>{ if(m.type()==='error') console.log('CONSOLE', m.text()) });
await page.goto('file://'+path.join(here,'scene.html')); await page.evaluate(()=>window.fontsReady);
const grab = async (t)=>{ await page.evaluate(t=>window.draw(t), t); const d = await page.evaluate(()=>document.getElementById('c').toDataURL('image/jpeg',0.93)); return Buffer.from(d.split(',')[1],'base64'); };
if (get('--stills')) { const out=get('--out', path.join(here,'stills')); fs.mkdirSync(out,{recursive:true});
  for (const s of get('--stills').split(',')) { fs.writeFileSync(path.join(out,`t${s}.jpg`), await grab(parseFloat(s)/1.2)); } }
else { const dur = parseFloat(get('--dur', (31.4/1.2).toFixed(3))); const fps=60; const n=Math.round(dur*fps);
  const ff = spawn('ffmpeg',['-y','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p',path.join(here,'video-silent.mp4')],{stdio:['pipe','inherit','inherit']});
  for (let i=0;i<n;i++){ const b=await grab(i/fps); if(!ff.stdin.write(b)) await new Promise(r=>ff.stdin.once('drain',r)); if(i%60===0) console.log('frame',i,'/',n); }
  ff.stdin.end(); await new Promise(r=>ff.on('close',r)); }
await browser.close(); console.log('done');
