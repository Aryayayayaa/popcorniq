import { useMemo } from "react";

function ReleaseYearFilter({ value, onChange, disabled = false }) {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();

    return Array.from({ length: 30 }, (_, index) => currentYear - index);
  }, []);

  return (
    <div className="min-w-44">
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
        <option value="">All Years</option>

        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ReleaseYearFilter;
