export default function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select",
  required,
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="input"
      required={required}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
