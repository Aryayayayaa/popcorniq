import { useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Calendar, Clock3, Home, Star } from "lucide-react";

import useMovieCredits from "../hooks/useMovieCredits";
import useMovieDetails from "../hooks/useMovieDetails";
import useMovieProviders from "../hooks/useMovieProviders";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";
import { useLibrary } from "../context/LibraryContext";
import RatingStars from "../components/RatingStars";

import { ROUTES } from "../constants/routes";

import {
  getBackdropUrl,
  getPosterUrl,
  getProfileUrl,
  getProviderLogoUrl,
} from "../utils/image";
import { formatReleaseDate, formatRuntime } from "../utils/movie";

function MovieDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  //navigate back to previous page
  const previousLocation = location.state?.from;

  const { credits } = useMovieCredits(id);
  const { providers } = useMovieProviders(id);

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
  const {
    state,
    addToWatchlist,
    removeFromWatchlist,
    addToWatched,
    removeFromWatched,
    setUserRating,
  } = useLibrary();

  const watchedMovie = state.watched.find(
    (savedMovie) => savedMovie.id === movie?.id,
  );
  const isWatched = Boolean(watchedMovie);
  const userRating = watchedMovie?.userRating ?? 0;

  const isInWatchlist = state.watchlist.some(
    (savedMovie) => savedMovie.id === movie?.id,
  );

  function handleWatchlistClick() {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  function handleWatchedClick() {
    if (isWatched) {
      removeFromWatched(movie.id);
    } else {
      addToWatched(movie);

      if (isInWatchlist) {
        removeFromWatchlist(movie.id);
      }
    }
  }

  if (loading) {
    return <MovieDetailsSkeleton />;
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
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
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
          h-48
          w-full
          rounded-xl
          object-cover
          sm:h-64
          lg:h-80
          "
      />

      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="
            mx-auto
            w-full
            max-w-sm
            rounded-xl
            shadow-xl
            "
        />

        <div>
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {movie.title}
          </h1>

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

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={handleWatchlistClick}
              className={`
                rounded-lg
                w-full
                px-5
                py-3
                sm:w-auto
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

            <button
              onClick={handleWatchedClick}
              className={`
                rounded-lg
                w-full
                px-5
                py-3
                sm:w-auto
                font-medium
                transition-colors
                ${
                  isWatched
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }
              `}
            >
              {isWatched ? "Remove from Watched" : "✓ Mark as Watched"}
            </button>
          </div>

          {isWatched && (
            <div className="mt-6">
              <h3 className="mb-2 text-lg font-semibold">Your Rating</h3>

              <RatingStars
                rating={userRating}
                onChange={(rating) => setUserRating(movie.id, rating)}
              />

              <p className="mt-2 text-sm text-gray-500">
                {userRating} / 5 Stars
              </p>
            </div>
          )}

          <h2 className="mt-8 text-2xl font-semibold">Overview</h2>
          <p className="mt-3 leading-7 sm:leading-8">{movie.overview}</p>

          <h2 className="mt-10 text-2xl font-bold">Available in India</h2>

          {[
            { title: "📺 Stream", items: providers.stream },
            { title: "🎟 Rent", items: providers.rent },
            { title: "🛒 Buy", items: providers.buy },
          ].some((section) => section.items.length > 0) ? (
            <div className="mt-5 space-y-8">
              {[
                { title: "📺 Stream", items: providers.stream },
                { title: "🎟 Rent", items: providers.rent },
                { title: "🛒 Buy", items: providers.buy },
              ].map(
                (section) =>
                  section.items.length > 0 && (
                    <div key={section.title}>
                      <h3 className="mb-4 text-lg font-semibold">
                        {section.title}
                      </h3>

                      <div className="flex flex-wrap gap-4">
                        {section.items.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    bg-white
                    p-3
                    shadow-sm
                  "
                          >
                            <img
                              src={getProviderLogoUrl(provider.logo_path)}
                              alt={provider.provider_name}
                              className="h-10 w-10 rounded-lg"
                            />

                            <span className="font-medium">
                              {provider.provider_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <p className="mt-4 text-slate-500">
              No streaming, rental, or purchase providers are currently
              available in India.
            </p>
          )}

          <h2 className="mt-10 text-2xl font-bold">Director</h2>
          {director && (
            <div className="mt-4 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
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
          <div className="mt-5 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {producers.map((producer) => (
              <div key={producer.id} className="text-center">
                <img
                  src={getProfileUrl(producer.profile_path)}
                  alt={producer.name}
                  className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover"
                />
                <p className="mt-3 font-medium">{producer.name}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">Top Cast</h2>

          <div className="mt-5 grid sm:grid-cols-3 lg:grid-cols-5 gap-6 grid-cols-2">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={getProfileUrl(actor.profile_path)}
                  alt={actor.name}
                  className="
                        mx-auto
                        h-24
                        w-24
                        sm:h-28
                        sm:w-28
                        lg:h-32
                        lg:w-32
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
