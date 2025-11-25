import { HelpPopover } from "@shared/ui/help";

type Props = {
  id?: string;
  label: string;
  helpText?: string;
};

export function FormLabel({ id, label, helpText }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="font-bold">
        <span>{label}</span>
      </label>
      {helpText && <HelpPopover helpText={helpText} />}
    </div>
  );
}
