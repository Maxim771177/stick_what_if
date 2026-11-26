# -*- coding: utf-8 -*-
"""Тайминги слов ролика 13: faster-whisper small.en + выравнивание по сценарий.txt -> тайминги-слов.json"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', 'razgon-animation-studio', 'tools'))
from transcribe import align_script
from faster_whisper import WhisperModel
m = WhisperModel('small.en', device='cpu', compute_type='int8')
import subprocess, numpy as np
raw = subprocess.check_output(['ffmpeg','-v','error','-i',os.path.join(HERE,'озвучка.mp3'),'-f','f32le','-ac','1','-ar','16000','-'])
audio = np.frombuffer(raw, dtype=np.float32)
segs, _ = m.transcribe(audio, word_timestamps=True, language='en')
ww = [{'word': w.word.strip(), 'start': w.start, 'end': w.end} for s in segs for w in s.words]
words = align_script(open(os.path.join(HERE, 'сценарий.txt'), encoding='utf-8').read(), ww)
json.dump({'source': 'whisper:small.en+script', 'words': words}, open(os.path.join(HERE, 'тайминги-слов.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(len(words), words[-1])
