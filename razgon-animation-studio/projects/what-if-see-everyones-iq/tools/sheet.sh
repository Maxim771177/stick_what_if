#!/bin/bash
# bash projects/what-if-see-everyones-iq/tools/sheet.sh 1-21 [0.5,0.9]  (из razgon-animation-studio)
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
perl -e 'alarm 900; exec @ARGV' node render.mjs --project projects/what-if-see-everyones-iq --sheet --range ${1:-1-21} --phases ${2:-0.5} --chrome "$CH" 2>&1 | grep -v "^\[page\] SHOT" | tail -${3:-15}
