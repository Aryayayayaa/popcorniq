import MovieGrid from "../components/MovieGrid";

import { useLibrary } from "../context/LibraryContext";

function MyList() {
  const { state } = useLibrary();

  const { watchlist } = state;

  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="mb-8 text-center text-4xl font-bold">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-slate-600">Your watchlist is empty.</p>

          <p className="mt-2 text-slate-500">
            Add movies from the Movie Details page.
          </p>
        </div>
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </section>
  );
}

export default MyList;
