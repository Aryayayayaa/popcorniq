import { useEffect } from "react";
import { getPopularMovies } from "../api/tmdb";

function Browse() {
  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopularMovies();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadMovies();
  }, []);

  return (
    <section className="text-center">
      <h1 className="mb-3 text-4xl font-bold">Browse Movies</h1>

      <p className="text-slate-600">Check the browser console.</p>
    </section>
  );
}

export default Browse;
