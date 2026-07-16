import { Link } from "react-router-dom";

import { FALLBACK_POSTER, IMAGE_BASE_URL } from "../utils/constants";

import { formatDate } from "../utils/formatDate";

function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : FALLBACK_POSTER;

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
      <Link to={`/movie/${movie.id}`}>
        <img
          src={poster}
          alt={movie.title}
          className="h-80 w-full object-cover"
        />
      </Link>

      <div className="space-y-2 p-4">
        <Link to={`/movie/${movie.id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold hover:text-blue-600">
            {movie.title}
          </h2>
        </Link>

        <p className="text-sm text-slate-600">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>

        <p className="text-sm text-slate-600">
          📅 {formatDate(movie.release_date)}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;
