import { Link, useLocation } from "react-router-dom";
import { getPosterUrl } from "../utils/image";
import { formatReleaseDate } from "../utils/movie";
import { useLibrary } from "../context/LibraryContext";

function MovieCard({ movie }) {
  const location = useLocation();
  const poster = getPosterUrl(movie.poster_path);
  const {
    state,
    addToWatchlist,
    removeFromWatchlist,
    addToWatched,
    removeFromWatched,
  } = useLibrary();

  const isInWatchlist = state.watchlist.some(
    (watchlistMovie) => watchlistMovie.id === movie.id,
  );

  const isInWatched = state.watched.some(
    (watchedMovie) => watchedMovie.id === movie.id,
  );

  function handleWatchlistClick(event) {
    event.preventDefault();
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  function handleWatchedClick(event) {
    event.preventDefault();
    if (isInWatched) {
      removeFromWatched(movie.id);
    } else {
      addToWatched(movie);
    }
  }

  return (
    <article
      className="
        overflow-hidden
        rounded-xl
        bg-white
        shadow
        transition
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <Link to={`/movie/${movie.id}`} state={{ from: location }}>
        <img
          src={poster}
          alt={movie.title}
          className="h-80 w-full object-cover"
        />
      </Link>

      <div className="space-y-3 p-4">
        <Link to={`/movie/${movie.id}`} state={{ from: location }}>
          <h2 className="line-clamp-2 text-lg font-semibold hover:text-blue-600">
            {movie.title}
          </h2>
        </Link>

        <p className="text-sm text-slate-600">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>

        <p className="text-sm text-slate-600">
          📅 {formatReleaseDate(movie.release_date)}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleWatchlistClick}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
              isInWatchlist
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            {isInWatchlist ? "Remove" : "+ Watchlist"}
          </button>

          <button
            type="button"
            onClick={handleWatchedClick}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
              isInWatched
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            }`}
          >
            {isInWatched ? "Remove" : "+ Watched"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
