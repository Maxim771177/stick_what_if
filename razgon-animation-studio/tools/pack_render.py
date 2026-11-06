"""tools/pack_render.py — package a finished project so the user renders it on their own computer.

  python tools/pack_render.py --project projects/<slug> [--resolution 1080p] [--lang ru|en] [--out <zip>]

Writes out/render-kit-<slug>.zip (a few MB) with the studio (without node_modules), this project (scenes, story,
timeline, assets, voiceover, music/SFX inputs) and one-click scripts:
  RENDER-Windows.bat     double-click on Windows 10/11 (installs Node.js, ffmpeg, Python with winget if missing)
  RENDER-Mac.command     macOS: run with `bash RENDER-Mac.command` in Terminal (Gatekeeper blocks double-clicking downloaded scripts)
  render-linux.sh        bash render-linux.sh
Each script installs what is missing, measures the machine (--bench, prints the ETA), renders, mixes the sound and opens
the folder with the finished MP4. The user's computer uses its GPU for drawing when it has one.
"""
import argparse, json, os, shutil, stat, sys, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser(); ap.add_argument("--project", required=True); ap.add_argument("--resolution"); ap.add_argument("--lang", default="en"); ap.add_argument("--out")
a = ap.parse_args()
P = os.path.abspath(a.project); slug = os.path.basename(P.rstrip("/\\"))
cfg = json.load(open(os.path.join(P, "config.json"), encoding="utf-8"))
if a.resolution: cfg["resolution"] = a.resolution
SKIP = {"node_modules", "build", "out", "projects", "__pycache__", ".git"}
SKIP_PROJECT = {"build", "out", "__pycache__"}
shots_dir = os.path.join(P, "scenes", "shots")
if not (os.path.isdir(shots_dir) and os.listdir(shots_dir)): print("WARNING: the project has no scenes/shots yet")
voice = os.path.join(P, cfg.get("voiceover", "input/voiceover.mp3"))
if not os.path.exists(voice): print(f"WARNING: voiceover not found: {voice}")

T = {
 "en": {"title": "Razgon Animation Studio — render on this computer", "need": "Missing", "restart": "Installed. Close this window and run the script again so the new programs are found.",
        "deps": "Installing studio packages (first run only, a few minutes)…", "bench": "Measuring this computer…", "render": "Rendering the video (you can keep working; don't let the computer sleep)…",
        "mix": "Mixing sound…", "done": "Done! The video is in", "fail": "Something went wrong. Send a screenshot of this window to Claude.",
        "readme": """How to render "{title}" on your computer

1. Unzip this archive into a folder whose path has no special characters (e.g. Documents\\render).
2. Windows: double-click RENDER-Windows.bat. If Windows shows "Windows protected your PC", click "More info" -> "Run anyway".
   Mac: open Terminal (Cmd+Space, type Terminal), type  bash  and a space, drag RENDER-Mac.command into the window, press Enter.
   (Double-clicking is blocked by macOS for scripts from the internet: "Apple could not verify…". Running it with bash avoids that.)
   Linux: bash render-linux.sh
3. The first run installs Node.js, ffmpeg and Python if they are missing (Windows: winget, Mac: Homebrew) and the studio packages
   (~600 MB, once). If the script asks you to run it again after installing, close the window and double-click it again.
4. It measures the computer, prints how long the render will take, renders, mixes the sound and opens the folder with the MP4:
   studio/projects/{slug}/out/
Keep the computer awake and plugged in while it renders. Nothing is uploaded anywhere.
"""},
 "ru": {"title": "Razgon Animation Studio — рендер на этом компьютере", "need": "Не хватает", "restart": "Установлено. Закрой это окно и запусти скрипт ещё раз, чтобы новые программы подхватились.",
        "deps": "Ставлю пакеты студии (только в первый раз, несколько минут)…", "bench": "Замеряю скорость компьютера…", "render": "Рендерю видео (можно работать дальше, только не давай компьютеру уснуть)…",
        "mix": "Свожу звук…", "done": "Готово! Видео лежит в", "fail": "Что-то пошло не так. Пришли скриншот этого окна Claude.",
        "readme": """Как отрендерить «{title}» на своём компьютере

1. Распакуй архив в папку без спецсимволов в пути (например Документы\\render).
2. Windows: дважды кликни RENDER-Windows.bat. Если Windows пишет «Система Windows защитила ваш компьютер», нажми «Подробнее» -> «Выполнить в любом случае».
   Mac: открой Терминал (Cmd+Пробел, набери «Терминал»), напиши  bash  и пробел, перетащи в окно файл RENDER-Mac.command, нажми Enter.
   (Двойной клик macOS блокирует для скриптов из интернета: «Apple не удалось подтвердить…». Через bash этой проверки нет.)
   Linux: bash render-linux.sh
3. При первом запуске скрипт сам поставит Node.js, ffmpeg и Python, если их нет (Windows: winget, Mac: Homebrew), и пакеты студии
   (~600 МБ, один раз). Если после установки он попросит запустить его снова, закрой окно и запусти ещё раз.
4. Дальше он замерит компьютер, напишет, сколько займёт рендер, отрендерит, сведёт звук и откроет папку с MP4:
   studio/projects/{slug}/out/
Пока идёт рендер, держи компьютер включённым и на зарядке. Ничего никуда не загружается.
"""}}[a.lang if a.lang in ("en", "ru") else "en"]

