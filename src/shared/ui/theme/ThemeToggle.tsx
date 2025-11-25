import { VscColorMode } from "react-icons/vsc";
import clsx from "clsx";

import { useTheme } from "@shared/hooks";

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  const title = isDark ? "Light theme" : "Drak theme";

  return (
    <button
      onClick={toggle}
      className="fixed top-8 right-8 cursor-pointer"
      title={title}
    >
      <VscColorMode
        className={clsx("size-6", isDark ? "text-white" : "dark:text-gray-900")}
      />
    </button>
  );
}
