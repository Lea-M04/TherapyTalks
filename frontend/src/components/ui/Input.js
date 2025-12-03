export default function Input({
  label,
  type = "text",
  error,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        type={type}
        className={`border p-2 rounded outline-none focus:border-blue-500 ${className}`}
        {...props}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
