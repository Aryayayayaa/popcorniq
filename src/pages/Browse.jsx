import usePopularMovies from "../hooks/usePopularMovies";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SortControl from "../components/SortControl";

function Browse() {
  const { movies, loading, error } = usePopularMovies();

  if (loading) {
    return <h2 className="mt-20 text-center text-2xl">Loading movies...</h2>;
  }

  if (error) {
    return <h2 className="mt-20 text-center text-red-600">{error}</h2>;
  }

  if (movies.length === 0) {
    return <h2 className="mt-20 text-center">No movies found.</h2>;
  }

  return (
    <>
      <section className="text-center">
        <h1 className="text-4xl font-bold">Browse Popular Movies</h1>

        <p className="mt-2 text-slate-600">Discover what's trending today.</p>
      </section>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <SearchBar />

        <SortControl />
      </div>

      <MovieGrid movies={movies} />

      <Pagination />
    </>
  );
}

export default Browse;
