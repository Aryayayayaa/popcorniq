function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search movies..."
      className="
        w-full
        rounded-lg
        border
        border-slate-300
        px-4
        py-3
        outline-none
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
      "
    />
  );
}

export default SearchBar;
