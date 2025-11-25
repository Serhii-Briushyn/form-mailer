import { useEffect, useMemo, useRef, useState } from "react";

import {
  calcInitialByCustom,
  calcInitialByFixed8,
  normalizePercentStr,
} from "@shared/lib";

export enum MARGIN_MODES {
  NONE = "none",
  FIXED8 = "fixed8",
  CUSTOM = "custom",
}

export function useMargin(sales_price: string) {
  const [mode, setMode] = useState<MARGIN_MODES>(MARGIN_MODES.NONE);
  const [customPercent, setCustomPercent] = useState<string>("");

  const customInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (mode === MARGIN_MODES.CUSTOM) {
      requestAnimationFrame(() => customInputRef.current?.focus());
    }
  }, [mode]);

  const autoInitialCost = useMemo(() => {
    if (mode === MARGIN_MODES.FIXED8) return calcInitialByFixed8(sales_price);
    if (mode === MARGIN_MODES.CUSTOM)
      return calcInitialByCustom(sales_price, customPercent);
    return "";
  }, [mode, customPercent, sales_price]);

  const toggleFixed8 = (checked: boolean) =>
    setMode(checked ? MARGIN_MODES.FIXED8 : MARGIN_MODES.NONE);

  const toggleCustom = (checked: boolean) =>
    setMode(checked ? MARGIN_MODES.CUSTOM : MARGIN_MODES.NONE);

  const onCustomChange = (v: string) => setCustomPercent(v.replace(",", "."));
  const onCustomBlur = () => {
    if (!customPercent.trim()) return;
    setCustomPercent(normalizePercentStr(customPercent));
  };

  return {
    mode,
    customPercent,
    setCustomPercent,
    autoInitialCost,
    toggleFixed8,
    toggleCustom,
    onCustomChange,
    onCustomBlur,
    customInputRef,
  };
}
