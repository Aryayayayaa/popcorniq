import { useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Calendar, Clock3, Home, Star } from "lucide-react";

import useMovieCredits from "../hooks/useMovieCredits";
import useMovieDetails from "../hooks/useMovieDetails";
import { useLibrary } from "../context/LibraryContext";

import { ROUTES } from "../constants/routes";

import { getBackdropUrl, getPosterUrl, getProfileUrl } from "../utils/image";
import { formatReleaseDate, formatRuntime } from "../utils/movie";

function MovieDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const previousLocation = location.state?.from;
  const { credits } = useMovieCredits(id);

  const director = useMemo(() => {
    return credits?.crew.find((member) => member.job === "Director");
  }, [credits]);

  const producers = useMemo(() => {
    return (
      credits?.crew.filter((member) => member.job === "Producer") ?? []
    ).slice(0, 4);
  }, [credits]);

  const cast = useMemo(() => {
    return (credits?.cast ?? []).slice(0, 10);
  }, [credits]);

  const { movie, loading, error, retry } = useMovieDetails(id);
  const { state, addToWatchlist, removeFromWatchlist } = useLibrary();
  const isInWatchlist = state.watchlist.some(
    (savedMovie) => savedMovie.id === movie?.id,
  );

  if (loading) {
    return <h2 className="text-center text-2xl">Loading movie...</h2>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p>{error}</p>

        <button
          onClick={retry}
          className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => {
            if (previousLocation) {
              navigate(
                `${previousLocation.pathname}${previousLocation.search}`,
              );
            } else {
              navigate(ROUTES.HOME);
            }
          }}
          className="
      flex
      items-center
      gap-2
      rounded-lg
      bg-slate-800
      px-5
      py-2
      text-white
  "
        >
          <ArrowLeft size={18} />
          Back
        </button>

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
    "
        >
          <Home size={18} />
          Home
        </Link>
      </div>

      <img
        src={getBackdropUrl(movie.backdrop_path)}
        alt={movie.title}
        className="
        mb-8
        h-80
        w-full
        rounded-xl
        object-cover"
      />

      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full rounded-xl shadow-xl"
        />

        <div>
          <h1 className="text-5xl font-bold">{movie.title}</h1>

          {/* <p className="mt-4 text-lg text-slate-600">⭐ {movie.vote_average}</p>

          <p className="mt-2">📅 {movie.release_date}</p>

          <p className="mt-2">⏱ {movie.runtime} minutes</p> */}

          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Star size={18} />
              <span>{movie.vote_average.toFixed(1)}/10</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatReleaseDate(movie.release_date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              <span>{formatRuntime(movie.runtime)}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="
                  rounded-full
                  bg-slate-200
                  px-3
                  py-1
                  text-sm
                "
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(movie.id);
                } else {
                  addToWatchlist(movie);
                }
              }}
              className={`
    rounded-lg
    px-5
    py-3
    font-medium
    transition-colors
    ${
      isInWatchlist
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }
  `}
            >
              {isInWatchlist ? "Remove from Watchlist" : "+ Add to Watchlist"}
            </button>
          </div>

          <h2 className="mt-8 text-2xl font-semibold">Overview</h2>

          <p className="mt-3 leading-8">{movie.overview}</p>

          <h2 className="mt-10 text-2xl font-bold">Director</h2>
          {director && (
            <div className="mt-4 flex items-center gap-4">
              <img
                src={getProfileUrl(director.profile_path)}
                alt={director.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{director.name}</p>
                <p className="text-slate-500">Director</p>
              </div>
            </div>
          )}

          <h2 className="mt-10 text-2xl font-bold">Producers</h2>
          <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-4">
            {producers.map((producer) => (
              <div key={producer.id} className="text-center">
                <img
                  src={getProfileUrl(producer.profile_path)}
                  alt={producer.name}
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
                <p className="mt-3 font-medium">{producer.name}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">Top Cast</h2>

          <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-5">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={getProfileUrl(actor.profile_path)}
                  alt={actor.name}
                  className="
                        mx-auto
                        h-32
                        w-32
                        rounded-full
                        object-cover
                        "
                />
                <p className="mt-3 font-semibold">{actor.name}</p>
                <p className="text-sm text-slate-500">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
