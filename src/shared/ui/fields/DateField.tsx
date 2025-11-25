import { FormLabel, InputBox } from "./primitives";

type Props = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  helpText?: string;
};

export function DateField({
  id,
  name,
  label,
  value,
  onChange,
  required = true,
  helpText,
}: Props) {
  return (
    <InputBox>
      <FormLabel id={id} label={label} helpText={helpText} />
      <div>
        <input
          className="
            w-full px-3 py-1.5 rounded-lg
            bg-white dark:bg-gray-750
            border border-zinc-950/10 dark:border-white/10
            hover:border-zinc-950/20 dark:hover:border-white/20
            shadow-lg/20 hover:shadow-lg/30 focus:shadow-lg/30
            outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-200 ease-out
            dark:scheme-dark
          "
          id={id}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </InputBox>
  );
}
