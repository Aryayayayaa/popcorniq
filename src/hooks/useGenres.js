import { useEffect, useState } from "react";

import { getGenres } from "../api/tmdb";

function useGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadGenres() {
    try {
      setLoading(true);
      setError("");

      const data = await getGenres();
      setGenres(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGenres();
  }, []);

  return {
    genres,
    loading,
    error,
  };
}

export default useGenres;
