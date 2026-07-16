function SortControl() {
  return (
    <select
      className="
        rounded-lg
        border
        border-slate-300
        px-4
        py-3
      "
      defaultValue=""
    >
      <option value="" disabled>
        Sort By
      </option>

      <option>Popularity</option>

      <option>Rating</option>

      <option>Release Date</option>

      <option>Title</option>
    </select>
  );
}

export default SortControl;
