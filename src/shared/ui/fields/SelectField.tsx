import { useEffect, useMemo, useRef, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa6";
import clsx from "clsx";

import { FormLabel, InputBox } from "./primitives";
import { normalizeOptions } from "@shared/lib";
import { useOutsideClick, useSelectKeyboard } from "@shared/hooks";

import type { Option } from "@shared/types";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: ReadonlyArray<string | Option>;
  placeholder?: string;
  side?: "bottom" | "top";
  helpText?: string;
};

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
  side = "bottom",
  helpText,
}: Props) {
  const normalized = useMemo(() => normalizeOptions(options), [options]);
  const selected = normalized.find((o) => o.value === value) ?? null;

  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const openMenu = () => {
    setOpen(true);
    const idx = Math.max(
      0,
      normalized.findIndex((o) => o.value === value)
    );
    setActiveIdx(idx);
  };
  const closeMenu = () => setOpen(false);

  useOutsideClick(open, closeMenu, wrapRef);

  const onKeyDown = useSelectKeyboard({
    open,
    optionsLen: normalized.length,
    activeIdx,
    setActiveIdx,
    onOpen: openMenu,
    onSelect: (idx: number) => {
      const opt = normalized[idx];
      if (opt) onChange(opt.value);
    },
    onClose: closeMenu,
  });

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`);
    if (!el) return;

    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight;
    }
  }, [activeIdx, open]);

  const listboxId = `${id}-listbox`;

  return (
    <InputBox>
      <FormLabel label={label} helpText={helpText} />
      <div ref={wrapRef} className="relative">
        <button
          className="
          inline-flex items-center justify-between gap-2
          w-full px-3 py-1.5 rounded-lg
          bg-white dark:bg-gray-750
          border border-zinc-950/10 dark:border-white/10
          hover:border-zinc-950/20 dark:hover:border-white/20
          shadow-lg/20 hover:shadow-lg/30
          cursor-pointer outline-none
          transition-all duration-200 ease-out
        "
          id={id}
          type="button"
          onClick={() => (open ? closeMenu() : openMenu())}
          onKeyDown={onKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
        >
          <span
            className={clsx(
              "truncate text-left",
              !selected && "text-gray-500 dark:text-gray-400"
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
          <FaAngleDown
            className={clsx(
              "h-4 w-4 shrink-0 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            className={clsx(
              "absolute z-50 w-full max-h-60 overflow-auto rounded-lg",
              "bg-white dark:bg-gray-750",
              "border border-zinc-950/10 dark:border-white/10",
              "custom-scrollbar",
              side === "bottom" && "top-full mt-1 shadow-lg/30",
              side === "top" && "bottom-full mb-1 shadow-top-lg/30"
            )}
            onKeyDown={onKeyDown}
          >
            {normalized.map((opt, idx) => {
              const isActive = idx === activeIdx;
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  data-idx={idx}
                  role="option"
                  aria-selected={isSelected}
                  className={clsx(
                    "flex items-center justify-between gap-2 select-none cursor-pointer px-3 py-2 transition-colors",
                    isSelected && "bg-indigo-500/50",
                    isActive && !isSelected && "bg-indigo-500/20",
                    !isSelected && "hover:bg-indigo-500/20"
                  )}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(opt.value);
                    closeMenu();
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected && <FaCheck />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </InputBox>
  );
}
