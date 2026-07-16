/**
 * Dropdown used to select how movies are sorted.
 */
function SortControl({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="
        rounded-lg
        border
        border-slate-300
        px-4
        py-3
        focus:border-blue-500
        focus:outline-none
        focus:ring-2
        focus:ring-blue-200
      "
    >
      <option value="popularity">Popularity</option>

      <option value="rating">Rating</option>

      <option value="release-date">Release Date</option>

      <option value="title">Title (A-Z)</option>
    </select>
  );
}

export default SortControl;
