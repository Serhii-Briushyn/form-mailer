import { useCallback } from "react";

import { MARGIN_MODES } from "@features/margin";

export function useFormHandlers<T extends Record<string, any>>(
  mode: MARGIN_MODES,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setFreeEdited: (v: boolean) => void
) {
  const handleFieldChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;

      if (name === "initial_cost" && mode !== MARGIN_MODES.NONE) return;

      if (name === "sales_price" || name === "initial_cost") {
        const normalized = value.replace(",", ".");
        if (normalized === "" || /^[0-9]*[.]?[0-9]*$/.test(normalized)) {
          if (name === "initial_cost") setFreeEdited(true);
          setFormData((prev) => ({ ...prev, [name]: normalized } as T));
        }
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: value } as T));
    },
    [mode, setFormData, setFreeEdited]
  );

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        const { name, checked } = e.currentTarget;
        setFormData((prev) => ({ ...prev, [name]: checked } as T));
      },
      [setFormData]
    );

  return { handleFieldChange, handleCheckboxChange };
}
