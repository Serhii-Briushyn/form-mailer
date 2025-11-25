import { useRef, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

import { useEscapeToClose, useOutsideClick } from "@shared/hooks";

type Props = {
  helpText: string;
};

export function HelpPopover({ helpText }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useOutsideClick(open, () => setOpen(false), btnRef, popRef);
  useEscapeToClose(open, () => {
    setOpen(false);
    btnRef.current?.focus();
  });

  return (
    <span className="relative hidden lg:inline-flex">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((s) => !s)}
        className="size-5 lg:size-6 cursor-help text-gray-500 outline-none dark:text-gray-400"
      >
        <IoInformationCircleOutline className="size-full" />
      </button>

      <div
        ref={popRef}
        role="dialog"
        aria-modal="false"
        className={`
          absolute left-full top-0 ml-2
          z-50 p-3 rounded-lg font-medium
          max-w-80 w-max origin-left
          bg-white dark:bg-gray-750
          border border-zinc-950/10 dark:border-white/10
          shadow-lg/30
          transition-all duration-150
          ${
            open
              ? "opacity-100 translate-x-0 translate-y-0 scale-100"
              : "pointer-events-none opacity-0 -translate-x-1 -translate-y-1 scale-95"
          }
        `}
      >
        <p className="text-sm">{helpText}</p>
      </div>
    </span>
  );
}
