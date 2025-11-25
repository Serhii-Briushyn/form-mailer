export function toNumber(value: unknown): number {
  if (value === null || value === undefined) return NaN;
  const normalized = String(value).replace(",", ".");
  const num = parseFloat(normalized);
  return Number.isFinite(num) ? num : NaN;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export function calcInitialByFixed8(sales: string | number): string {
  const s = toNumber(sales);
  if (Number.isNaN(s)) return "";
  return (s * 0.92).toFixed(2);
}

export function calcInitialByCustom(
  sales: string | number,
  percent: string | number
): string {
  const s = toNumber(sales);
  const p = toNumber(percent);
  if (Number.isNaN(s) || Number.isNaN(p) || p < 1 || p > 100) return "";
  return (s * ((100 - p) / 100)).toFixed(2);
}

export function normalizePercentStr(input: string): string {
  const n = toNumber(input);
  if (Number.isNaN(n)) return "";
  return clamp(n, 1, 100).toFixed(2);
}
