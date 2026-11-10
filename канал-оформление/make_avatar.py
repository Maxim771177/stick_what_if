# Аватар канала: настоящий Leon с эталона (персонажи/варианты-героя), вырезка, подмигивание, фон-вспышка.
import numpy as np, math, sys
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi
REF='персонажи/варианты-героя/эталон-мальчик-кепка-молния.png'
def cutout(box, drop_border=False):
    im=Image.open(REF).convert('RGB').crop(box); a=np.array(im).astype(int)
    white=(a.min(axis=2)>232)
    lab,n=ndi.label(white); edge=set(lab[0,:])|set(lab[-1,:])|set(lab[:,0])|set(lab[:,-1]); edge.discard(0)
    bgm=np.isin(lab,list(edge))
    alpha=(~bgm).astype(float)
    if drop_border:
        fl,fn=ndi.label(alpha>0.5); bad=set(fl[0,:])|set(fl[-1,:])|set(fl[:,0])|set(fl[:,-1]); bad.discard(0)
        alpha[np.isin(fl,list(bad))]=0
    alpha=ndi.binary_closing(np.pad(alpha>0.5,4),iterations=2)[4:-4,4:-4].astype(float)
    al=Image.fromarray((alpha*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.2))
    out=im.convert('RGBA'); out.putalpha(al); return out
def wink(im):
    d=ImageDraw.Draw(im,'RGBA')
    d.ellipse((418,300,492,384),fill=(255,255,255,255))            # стереть правый глаз
    # глаз-дуга (подмигивание) в стиле эталона
    d.arc((414,318,494,392),205,335,fill=(17,17,17,255),width=15)
    # широкая улыбка с открытым ртом
    d.rectangle((300,405,450,490),fill=(255,255,255,255))
    d.pieslice((318,378,436,490),0,180,fill=(122,31,31,255),outline=(17,17,17,255),width=10)
    d.chord((340,445,414,486),180,360,fill=(255,154,168,255))
    d.arc((318,378,436,490),0,180,fill=(17,17,17,255),width=10)
    d.line((318,434,436,434),fill=(17,17,17,255),width=9)
    return im
def sticker(fig, outline=16):
    a=np.array(fig.split()[3])>127
    big=ndi.binary_dilation(a,iterations=outline)
    base=Image.new('RGBA',fig.size,(255,255,255,0)); m=Image.fromarray((big*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.5))
    base.paste((255,255,255,255),mask=m); base.alpha_composite(fig); return base
def burst(S,c1,c2,rays=(255,255,255,40)):
    bg=Image.new('RGBA',(S,S)); px=bg.load()
    for y in range(S):
        for x in range(S):
            r=math.hypot(x-S/2,y-S*0.45)/(S*0.72); t=min(1,r)
            px[x,y]=tuple(int(c1[i]*(1-t)+c2[i]*t) for i in range(3))+(255,)
    ov=Image.new('RGBA',(S,S)); d=ImageDraw.Draw(ov); cx,cy=S/2,S*0.45; n=16
    for i in range(n):
        a0=2*math.pi*i/n; a1=a0+math.pi/n
        d.polygon([(cx,cy),(cx+S*math.cos(a0),cy+S*math.sin(a0)),(cx+S*math.cos(a1),cy+S*math.sin(a1))],fill=rays)
    bg.alpha_composite(ov); return bg
def star(d,x,y,r,fill):
    pts=[(x+(r if i%2==0 else r*0.42)*math.sin(i*math.pi/4)*1,y-(r if i%2==0 else r*0.42)*math.cos(i*math.pi/4)) for i in range(8)]
    d.polygon(pts,fill=fill)
def make(out,box,do_wink,S=800):
    fig=cutout(box)
    if do_wink: fig=wink(fig)
    fig=sticker(fig)
    bg=burst(S,(255,214,64),(255,98,92))
    k=0.90*S/fig.width; fig=fig.resize((int(fig.width*k),int(fig.height*k)),Image.LANCZOS)
    bg.alpha_composite(fig,(int((S-fig.width)/2),int(S*0.09)))
    d=ImageDraw.Draw(bg,'RGBA'); star(d,S*0.86,S*0.15,38,(255,255,255,235)); star(d,S*0.12,S*0.17,24,(255,255,255,210)); star(d,S*0.93,S*0.42,18,(255,255,255,190))
    bg.convert('RGB').save(out)

def banner_full(bg_path,out):
    """Баннер: фон-коллаж + Leon в разных эмоциях (вырезки из эталона) + главный Leon подмигивает."""
    b=Image.open(bg_path).convert('RGBA')
    boxes={'happy':(1370,120,2070,720),'surprised':(1975,120,2688,720),'worried':(1370,760,2070,1380),'determined':(1975,760,2688,1380)}
    def put(name,cx,cy,h,rot=0):
        f=sticker(cutout(boxes[name],True),10); f=f.crop(f.getbbox()); k=h/f.height; f=f.resize((int(f.width*k),h),Image.LANCZOS)
        if rot: f=f.rotate(rot,expand=True,resample=Image.BICUBIC)
        sh=Image.new('RGBA',b.size,(0,0,0,0)); sh.paste((0,0,0,90),(int(cx-f.width/2)+10,int(cy-f.height/2)+14),f.split()[3]); sh=sh.filter(ImageFilter.GaussianBlur(8)); b.alpha_composite(sh)
        b.alpha_composite(f,(int(cx-f.width/2),int(cy-f.height/2)))
    put('surprised',215,470,170,-6); put('worried',2285,462,170,5); put('determined',2120,1040,190,-5); put('happy',930,1160,200,6)
    fig=sticker(wink(cutout((60,40,700,740))),14)
    H=412; k=H/fig.height; fig=fig.resize((int(fig.width*k),int(fig.height*k)),Image.LANCZOS); x=1862-fig.width//2; y=931-H+2
    gl=Image.new('RGBA',b.size,(0,0,0,0)); ImageDraw.Draw(gl).ellipse((x-60,y-40,x+fig.width+60,y+H+40),fill=(255,214,64,90)); gl=gl.filter(ImageFilter.GaussianBlur(60)); b.alpha_composite(gl)
    b.alpha_composite(fig,(x,y)); b.convert('RGB').save(out)

if __name__=='__main__':
    make('канал-оформление/logo.png',(60,40,700,740),True)
    if len(sys.argv)>2: banner_full(sys.argv[1],sys.argv[2])
