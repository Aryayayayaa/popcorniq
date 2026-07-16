import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb";

function usePopularMovies(page = 1) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularMovies(page);

        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [page]);

  return {
    movies,
    loading,
    error,
  };
}

export default usePopularMovies;
