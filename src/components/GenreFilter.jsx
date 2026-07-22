import SelectFilter from "./SelectFilter";

function GenreFilter({ genres, value, onChange, disabled }) {
  const options = [
    {
      value: "",
      label: "All Genres",
    },
    ...genres.map((genre) => ({
      value: genre.id,
      label: genre.name,
    })),
  ];

  return (
    <SelectFilter
      value={value}
      onChange={onChange}
      disabled={disabled}
      options={options}
    />
  );
}

export default GenreFilter;
