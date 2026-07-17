import { Link, useSearchParams } from "react-router-dom";
import { Home } from "lucide-react";

import { useMemo } from "react";
import useDebounce from "../hooks/useDebounce";
import useBrowseMovies from "../hooks/useBrowseMovies";

import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SortControl from "../components/SortControl";
import { DEFAULT_SORT } from "../constants/movie";
import { ROUTES } from "../constants/routes";

function Browse() {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  // const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const sortBy = searchParams.get("sort") ?? DEFAULT_SORT;

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
      {isSearching && (
        <div className="mb-6 flex justify-start">
          <Link
            to={ROUTES.HOME}
            className="
        flex
        items-center
        gap-2
        rounded-lg
        bg-blue-600
        px-5
        py-2
        text-white
        hover:bg-blue-700
      "
            onClick={() => setSearchParams({})}
          >
            <Home size={18} />
            Browse Movies
          </Link>
        </div>
      )}
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
            const value = event.target.value;

            const params = new URLSearchParams(searchParams);

            if (value.trim()) {
              params.set("query", value);
            } else {
              params.delete("query");
            }

            params.set("page", "1");

            params.set("sort", sortBy);

            setSearchParams(params);
          }}
        />

        <SortControl
          value={sortBy}
          onChange={(event) => {
            const params = new URLSearchParams(searchParams);
            params.set("sort", event.target.value);
            setSearchParams(params);
          }}
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
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold">No movies found.</h2>

          <p className="mt-3 text-slate-600">
            Try searching with another movie title.
          </p>

          <Link
            to={ROUTES.HOME}
            onClick={() => setSearchParams({})}
            className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-blue-600
                px-6
                py-3
                text-white
        "
          >
            <Home size={18} />
            Browse Popular Movies
          </Link>
        </div>
      )}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={sortedMovies} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => {
          const params = new URLSearchParams(searchParams);
          params.set("page", String(page - 1));
          setSearchParams(params);
        }}
        onNext={() => {
          const params = new URLSearchParams(searchParams);
          params.set("page", String(page + 1));
          setSearchParams(params);
        }}
      />
    </>
  );
}

export default Browse;
