export default function DatePicker({ label, value, onChange, name }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded-md"
      />
    </div>
  );
}
