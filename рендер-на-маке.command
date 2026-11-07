#!/bin/bash
# Один раз запускаешь, потом каждый раз то же самое: скрипт забирает свежие файлы с GitHub, рендерит ролик на этом Mac и кладёт mp4 на Рабочий стол.
# Запуск: открыть Терминал, набрать "bash " (с пробелом), перетащить этот файл в окно, Enter.
# Ролик по умолчанию 01. Другой номер: bash <файл> "ролики/02 - ..."
set -e
REPO="https://github.com/maxim771177/stick_what_if.git"
BRANCH="${BRANCH:-claude/gracious-allen-mk1xq2}"
DIR="$HOME/stick_what_if"
ROLIK="${1:-ролики/01 - What If You Had 9999 IQ}"
SLUG="what-if-9999-iq"

echo "== 1/5 Программы (один раз) =="
if ! command -v brew >/dev/null; then echo "Нужен Homebrew: https://brew.sh (установи и запусти скрипт снова)"; exit 1; fi
for p in git node ffmpeg python@3.12; do brew list "$p" >/dev/null 2>&1 || brew install "$p"; done

echo "== 2/5 Свежие файлы с GitHub =="
if [ -d "$DIR/.git" ]; then git -C "$DIR" fetch origin "$BRANCH" && git -C "$DIR" checkout "$BRANCH" && git -C "$DIR" reset --hard "origin/$BRANCH"; else git clone --branch "$BRANCH" "$REPO" "$DIR"; fi
cd "$DIR/razgon-animation-studio"
mkdir -p "projects/$SLUG/input"
cp "$DIR/$ROLIK/озвучка.mp3" "projects/$SLUG/input/voiceover.mp3"

echo "== 3/5 Пакеты (один раз) =="
npm install --no-audit --no-fund
npx playwright install chromium
python3 -m pip install --quiet --break-system-packages numpy scipy pillow 2>/dev/null || python3 -m pip install --quiet numpy scipy pillow

echo "== 4/5 Рендер видео (это долго, окно не закрывай) =="
node render.mjs --project "projects/$SLUG" --format jpeg

echo "== 5/5 Звук и сборка =="
python3 audio/mix.py --project "projects/$SLUG"
OUT=$(ls -t "projects/$SLUG"/out/*.mp4 | head -1)
cp "$OUT" "$HOME/Desktop/"
echo "Готово: $HOME/Desktop/$(basename "$OUT")"
open "$HOME/Desktop"
