const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

async function fetchFromTMDB(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB.");
  }

  return response.json();
}

export async function getPopularMovies(page = 1) {
  return fetchFromTMDB(`/movie/popular?page=${page}`);
}
