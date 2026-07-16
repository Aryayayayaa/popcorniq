function SearchBar() {
  return (
    <input
      type="text"
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
      "
    />
  );
}

export default SearchBar;
