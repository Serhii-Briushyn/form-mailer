import { useEffect, useMemo, useState } from "react";

import { MARGIN_MODES } from "./useMargin";

export function useInitialCostUI(
  mode: MARGIN_MODES,
  salesPrice: string,
  initialCost: string,
  autoInitialCost?: string | null
) {
  const [freeEdited, setFreeEdited] = useState(false);

  useEffect(() => {
    if (mode !== MARGIN_MODES.NONE) setFreeEdited(false);
  }, [mode]);

  const initialCostValue = useMemo(() => {
    if (mode === MARGIN_MODES.NONE) {
      return freeEdited ? initialCost : salesPrice;
    }
    return autoInitialCost ?? "";
  }, [mode, freeEdited, initialCost, salesPrice, autoInitialCost]);

  const readOnly = mode !== MARGIN_MODES.NONE;

  return { initialCostValue, readOnly, freeEdited, setFreeEdited };
}
