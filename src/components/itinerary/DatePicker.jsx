export default function DatePicker({ label, value, onChange, name }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
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
