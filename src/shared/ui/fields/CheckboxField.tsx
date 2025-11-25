import { FaCheck } from "react-icons/fa6";

type Props = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function CheckboxField({ id, name, label, checked, onChange }: Props) {
  return (
    <label
      htmlFor={id}
      className="flex gap-2 w-max items-center cursor-pointer group"
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className="
          inline-flex items-center justify-center size-4 rounded-full
          bg-white dark:bg-gray-750
          border border-zinc-950/30 dark:border-white/30
          group-hover:ring-2 group-hover:ring-blue-500
          peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500
          peer-checked:bg-blue-500
          peer-checked:border-blue-500
          peer-checked:[&_svg]:opacity-100
          [&_svg]:opacity-0
          transition-all duration-150 ease-out
        "
      >
        <FaCheck className="w-3 h-3 text-white dark:text-black" />
      </span>
      <span>{label}</span>
    </label>
  );
}
