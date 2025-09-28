export default function Field({ id, label, children }) {
  return (
    <div className="inputBox">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}
