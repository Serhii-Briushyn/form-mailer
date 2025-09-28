export default function Checkbox({ label, checked, onChange, name }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
