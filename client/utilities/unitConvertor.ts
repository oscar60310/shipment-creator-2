const TAEL_TO_CATTY = 0.0625;

export const cattyAndTaelToCatty = (catty: number, tael: number) => {
  return catty + tael * TAEL_TO_CATTY;
};

export const cattyToCattyAndTael = (total: number) => {
  const catty = Math.floor(total);
  const tael = (total - catty) / TAEL_TO_CATTY;
  return {
    catty,
    tael
  };
};

export const cattyDisplay = (catty: number) => {
  const result = cattyToCattyAndTael(catty);
  return `${result.catty} 斤 ${result.tael} 兩`;
};
