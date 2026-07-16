import { useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useBrowseMovies from "../hooks/useBrowseMovies";

import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SortControl from "../components/SortControl";

function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(searchQuery);

  const isSearching = debouncedQuery.trim() !== "";

  const { movies, loading, error, retry, currentPage, totalPages } =
    useBrowseMovies(debouncedQuery, page);

  /**
   * Sorting is derived from the current movie list.
   * The sorted list is never stored in state.
   */
  const sortedMovies = useMemo(() => {
    const moviesCopy = [...movies];

    switch (sortBy) {
      case "rating":
        return moviesCopy.sort((a, b) => b.vote_average - a.vote_average);

      case "release-date":
        return moviesCopy.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date),
        );

      case "title":
        return moviesCopy.sort((a, b) => a.title.localeCompare(b.title));

      default:
        return moviesCopy.sort((a, b) => b.popularity - a.popularity);
    }
  }, [movies, sortBy]);

  return (
    <>
      <section className="text-center">
        <h1 className="text-4xl font-bold">
          {isSearching ? "Search Results" : "Browse Popular Movies"}
        </h1>

        <p className="mt-2 text-slate-600">
          {isSearching
            ? `Showing results for "${debouncedQuery}"`
            : "Discover what's trending today."}
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <SearchBar
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setPage(1);
          }}
        />

        <SortControl
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        />
      </div>

      {loading && (
        <div className="mt-8 rounded-lg bg-blue-100 p-4 text-center text-blue-700">
          Loading movies...
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-lg bg-red-100 p-4 text-center">
          <p className="text-red-700">{error}</p>

          <button
            onClick={retry}
            className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="mt-8 rounded-lg bg-yellow-100 p-4 text-center">
          No movies found.
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={sortedMovies} />
      )}

      <MovieGrid movies={sortedMovies} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setPage((previousPage) => previousPage - 1)}
        onNext={() => setPage((previousPage) => previousPage + 1)}
      />
    </>
  );
}

export default Browse;
