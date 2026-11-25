#!/bin/bash
# Полный рендер ролика 12 на Mac: bash собрать.sh [fps]  → ролики/12 …/гибрид-код/out/ролик-12.mp4
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; ROL="$(dirname "$HERE")"; OUT="$HERE/out"; FPS="${1:-30}"
export CHROME_PATH="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
cd "$HERE"; mkdir -p "$OUT"
node render.mjs --video --fps "$FPS" --out "$OUT" --name silent.mp4
python3 audio.py "$OUT"
ffmpeg -y -loglevel error -i "$ROL/озвучка.mp3" -af "atempo=1.2,apad=pad_dur=4" "$OUT/voice.wav"
ffmpeg -y -loglevel error -i "$OUT/silent.mp4" -i "$OUT/voice.wav" -i "$OUT/sfx.wav" -i "$OUT/music.wav" \
 -filter_complex "[1:a]volume=1.0[v];[2:a]volume=0.9[s];[3:a]volume=1.0[m];[v][s][m]amix=inputs=3:normalize=0,loudnorm=I=-16:TP=-1.5[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "$OUT/ролик-12.mp4"
echo "Готово: $OUT/ролик-12.mp4"
