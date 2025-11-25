import clsx from "clsx";

import { CheckboxField, FormLabel, InputBox } from "@shared/ui";
import { MARGIN_MODES } from "../model";

type Props = {
  label: string;
  mode: MARGIN_MODES;
  customPercent: string;
  onToggleFixed8: (checked: boolean) => void;
  onToggleCustom: (checked: boolean) => void;
  onCustomChange: (value: string) => void;
  onCustomBlur?: () => void;
  customInputRef?: React.RefObject<HTMLInputElement | null>;
  helpText?: string;
};

export function MarginOptions({
  label,
  mode,
  customPercent,
  onToggleFixed8,
  onToggleCustom,
  onCustomChange,
  onCustomBlur,
  customInputRef,
  helpText,
}: Props) {
  const isFixed8 = mode === MARGIN_MODES.FIXED8;
  const isCustom = mode === MARGIN_MODES.CUSTOM;

  return (
    <InputBox>
      <FormLabel label={label} helpText={helpText} />
      <CheckboxField
        id="fixed8"
        name="fixed8"
        label="Apply 8% margin"
        checked={isFixed8}
        onChange={(e) => onToggleFixed8(e.target.checked)}
      />

      <div className="flex gap-3 items-center">
        <CheckboxField
          id="custom"
          name="custom"
          label="Apply"
          checked={isCustom}
          onChange={(e) => onToggleCustom(e.target.checked)}
        />
        <input
          className={clsx(
            "px-3 py-1.5 rounded-lg",
            "bg-white dark:bg-gray-750",
            "border border-zinc-950/10 dark:border-white/10",
            "shadow-lg/20 outline-none",
            "transition-all duration-200 ease-out",
            isCustom &&
              "hover:shadow-lg/30 focus:shadow-lg/30 focus:ring-2 focus:ring-blue-500 hover:border-zinc-950/20 dark:hover:border-white/20",
            !isCustom && "text-gray-500 dark:text-gray-400"
          )}
          ref={customInputRef}
          type="number"
          inputMode="decimal"
          placeholder="1 - 100"
          min={1}
          max={100}
          step={0.1}
          value={customPercent}
          onChange={(e) => onCustomChange(e.target.value)}
          onBlur={onCustomBlur}
          disabled={!isCustom}
        />
        <span>% margin</span>
      </div>
    </InputBox>
  );
}
