import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <section
      className="
        mt-8
        grid
        gap-4
        sm:grid-cols-2
        sm:gap-5
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        xl:gap-6
      "
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieGrid;
