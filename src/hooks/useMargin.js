import { useMemo, useState } from "react";
import { calcInitialByCustom, calcInitialByFixed8 } from "../utils/numbers";

export const MARGIN_MODES = {
  NONE: "none",
  FIXED8: "fixed8",
  CUSTOM: "custom",
};

export default function useMargin(sales_price) {
  const [mode, setMode] = useState(MARGIN_MODES.NONE);
  const [customPercent, setCustomPercent] = useState("");

  const autoInitialCost = useMemo(() => {
    if (mode === MARGIN_MODES.FIXED8) return calcInitialByFixed8(sales_price);
    if (mode === MARGIN_MODES.CUSTOM)
      return calcInitialByCustom(sales_price, customPercent);
    return "";
  }, [mode, customPercent, sales_price]);

  const toggleFixed8 = (checked) =>
    setMode(checked ? MARGIN_MODES.FIXED8 : MARGIN_MODES.NONE);
  const toggleCustom = (checked) =>
    setMode(checked ? MARGIN_MODES.CUSTOM : MARGIN_MODES.NONE);

  return {
    mode,
    customPercent,
    setCustomPercent,
    autoInitialCost,
    toggleFixed8,
    toggleCustom,
  };
}
