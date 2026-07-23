import { useCallback, useEffect, useState } from "react";

import { discoverMovies, getPopularMovies, searchMovies } from "../api/tmdb";

function useBrowseMovies(
  query,
  page,
  genre = "",
  year = "",
  language = "",
  sortBy,
  sortOrder,
) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let data;

      if (query.trim()) {
        data = await searchMovies(query, page);
      } else if (genre || year || language) {
        data = await discoverMovies({
          page,
          genre,
          year,
          language,
          sortBy,
          sortOrder,
        });
      } else {
        data = await getPopularMovies(page);
      }

      setMovies(data.results ?? []);
      setCurrentPage(data.page ?? 1);
      setTotalPages(data.total_pages ?? 1);
    } catch (err) {
      //console.error(err);
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [query, page, genre, year, language, sortBy, sortOrder]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

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
