import { useEffect } from "react";

import type { RefObject } from "react";

export function useOutsideClick(
  open: boolean,
  onClose: () => void,
  ...refs: Array<RefObject<Element | null>>
) {
  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (refs.some((r) => r.current?.contains(target))) return;
      onClose();
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open, onClose, ...refs]);
}
