# Звук ролика 12: SFX по данным сцены.json (поп текстов, удары, тики таймера, шторм) + простая музыка. Время уже итоговое.
import numpy as np, wave, json, sys, os
D=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','сцены.json')))
SR=44100; DUR=D['duration']+0.2; N=int(DUR*SR); rng=np.random.default_rng(5)
def put(buf,t,x,g=1.0):
    i=int(t*SR); j=min(N,i+len(x))
    if 0<=i<N: buf[i:j]+=x[:j-i]*g
def env(n,a=.003,d=4.0): t=np.arange(n)/SR; return np.minimum(1,t/a)*np.exp(-t*d)
def tone(f,dur,d=6): n=int(dur*SR); t=np.arange(n)/SR; return np.sin(2*np.pi*f*t)*env(n,.004,d)
def pop(): n=int(.12*SR); t=np.arange(n)/SR; f=900*np.exp(-t*25)+250; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*30)
def tick(f): return tone(f,.05,60)
def whoosh(dur):
    n=int(dur*SR); x=rng.standard_normal(n); c=np.cumsum(x); out=np.zeros(n)
    for L,wt in [(4,.5),(12,.35),(40,.25)]: out+=(c-np.concatenate([np.zeros(L),c[:-L]]))/L*wt
    return out*np.sin(np.pi*np.linspace(0,1,n))**1.6*3.0
def thump(big=1.0):
    n=int(.7*SR); t=np.arange(n)/SR; f=95*np.exp(-t*7)+38; b=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*6)
    return (b*1.2+rng.standard_normal(n)*np.exp(-t*28)*.5)*big
def ding(f): return tone(f,.5,7)+.4*tone(f*2.01,.5,9)
sfx=np.zeros(N)
for s in D['scenes']:
    put(sfx,s['start'],whoosh(.35),.22)
    for t in s['texts']:
        k=t['k']
        if k=='boom': put(sfx,t['t'],thump(.8),.9)
        elif k in('cap','plate','card'): put(sfx,t['t'],pop(),.4)
        elif k=='hud':
            put(sfx,t['t'],ding(1318),.35)
            for i in range(8): put(sfx,t['t']+.1+i*.07,tick(700+90*i),.2)
        elif k=='say': put(sfx,t['t'],pop(),.18)
    if s['place'] in ('CAMP_N','ROCKS_N','CAMPN'):
        n=int((s['end']-s['start'])*SR); r=rng.standard_normal(n); r=(np.cumsum(r)-np.concatenate([np.zeros(6),np.cumsum(r)[:-6]]))/6; put(sfx,s['start'],r*.05)
    if s['place'] in ('BEACH','BOYCAMP','TIDEL','DAWN','CHAN','BOAT'):
        n=int((s['end']-s['start'])*SR); tt=np.arange(n)/SR; r=rng.standard_normal(n)*(.5+.5*np.sin(tt*1.3)); r=(np.cumsum(r)-np.concatenate([np.zeros(40),np.cumsum(r)[:-40]]))/40; put(sfx,s['start'],r*.05)
bpm=104; beat=60/bpm; mus=np.zeros(N); chords=[(261.6,329.6,392),(220,261.6,329.6),(174.6,220,261.6),(196,246.9,293.7)]
t=0.0;k=0;step=beat/2
while t<DUR:
    ch=chords[(k//8)%4]; note=ch[[0,1,2,1,0,2,1,2][k%8]]*(2 if k%8 in(2,5) else 1); x=tone(note,.35,8)*.8; i=int(t*SR); j=min(N,i+len(x)); mus[i:j]+=x[:j-i]*.4
    if k%2==0:
        n=int(.25*SR); tt=np.arange(n)/SR; kick=np.sin(2*np.pi*np.cumsum(70*np.exp(-tt*14)+45)/SR)*np.exp(-tt*12); m=min(n,N-i); mus[i:i+m]+=kick[:m]*.4
    t+=step;k+=1
mus*=np.minimum(1,np.arange(N)/SR/2)*np.minimum(1,(N-np.arange(N))/SR/2)
def wr(name,x):
    x=np.clip(x,-1,1); w=wave.open(name,'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x*32767).astype('<i2').tobytes()); w.close()
out=sys.argv[1] if len(sys.argv)>1 else '.'
wr(os.path.join(out,'sfx.wav'),sfx*.8); wr(os.path.join(out,'music.wav'),mus*.18); print('audio ok',DUR)
