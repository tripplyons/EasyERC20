export default function NumberInput({ value = 0, onChange = () => { }, label = null, disabled = false }) {
  return (
    <div className="mt-2">
      {label && (
        <label className="block font-medium text-lg mb-2">
          {label}
        </label>
      )}
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full active:outline-none focus:outline-none focus:border-blue-500"
        value={value}
        onChange={e => onChange(e.target.value)}
        type="number"
        step={1}
        disabled={disabled}
      />
    </div>
  )
}
