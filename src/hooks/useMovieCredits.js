import { useCallback, useEffect, useState } from "react";

import { getMovieCredits } from "../api/tmdb";

// Fetches cast and crew for a movie.

function useMovieCredits(movieId) {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCredits = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMovieCredits(movieId);
      setCredits(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;
    loadCredits();
  }, [movieId, loadCredits]);

  return {
    credits,
    loading,
    error,
    retry: loadCredits,
  };
}

export default useMovieCredits;
