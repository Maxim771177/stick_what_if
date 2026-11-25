// Герои ролика 12 (кодовые куклы Razgon). Один источник для сравнения и для сцен.
export const LEON = { arcBrows: true, top: 'tshirt', color: '#d8232a', color2: '#ffffff', emblem: 'bolt', shorts: '#8a8a8a', shoes: '#f28a1e', sneakers: true, whiteHands: true, hair: 'none', hairColor: '#6b3a1e', hat: 'capBack', hatColor: '#17c3b2' };
export const HAZEL = { hips: 1.4, brows: 'angry', top: 'hoodie', color: '#f2c21a', stripe: '#ffffff', whistle: true, shorts: '#2f5db0', shoes: '#ffffff', hair: 'bigCurly', hairColor: '#d2561e', hairEnd: 1.72, whiteHands: true, s: 1.05 };
export const IVY = { hips: 1.45, brows: 'worried', eyeK: 1.25, top: 'hoodie', color: '#19b3a6', shorts: '#3a4a6b', shoes: '#3a2a1e', hair: 'ponytail', hairColor: '#4a2a1a', hat: 'headband', hatColor: '#d8232a', hatLift: 0.16, hairEnd: 1.72, whiteHands: true, s: 1.0 };
export const POPPY = { hips: 1.5, cheeks: '#f59ab0', top: 'tshirt', color: '#f08cb4', emblem: 'pineapple', shorts: '#8a6ab0', shoes: '#ffffff', hair: 'buns2', hairColor: '#f0cf68', hairEnd: 1.72, whiteHands: true, s: 0.95 };
const TEAM = { hips: 1.45, hairEnd: 1.72, top: 'hoodie', color: '#2f5db0', stripe: '#ffffff', emblem: 'crest', shorts: '#2b3a55', shoes: '#ffffff', whiteHands: true };
// 16 девочек команды: разные причёски и цвета, очки не закрывают глаза
const HV = [['short','#2b2420'],['ponytail','#8a5a2e'],['bob','#c8923a'],['braids','#2b2420'],['afro','#2b2420'],['buns2','#6b3a1e'],['curly','#8a3a1e'],['long','#e0c070'],
            ['bun','#2b2420'],['messy','#b0602a'],['spiky','#2b2420'],['ponytail','#e0c070'],['bob','#4a2a1a'],['long','#6b3a1e'],['curly','#2b2420'],['braids','#b0602a']];
export const GIRLS = HV.map(([hair, hairColor], i) => ({ ...TEAM, hair, hairColor, face: i % 5 === 3 ? 'glasses' : null, s: [0.92, 1.0, 0.96, 1.04, 0.9, 0.98, 1.02, 0.94, 0.97, 1.0, 0.9, 1.03, 0.95, 0.99, 0.92, 1.01][i] }));
export const DUNN = { top: 'jersey', color: '#d8232a', hat: 'capBack', hatColor: '#d8232a', hair: 'none', hairColor: '#2b2420', legs: '#2b2b33', whistle: true, whiteHands: true, s: 1.12 };
export const LEON_NC = { ...LEON, hat: null, hair: 'short', hairColor: '#6b3a1e', hairEnd: 1.72 };
export const wetOf = (o) => ({ ...o, color: '#9b1a20' });
