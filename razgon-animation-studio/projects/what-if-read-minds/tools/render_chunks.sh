#!/bin/bash
# ВАЖНО: только один поток (lanes=1): параллельные процессы пишут в общую build/parts и портят куски.
# Рендер ролика кусками по 15 с (на этом Mac многопоточный прогон зависает). Запуск из razgon-animation-studio:
#   bash projects/what-if-read-minds/tools/render_chunks.sh <lane 0|1> <lanes> [scale]
P=projects/what-if-read-minds; LANE=$1; LANES=${2:-1}; SCALE=${3:-0.5}
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p $P/out/full
i=0
for f in $(seq 0 15 480); do
  if [ $((i % LANES)) -eq $LANE ]; then
    t=$((f+15)); [ $t -gt 495 ] && t=494.5
    for try in 1 2 3 4; do
      [ -f $P/out/full/c_$(printf %03d $f).mp4 ] && break
      perl -e 'alarm 200; exec @ARGV' node render.mjs --project $P --from $f --to $t --scale $SCALE --workers 1 --out $P/out/full/tmp_$LANE.mp4 --chrome "$CH" > $P/out/full/log_$LANE.txt 2>&1 && mv $P/out/full/tmp_$LANE.mp4 $P/out/full/c_$(printf %03d $f).mp4
    done
  fi
  i=$((i+1))
done
echo lane $LANE done
