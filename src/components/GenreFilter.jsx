function GenreFilter({ genres, value, onChange, disabled = false }) {
  return (
    <div className="min-w-52">
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
        <option value="">All Genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
