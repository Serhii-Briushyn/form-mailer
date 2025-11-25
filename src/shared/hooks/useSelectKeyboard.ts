import { useCallback } from "react";

type Params = {
  open: boolean;
  disabled?: boolean;
  optionsLen: number;
  activeIdx: number;
  setActiveIdx: React.Dispatch<React.SetStateAction<number>>;
  onOpen: () => void;
  onSelect: (idx: number) => void;
  onClose: () => void;
};

export function useSelectKeyboard({
  open,
  disabled,
  optionsLen,
  activeIdx,
  setActiveIdx,
  onOpen,
  onSelect,
  onClose,
}: Params) {
  return useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Tab") return;
      if (
        !open &&
        (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
      ) {
        e.preventDefault();
        onOpen();
        return;
      }
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, optionsLen - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIdx(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIdx(optionsLen - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSelect(activeIdx);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [
      open,
      disabled,
      optionsLen,
      activeIdx,
      setActiveIdx,
      onOpen,
      onSelect,
      onClose,
    ]
  );
}
