// Реестр сцен: def('S001', {cam, fn, ...}). Общие помощники мест лежат в helpers13.js
export const SC = {};
export const def = (id, meta) => { SC[id] = meta; };
export const defs = (ids, meta) => { for (const id of ids) SC[id] = meta; };
