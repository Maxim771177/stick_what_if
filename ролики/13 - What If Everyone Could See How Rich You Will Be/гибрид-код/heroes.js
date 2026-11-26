// Герои ролика 13 (кодовые куклы Razgon). Один источник для сравнения и для сцен.
// Established (прошлые ролики): LEON, OWEN, CHASE, PARK, MOM, DAD, MAILMAN. Новые: TESS, NIA, JUNE, HALE, REPORTER, CAMERAMAN, LUNCHLADY, EIGHTH, остальная массовка.
export const LEON = { arcBrows: true, top: 'tshirt', color: '#d8232a', color2: '#ffffff', emblem: 'bolt', shorts: '#8a8a8a', shoes: '#f28a1e', sneakers: true, whiteHands: true, hair: 'none', hairColor: '#6b3a1e', hat: 'capBack', hatColor: '#17c3b2' };
export const OWEN = { top: 'hoodie', color: '#3fb950', hair: 'messy', hairColor: '#c8723a', face: 'glasses', kid: true, legs: '#3a4a6b' };
export const CHASE = { top: 'jersey', color: '#2f5db0', hair: 'short', hairColor: '#4a2f1e', kid: true, legs: '#2b3a6b', emblem: '7' };
export const PARK = { top: 'suit', color: '#6b4e9b', hair: 'bun', hairColor: '#2b2420', face: 'glasses', legs: '#4a3a6b' };
export const MOM = { top: 'dress', color: '#f29ac0', hair: 'ponytail', hairColor: '#6b3a1e' };
export const DAD = { top: 'tshirt', color: '#5a7fb0', hair: 'short', hairColor: '#3a2a1e', legs: '#4a5a78' };
export const MAILMAN = { top: 'uniform', color: '#2f5d8a', hat: 'capBack', hatColor: '#2f5d8a', hair: 'short', hairColor: '#4a2f1e', legs: '#2f4a6b' };
// новые одноклассницы (kid, как Owen и Chase), женские пропорции как у девочек ролика 12
export const TESS = { hips: 1.45, hairEnd: 1.72, kid: true, brows: 'worried', top: 'hoodie', color: '#f08a24', hair: 'braids', hairColor: '#8a5a2e', legs: '#3a4a6b', shoes: '#ffffff', whiteHands: true };
export const NIA = { hips: 1.45, hairEnd: 1.72, kid: true, cheeks: '#f59ab0', top: 'hoodie', color: '#9b6ad0', hair: 'afro', hairColor: '#2b2420', legs: '#3a3a48', shoes: '#f2c21a', whiteHands: true };
export const JUNE = { hips: 1.5, hairEnd: 1.72, kid: true, top: 'dress', color: '#19b3a6', hair: 'bob', hairColor: '#1b1b22', hat: 'headband', hatColor: '#f2c21a', hatLift: 0.16, shoes: '#ffffff', whiteHands: true };
// Mr. Hale: серый костюм, белая рубашка с красным галстуком, зачёсанные чёрные волосы, папка (prop 'folder')
export const HALE = { top: 'suit', color: '#8a8f98', shirtV: true, color2: '#d8232a', hair: 'short', hairColor: '#1f1f24', legs: '#6b7078', shoes: '#1b1b1f', whiteHands: true };
export const REPORTER = { top: 'suit', color: '#2f6fc0', shirtV: true, hair: 'bob', hairColor: '#e0b252', hips: 1.2, legs: '#2b3a55', shoes: '#9b1a20', whiteHands: true };
export const CAMERAMAN = { top: 'hoodie', color: '#3a3f4a', hat: 'beanie', hatColor: '#d8232a', hair: 'short', hairColor: '#2b2420', legs: '#2b2b33', beard: true };
export const LUNCHLADY = { top: 'dress', color: '#f4f6f8', hat: 'chef', hatColor: '#f4f6f8', hair: 'bun', hairColor: '#6b3a1e', cheeks: '#f59ab0', whiteHands: true };
export const EIGHTH = { top: 'hoodie', color: '#e4872b', hair: 'spiky', hairColor: '#2b2420', legs: '#3a3a48' };
// массовка класса/города: разные причёски и цвета, при реакции лицо «удивлён», глаза вверх
const KV = [['short', '#2b2420', 'tshirt', '#17a2b8'], ['curly', '#8a3a1e', 'hoodie', '#c0504d'], ['ponytail', '#e0c070', 'tshirt', '#8a6ab0'], ['spiky', '#6b3a1e', 'hoodie', '#7da55a'],
            ['bob', '#2b2420', 'dress', '#e4872b'], ['messy', '#b0602a', 'tshirt', '#3a6ea5'], ['braids', '#2b2420', 'hoodie', '#f2c21a'], ['afro', '#2b2420', 'tshirt', '#c9c3b4'],
            ['long', '#e0c070', 'dress', '#5a3e8a'], ['short', '#8a5a2e', 'hoodie', '#d6872b'], ['bun', '#2b2420', 'tshirt', '#f29ac0'], ['curly', '#2b2420', 'hoodie', '#2f5d8a']];
export const KIDS = KV.map(([hair, hairColor, top, color], i) => ({ kid: true, hair, hairColor, top, color, legs: '#3a4a6b', face: i % 5 === 3 ? 'glasses' : null, hips: top === 'dress' ? 1.45 : undefined, hairEnd: 1.72 }));
export const SM = { LEON: 0.86, OWEN: 1.12, CHASE: 1.2, PARK: 1.2, MOM: 1.14, DAD: 1.22, MAILMAN: 1.2, TESS: 1.15, NIA: 1.15, JUNE: 1.15, HALE: 1.24, REPORTER: 1.18, CAMERAMAN: 1.2, LUNCHLADY: 1.15, EIGHTH: 1.3, KID: 1.15 };