BAT = r"""@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0studio"
title Razgon render
echo === {title} ===
set RESTART=0
where winget >nul 2>nul && goto tools
where node >nul 2>nul && where ffmpeg >nul 2>nul && where py >nul 2>nul && goto tools
echo {need}: winget. Node.js: https://nodejs.org   ffmpeg: https://www.gyan.dev/ffmpeg/builds/   Python: https://www.python.org/downloads/
pause
exit /b 1
:tools
where node >nul 2>nul || (echo {need}: Node.js & winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements & set RESTART=1)
where ffmpeg >nul 2>nul || (echo {need}: ffmpeg & winget install -e --id Gyan.FFmpeg --accept-source-agreements --accept-package-agreements & set RESTART=1)
set PY=
where py >nul 2>nul && set PY=py -3
if not defined PY (where python >nul 2>nul && python -c "import sys; sys.exit(0 if sys.version_info>=(3,9) else 1)" >nul 2>nul && set PY=python)
if not defined PY (echo {need}: Python & winget install -e --id Python.Python.3.12 --accept-source-agreements --accept-package-agreements & set RESTART=1)
if "%RESTART%"=="1" (echo. & echo {restart} & pause & exit /b 0)
if not exist node_modules\playwright (
  echo {deps}
  call npm install --no-audit --no-fund || goto fail
  call npx playwright install chromium || (if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (echo Using installed Google Chrome) else goto fail)
  %PY% -m pip install --user numpy scipy pillow || goto fail
)
if not defined CHROME_PATH (node -e "const p=require('playwright');process.exit(require('fs').existsSync(p.chromium.executablePath())?0:1)" 2>nul || (if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME_PATH=%ProgramFiles%\Google\Chrome\Application\chrome.exe"))
echo {bench}
node render.mjs --project "projects\{slug}" --bench --frames 24 || goto fail
echo {render}
node render.mjs --project "projects\{slug}" || goto fail
echo {mix}
%PY% audio\mix.py --project "projects\{slug}" || goto fail
echo.
echo {done} studio\projects\{slug}\out
explorer "projects\{slug}\out"
pause
exit /b 0
:fail
echo.
echo {fail}
pause
exit /b 1
"""
SH = r"""#!/bin/bash
cd "$(dirname "$0")/studio" || exit 1
echo "=== {title} ==="
fail() { echo; echo "{fail}"; read -r -p "Enter..." _; exit 1; }
if [ "$(uname)" = "Darwin" ]; then
  if ! command -v brew >/dev/null 2>&1; then
    for b in /opt/homebrew/bin/brew /usr/local/bin/brew; do [ -x "$b" ] && eval "$("$b" shellenv)"; done
  fi
  need=""
  command -v node >/dev/null 2>&1 || need="$need node"
  command -v ffmpeg >/dev/null 2>&1 || need="$need ffmpeg"
  command -v python3 >/dev/null 2>&1 || need="$need python"
  if [ -n "$need" ]; then
    echo "{need}:$need"
    if ! command -v brew >/dev/null 2>&1; then
      echo "Homebrew: https://brew.sh"
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || fail
      for b in /opt/homebrew/bin/brew /usr/local/bin/brew; do [ -x "$b" ] && eval "$("$b" shellenv)"; done
    fi
    brew install $need || fail
  fi
else
  for c in node ffmpeg python3; do command -v $c >/dev/null 2>&1 || { echo "{need}: $c  (sudo apt-get install -y nodejs ffmpeg python3 python3-pip)"; fail; }; done
fi
if [ ! -d node_modules/playwright ]; then
  echo "{deps}"
  npm install --no-audit --no-fund || fail
  npx playwright install chromium || [ -n "$CHROME_PATH" ] || [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ] || fail
  python3 -m pip install --user numpy scipy pillow 2>/dev/null || python3 -m pip install --user --break-system-packages numpy scipy pillow || fail
fi
if [ -z "$CHROME_PATH" ] && ! node -e "const p=require('playwright');process.exit(require('fs').existsSync(p.chromium.executablePath())?0:1)" 2>/dev/null; then
  [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ] && export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
fi
echo "{bench}"; node render.mjs --project "projects/{slug}" --bench --frames 24 || fail
echo "{render}"; node render.mjs --project "projects/{slug}" || fail
echo "{mix}"; python3 audio/mix.py --project "projects/{slug}" || fail
echo; echo "{done} studio/projects/{slug}/out"
if [ "$(uname)" = "Darwin" ]; then open "projects/{slug}/out"; else xdg-open "projects/{slug}/out" 2>/dev/null; fi
read -r -p "Enter..." _
"""
def fill(s, bat=False):
    esc = (lambda v: v.replace("(", "^(").replace(")", "^)")) if bat else (lambda v: v.replace('"', "'"))
    for k in ("title", "need", "restart", "deps", "bench", "render", "mix", "done", "fail"): s = s.replace("{" + k + "}", esc(T[k]))
    return s.replace("{slug}", slug)

