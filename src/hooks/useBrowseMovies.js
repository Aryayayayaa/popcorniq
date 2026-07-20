import { useEffect, useState } from "react";

import { getPopularMovies, searchMovies } from "../api/tmdb";

function useBrowseMovies(query, page) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function loadMovies() {
    try {
      setLoading(true);
      setError("");

      let data;

      if (query.trim()) {
        data = await searchMovies(query, page);
      } else {
        data = await getPopularMovies(page);
      }

      setMovies(data.results ?? []);
      setCurrentPage(data.page ?? 1);
      setTotalPages(data.total_pages ?? 1);
    } catch (err) {
      console.error(err);
      if (err instanceof TypeError) {
        setError("Unable to connect to TMDB. Please try again.");
      } else {
        setError(err.message);
      }
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, [query, page]);

  return {
    movies,
    loading,
    error,
    retry: loadMovies,
    currentPage,
    totalPages,
  };
}

export default useBrowseMovies;
