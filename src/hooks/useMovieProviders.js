import { useCallback, useEffect, useState } from "react";

import { getMovieProviders } from "../api/tmdb";

// Return info on which OTT platform the movie is available
// to watch/buy/rent

function useMovieProviders(movieId) {
  const [providers, setProviders] = useState({
    stream: [],
    ads: [],
    rent: [],
    buy: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProviders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMovieProviders(movieId);
      const indianProviders = data.results?.IN ?? {};

      setProviders({
        stream: indianProviders.flatrate ?? [],
        ads: indianProviders.ads ?? [],
        rent: indianProviders.rent ?? [],
        buy: indianProviders.buy ?? [],
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;
    loadProviders();
  }, [movieId, loadProviders]);

  return {
    providers,
    loading,
    error,
    retry: loadProviders,
  };
}

export default useMovieProviders;