out = a.out or os.path.join(P, "out", f"render-kit-{slug}.zip"); os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
def add_tree(z, src, dst, skip):
    for d, ds, fs in os.walk(src):
        ds[:] = [x for x in ds if x not in skip]
        for f in fs:
            if f.endswith(".pyc") or (d == src and f in skip): continue
            p = os.path.join(d, f); z.write(p, os.path.join(dst, os.path.relpath(p, src)).replace(os.sep, "/"))
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    add_tree(z, ROOT, "studio", SKIP | {"examples"})
    add_tree(z, P, f"studio/projects/{slug}", SKIP_PROJECT | {"config.json"})
    z.writestr(f"studio/projects/{slug}/config.json", json.dumps(cfg, ensure_ascii=False, indent=1))
    z.writestr("RENDER-Windows.bat", fill(BAT, bat=True).replace("\n", "\r\n"))
    for name in ("RENDER-Mac.command", "render-linux.sh"):
        info = zipfile.ZipInfo(name); info.external_attr = (stat.S_IFREG | 0o755) << 16; info.compress_type = zipfile.ZIP_DEFLATED
        z.writestr(info, fill(SH))
    z.writestr("README.txt" if a.lang != "ru" else "ПРОЧТИ.txt", T["readme"].format(title=cfg.get("title", slug), slug=slug).replace("\n", "\r\n"))
mb = os.path.getsize(out) / 1e6
print(f"wrote {out}  ({mb:.1f} MB, resolution {cfg.get('resolution')}, {cfg.get('aspect')})")
