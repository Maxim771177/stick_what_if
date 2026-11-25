import numpy as np, wave, subprocess, os
SR=44100; SPEED=1.2; DUR=31.4/SPEED+0.2
N=int(DUR*SR); rng=np.random.default_rng(3)
def T(t): return int(t/SPEED*SR)         # время оригинала -> отсчёт
def put(buf,t,x,g=1.0):
    i=T(t); j=min(N,i+len(x)); 
    if i<N: buf[i:j]+=x[:j-i]*g
def env(n,a=.003,d=4.0): t=np.arange(n)/SR; return np.minimum(1,t/a)*np.exp(-t*d)
def tone(f,dur,wave_='sin',d=6): n=int(dur*SR); t=np.arange(n)/SR; w=np.sin(2*np.pi*f*t) if wave_=='sin' else 2*np.abs(2*((f*t)%1)-1)-1; return w*env(n,.004,d)
def pop(): n=int(.12*SR); t=np.arange(n)/SR; f=900*np.exp(-t*25)+250; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*30)
def tick(f): return tone(f,.05,'sin',60)
def whoosh(dur,up=True):
    n=int(dur*SR); x=rng.standard_normal(n); k=np.linspace(0,1,n); 
    from numpy.fft import rfft,irfft
    y=np.zeros(n); 
    # простой полосовой свип: скользящее среднее разной длины
    c=np.cumsum(x); out=np.zeros(n)
    for L,wt in [(4,.5),(12,.35),(40,.25)]:
        out+= (c-np.concatenate([np.zeros(L),c[:-L]]))/L*wt
    e=np.sin(np.pi*k)**1.6; return out*e*3.0
def thump(big=1.0):
    n=int(.7*SR); t=np.arange(n)/SR; f=95*np.exp(-t*7)+38; b=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*6)
    nz=rng.standard_normal(n)*np.exp(-t*28)*.5; return (b*1.2+nz)*big
def ding(f): return (tone(f,.5,'sin',7)+.4*tone(f*2.01,.5,'sin',9))
sfx=np.zeros(N)
for t in (0.05,1.58,28.32,29.96,24.4,24.2,20.45): put(sfx,t,pop(),.55)
for t in (11.76,11.88,12.32,12.66,12.84,13.7): put(sfx,t,pop(),.3)
put(sfx,6.15,whoosh(.75),.55); put(sfx,29.9,whoosh(.45),.4); put(sfx,15.1,whoosh(.4),.25); put(sfx,20.8,whoosh(.5),.25); put(sfx,26.0,whoosh(.5),.25)
put(sfx,8.5,ding(1318),.45); put(sfx,8.5,ding(1976),.25)
put(sfx,17.3,thump(1),1.0); put(sfx,22.5,thump(1.5),1.0)
for a,b in ((17.6,20.4),(22.7,24.3)):
    k=np.arange(a,b,.075)
    for i,t in enumerate(k): put(sfx,t,tick(600+900*i/len(k)),.28)
# шаги
for a,b in ((15.2,16.5),(20.9,22.2),(27.1,28.5)):
    for t in np.arange(a,b,.33): put(sfx,t,(rng.standard_normal(int(.05*SR))*np.exp(-np.arange(int(.05*SR))/SR*80)),.25)
# музыка: маримба-подобный риф + мягкий кик + шейкер
bpm=118; beat=60/bpm*SPEED   # в секундах «выходного» времени
mus=np.zeros(N); chords=[(261.6,329.6,392),(220,261.6,329.6),(174.6,220,261.6),(196,246.9,293.7)]
step=beat/2; t_out=0.0; k=0
while t_out<DUR:
    ch=chords[(k//8)%4]; note=ch[[0,1,2,1,0,2,1,2][k%8]]*(2 if k%8 in (2,5) else 1)
    a1=tone(note,.35,'sin',8);a2=tone(note*3,.2,'sin',18);x=a1*.8;x[:len(a2)]+=a2*.15; i=int(t_out*SR); j=min(N,i+len(x)); mus[i:j]+=x[:j-i]*.5
    if k%2==0: 
        n=int(.25*SR); t=np.arange(n)/SR; kick=np.sin(2*np.pi*np.cumsum(70*np.exp(-t*14)+45)/SR)*np.exp(-t*12); m_=min(n,N-i); mus[i:i+m_]+=kick[:m_]*.55
    nz=rng.standard_normal(int(.04*SR))*np.exp(-np.arange(int(.04*SR))/SR*90)*.12; mus[i:i+len(nz)]+=nz[:max(0,min(len(nz),N-i))]
    t_out+=step; k+=1
mus*=np.minimum(1,np.arange(N)/SR/1.0)*np.minimum(1,(N-np.arange(N))/SR/1.0)
def wr(name,x):
    x=np.clip(x,-1,1); w=wave.open(name,'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x*32767).astype('<i2').tobytes()); w.close()
wr('sfx.wav',sfx*.8); wr('music.wav',mus*.26)
print('audio ok',DUR)
