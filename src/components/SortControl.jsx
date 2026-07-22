// Dropdown used to select how movies are sorted.

function SortControl({ value, onChange, order, onOrderChange, orderOptions }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-lg
          border
          border-slate-300
          px-4
          py-3
          focus:border-blue-500
          focus:outline-none
          focus:ring-2
          focus:ring-blue-200
          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
        "
      >
        <option value="popularity">Popularity</option>
        <option value="rating">Rating</option>
        <option value="release-date">Release Date</option>
        <option value="title">Title (A-Z)</option>
      </select>

      <select
        value={order}
        onChange={onOrderChange}
        className="
          w-full
          rounded-lg
          border
          border-slate-300
          px-4
          py-3
          focus:border-blue-500
          focus:outline-none
          focus:ring-2
          focus:ring-blue-200
          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
        "
      >
        <option value="desc">{orderOptions.desc}</option>
        <option value="asc">{orderOptions.asc}</option>
      </select>
    </div>
  );
}

export default SortControl;
