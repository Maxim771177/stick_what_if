#!/bin/bash
# Сборка гибрида (Razgon-герои + динамика vizavi). Запуск из корня репозитория:
#   bash скилы/hybrid-razgon-vizavi/шаблон/собрать.sh <папка-вывода> <озвучка.mp3> [razgon|vizavi] [stills]
# razgon  — движение героев Razgon (утверждено 25.11.2026, по умолчанию)
# vizavi  — движение из скилла vizavi (для сравнения)
# stills  — вместо видео сделать стоп-кадры в <папка-вывода>/stills-<motion> (для самопроверки)
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; OUT="$(mkdir -p "$1" && cd "$1" && pwd)"; VOICE="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"; MOTION="${3:-razgon}"
export CHROME_PATH="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
cd "$HERE"
if [ "$4" = "stills" ]; then node render.mjs --motion "$MOTION" --out "$OUT" --stills 2,6,11.5,14.5,16.5,17.4,19,22.6,25,28,30.5; exit 0; fi
node render.mjs --motion "$MOTION" --out "$OUT"
cd "$OUT"; python3 "$HERE/audio.py"
ffmpeg -y -loglevel error -t 31.4 -i "$VOICE" -af "atempo=1.2,apad=pad_dur=0.5" voice.wav
ffmpeg -y -loglevel error -i "silent-$MOTION.mp4" -i voice.wav -i sfx.wav -i music.wav \
 -filter_complex "[1:a]volume=1.0[v];[2:a]volume=0.9[s];[3:a]volume=1.0[m];[v][s][m]amix=inputs=3:normalize=0,loudnorm=I=-16:TP=-1.5[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "гибрид-$MOTION.mp4"
rm -f voice.wav sfx.wav music.wav "silent-$MOTION.mp4"; echo "Готово: $OUT/гибрид-$MOTION.mp4"
