import clsx from "clsx";

import { FormLabel, InputBox } from "./primitives";

type Props = {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  readOnly?: boolean;
  min?: number;
  step?: number;
  inputMode?: "decimal" | "numeric";
  helpText?: string;
};

export function NumberField({
  id,
  name,
  label,
  value,
  onChange,
  required = true,
  readOnly = false,
  min = 0,
  step = 0.01,
  inputMode = "decimal",
  helpText,
}: Props) {
  return (
    <InputBox>
      <FormLabel id={id} label={label} helpText={helpText} />
      <input
        className={clsx(
          "w-full px-3 py-1.5 rounded-lg",
          "bg-white dark:bg-gray-750",
          "border border-zinc-950/10 dark:border-white/10",
          "shadow-lg/20 outline-none",
          "transition-all duration-200 ease-out",
          !readOnly &&
            "hover:shadow-lg/30 focus:shadow-lg/30 focus:ring-2 focus:ring-blue-500 hover:border-zinc-950/20 dark:hover:border-white/20",
          readOnly && "text-gray-500 dark:text-gray-400 cursor-auto"
        )}
        id={id}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        min={min}
        step={step}
        inputMode={inputMode}
      />
    </InputBox>
  );
}
