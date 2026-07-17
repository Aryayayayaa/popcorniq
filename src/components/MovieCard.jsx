import { Link, useLocation } from "react-router-dom";
import { getPosterUrl } from "../utils/image";
import { formatReleaseDate } from "../utils/movie";

function MovieCard({ movie }) {
  const location = useLocation();
  const poster = getPosterUrl(movie.poster_path);

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

      <div className="space-y-2 p-4">
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
      </div>
    </article>
  );
}

export default MovieCard;
