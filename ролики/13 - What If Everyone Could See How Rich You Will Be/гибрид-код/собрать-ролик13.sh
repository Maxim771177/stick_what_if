#!/bin/bash
# Рендер ролика 13 частями на Mac + звук + склейка.  bash собрать-ролик13.sh <папка-вывода>
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; OUT="$(mkdir -p "$1" && cd "$1" && pwd)"; VOICE="$HERE/../озвучка.mp3"
export CHROME_PATH="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
cd "$HERE"
TOTAL=$(node -e "const d=require('../сцены.json');console.log(d.duration/1.2+2.5)")
PART=60; S=0; : > "$OUT/list.txt"
while python3 -c "import sys;sys.exit(0 if $S<$TOTAL else 1)"; do
  E2=$(python3 -c "print(min($S+$PART,$TOTAL))")
  if [ ! -f "$OUT/silent_${S}-${E2}.mp4" ]; then node render13.mjs --video --from $S --to $E2 --out "$OUT"; fi
  echo "file 'silent_${S}-${E2}.mp4'" >> "$OUT/list.txt"; S=$E2
done
cd "$OUT"; ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy silent.mp4
python3 "$HERE/audio13.py"
ffmpeg -y -loglevel error -i "$VOICE" -af "atempo=1.2,apad=pad_dur=3" voice.wav
ffmpeg -y -loglevel error -i silent.mp4 -i voice.wav -i sfx.wav -i music.wav \
 -filter_complex "[1:a]volume=1.0[v];[2:a]volume=0.9[s];[3:a]volume=1.0[m];[v][s][m]amix=inputs=3:normalize=0,loudnorm=I=-16:TP=-1.5[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "ролик-13.mp4"
echo "Готово: $OUT/ролик-13.mp4"
