import { useCallback, useEffect, useState } from "react";

import { getMovieDetails } from "../api/tmdb";

// Fetches details for a single movie.

function useMovieDetails(movieId) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const movieData = await getMovieDetails(movieId);
      setMovie(movieData);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;
    loadMovie();
  }, [movieId, loadMovie]);

  return {
    movie,
    loading,
    error,
    retry: loadMovie,
  };
}

export default useMovieDetails;
