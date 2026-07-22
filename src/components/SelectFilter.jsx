function SelectFilter({ value, onChange, options, disabled = false }) {
  return (
    <div className="w-full">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          px-4
          py-3
          focus:border-blue-500
          focus:outline-none
          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFilter;
