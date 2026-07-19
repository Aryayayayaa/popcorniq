import { useEffect, useState } from "react";

import { getMovieProviders } from "../api/tmdb";

function useMovieProviders(movieId) {
  const [providers, setProviders] = useState({
    stream: [],
    rent: [],
    buy: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProviders() {
    try {
      setLoading(true);
      setError("");
      const data = await getMovieProviders(movieId);
      const indianProviders = data.results?.IN ?? {};
      setProviders({
        stream: indianProviders.flatrate ?? [],
        rent: indianProviders.rent ?? [],
        buy: indianProviders.buy ?? [],
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!movieId) return;

    loadProviders();
  }, [movieId]);

  return {
    providers,
    loading,
    error,
  };
}

export default useMovieProviders;
