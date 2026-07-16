import { useEffect, useState } from "react";
import { searchMovies } from "../api/tmdb";

function useSearchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query);

        setMovies(data.results);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return {
    movies,
    loading,
    error,
  };
}

export default useSearchMovies;
