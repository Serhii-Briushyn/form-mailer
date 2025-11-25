import type { Option } from "@shared/types";

export function normalizeOptions(
  options: ReadonlyArray<string | Option> | undefined
): Option[] {
  return (options ?? []).map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
}
