import { Link, useSearchParams } from "react-router-dom";
import { Home } from "lucide-react";

import { useMemo } from "react";
import useDebounce from "../hooks/useDebounce";
import useBrowseMovies from "../hooks/useBrowseMovies";
import useGenres from "../hooks/useGenres";

import GenreFilter from "../components/GenreFilter";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import ReleaseYearFilter from "../components/ReleaseYearFilter";
import SearchBar from "../components/SearchBar";
import SortControl from "../components/SortControl";

import { DEFAULT_SORT } from "../constants/movie";
import { ROUTES } from "../constants/routes";

function Browse() {
  //searchParams = URL
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const sortBy = searchParams.get("sort") ?? DEFAULT_SORT;
  const sortOrder = searchParams.get("order") ?? "desc";
  const selectedGenre = searchParams.get("genre") ?? "";
  const selectedYear = searchParams.get("year") ?? "";

  const debouncedQuery = useDebounce(searchQuery);
  const { genres } = useGenres();

  const isSearching = debouncedQuery.trim() !== "";

  const { movies, loading, error, retry, currentPage, totalPages } =
    useBrowseMovies(debouncedQuery, page, selectedGenre, selectedYear);

  /**
   * Sorting is derived from the current movie list.
   * The sorted list is never stored in state.
   */
  const sortedMovies = useMemo(() => {
    const moviesCopy = [...movies];

    const compareFunctions = {
      popularity: (a, b) => a.popularity - b.popularity,

      rating: (a, b) => a.vote_average - b.vote_average,

      "release-date": (a, b) =>
        new Date(a.release_date) - new Date(b.release_date),

      title: (a, b) => a.title.localeCompare(b.title),
    };

    const compare = compareFunctions[sortBy] ?? compareFunctions.popularity;

    moviesCopy.sort(compare);

    if (sortOrder === "desc") {
      moviesCopy.reverse();
    }

    return moviesCopy;
  }, [movies, sortBy, sortOrder]);

  function updateSearchParams(updates) {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  }

  const orderOptions = useMemo(() => {
    switch (sortBy) {
      case "title":
        return {
          asc: "A → Z",
          desc: "Z → A",
        };

      case "rating":
        return {
          asc: "Lowest Rated",
          desc: "Highest Rated",
        };

      case "release-date":
        return {
          asc: "Oldest First",
          desc: "Newest First",
        };

      default:
        return {
          asc: "Least Popular",
          desc: "Most Popular",
        };
    }
  }, [sortBy]);

  return (
    <>
      {isSearching && (
        <div className="mb-6 flex justify-center sm:justify-start">
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
        <h1 className="text-3xl font-bold md:text-4xl">
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
            updateSearchParams({
              query: value.trim() ? value : "",
              page: 1,
              sort: sortBy,
              order: sortOrder,
              genre: value.trim() ? "" : selectedGenre,
              year: value.trim() ? "" : selectedYear,
            });
          }}
        />

        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          disabled={isSearching}
          onChange={(event) => {
            updateSearchParams({
              genre: event.target.value,
              page: 1,
            });
          }}
        />

        <ReleaseYearFilter
          value={selectedYear}
          disabled={isSearching}
          onChange={(event) => {
            updateSearchParams({
              year: event.target.value,
              page: 1,
            });
          }}
        />

        <SortControl
          value={sortBy}
          onChange={(event) => {
            updateSearchParams({
              sort: event.target.value,
              order: sortOrder,
            });
          }}
          order={sortOrder}
          onOrderChange={(event) => {
            updateSearchParams({
              sort: sortBy,
              order: event.target.value,
            });
          }}
          orderOptions={orderOptions}
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
      {!loading && !error && sortedMovies.length === 0 && (
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
      {!loading && !error && sortedMovies.length > 0 && (
        <MovieGrid movies={sortedMovies} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => {
          updateSearchParams({
            page: page - 1,
            order: sortOrder,
          });
        }}
        onNext={() => {
          updateSearchParams({
            page: page + 1,
            order: sortOrder,
          });
        }}
      />
    </>
  );
}

export default Browse;
