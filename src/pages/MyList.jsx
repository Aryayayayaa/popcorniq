import MovieGrid from "../components/MovieGrid";
import { useLibrary } from "../context/LibraryContext";

function MyList() {
  const { state } = useLibrary();
  const { watchlist, watched } = state;

  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
        My Library
      </h1>

      {watchlist.length === 0 && watched.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-slate-600">Your library is empty.</p>

          <p className="mt-2 text-slate-500">
            Start exploring movies and add them to your Watchlist.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          <section>
            <h2 className="mb-6 text-xl font-semibold sm:text-2xl">
              🎬 Watchlist ({watchlist.length})
            </h2>

            {watchlist.length === 0 ? (
              <p className="text-slate-500">
                You haven't added any movies to your watchlist yet.
              </p>
            ) : (
              <MovieGrid movies={watchlist} />
            )}
          </section>

          <section>
            <h2 className="mb-6 text-xl font-semibold sm:text-2xl">
              ✅ Watched ({watched.length})
            </h2>

            {watched.length === 0 ? (
              <p className="text-slate-500">
                You haven't marked any movies as watched yet.
              </p>
            ) : (
              <MovieGrid movies={watched} />
            )}
          </section>
        </div>
      )}
    </section>
  );
}

export default MyList;
