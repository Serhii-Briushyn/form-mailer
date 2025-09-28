export const toNumber = (value) => {
  if (value === null || value === undefined) return NaN;
  const normalized = String(value).replace(",", ".");
  const num = parseFloat(normalized);
  return Number.isFinite(num) ? num : NaN;
};

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const calcInitialByFixed8 = (sales) => {
  const s = toNumber(sales);
  if (Number.isNaN(s)) return "";
  return (s * 0.92).toFixed(2);
};

export const calcInitialByCustom = (sales, percent) => {
  const s = toNumber(sales);
  const p = toNumber(percent);
  if (Number.isNaN(s) || Number.isNaN(p) || p < 1 || p > 100) return "";
  return (s * ((100 - p) / 100)).toFixed(2);
};
