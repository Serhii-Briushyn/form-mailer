import Checkbox from "./Checkbox";
import { MARGIN_MODES } from "../hooks/useMargin";

export default function MarginOptions({
  mode,
  customPercent,
  setCustomPercent,
  onToggleFixed8,
  onToggleCustom,
}) {
  return (
    <div className="inputBox">
      <label className="label">Margin options:</label>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Checkbox
          label="Apply 8% margin"
          checked={mode === MARGIN_MODES.FIXED8}
          onChange={(e) => onToggleFixed8(e.target.checked)}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox
            label="Apply"
            checked={mode === MARGIN_MODES.CUSTOM}
            onChange={(e) => onToggleCustom(e.target.checked)}
          />
          <input
            type="number"
            placeholder="1 - 100"
            min="1"
            max="100"
            step="0.01"
            value={customPercent}
            onChange={(e) => setCustomPercent(e.target.value.replace(",", "."))}
            className="input"
            style={{ width: 120 }}
            disabled={mode !== MARGIN_MODES.CUSTOM}
            inputMode="decimal"
            aria-disabled={mode !== MARGIN_MODES.CUSTOM}
            title="Custom margin percent (1–100)"
          />
          <span>% margin</span>
        </div>
      </div>
    </div>
  );
}
