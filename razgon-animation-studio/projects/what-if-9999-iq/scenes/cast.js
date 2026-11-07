import { E } from '/engine/core.js';
// cast.js: один наряд на персонажа. Узнаваемая деталь = сигнатура, одинаковая во всех кадрах.
export const LEON = { top: 'tshirt', color: '#d8232a', color2: '#ffffff', legs: '#8a8a8a', head: 'capBack', headColor: '#17c3b2' };  // герой «ты»: бирюзовая кепка задом наперёд, красная футболка (молния дорисовывается в кадрах)
export const TEACHER = { top: 'suit', color: '#6b4e9b', head: 'bun', face: 'glasses' };     // учительница, фиолетовый жакет
export const MOM = { top: 'dress', color: '#f29ac0', head: 'ponytail' };                     // мама, розовое платье
export const NIA = { top: 'tshirt', color: '#f2c21a', head: 'beanie', headColor: '#f29ac0', kid: true }; // сестра Nia, 6 лет, жёлтая куртка, шапка (варежки с пингвинами рисуются реквизитом)
export const GRANDPA = { top: 'suit', color: '#8a6a45', head: 'none', face: 'glasses' };     // дедушка, коричневый жилет и очки
export const FRIEND = { top: 'tshirt', color: '#3a6ea5', head: 'spiky', kid: true };         // лучший друг, синяя футболка
export const KID = { top: 'hoodie', color: '#3fb950', head: 'none', kid: true };             // одноклассник/сосед по парте, зелёная худи
export const LUNCHLADY = { top: 'dress', color: '#f2f2f2', head: 'bun' };                    // раздатчица в столовой
export const NEIGHBOR = { top: 'jersey', color: '#d6872b', head: 'none' };                   // сосед со спасательной верёвкой
export const PSYCH = { top: 'labcoat', face: 'glasses', head: 'none' };                      // психолог 1942
export const CAST = [LEON, TEACHER, MOM, NIA, GRANDPA, FRIEND, KID, LUNCHLADY, NEIGHBOR, PSYCH];

// Наряды под семейство doodle (пак doodle): те же сигнатуры, другие поля. outfit('LEON') отдаёт нужный наряд по активному паку.
const D = {
  LEON: { top: 'tshirt', color: '#d8232a', color2: '#ffffff', emblem: 'bolt', shorts: '#8a8a8a', shoes: '#f28a1e', sneakers: true, whiteHands: true, hair: 'none', hairColor: '#6b3a1e', hat: 'capBack', hatColor: '#17c3b2' },
  TEACHER: { top: 'suit', color: '#6b4e9b', hair: 'bun', face: 'glasses' },
  KIDBG: { top: 'tshirt', color: '#c9c3b4', hair: 'short', kid: true },
  AVG: { top: 'none', hair: 'none' },
  GENIUS: { top: 'labcoat', hair: 'none', face: 'glasses' },
};
const K = { LEON, TEACHER, KIDBG: { top: 'none', kid: true }, AVG: { top: 'none', head: 'none' }, GENIUS: { top: 'labcoat', face: 'glasses', head: 'none' } };
export const outfit = (id) => (E.packId === 'doodle' ? D[id] : K[id]);
export const isDoodle = () => E.packId === 'doodle';
