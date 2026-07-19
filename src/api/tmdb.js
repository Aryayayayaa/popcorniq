/**
 * TMDB API helper functions.
 *
 * All requests to The Movie Database are centralized here.
 * Components and hooks should never call fetch() directly.
 */

import { REQUEST_TIMEOUT } from "../constants/api";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

/**
 * Performs an authenticated request to the TMDB API.
 *
 * @param {string} endpoint - API endpoint including query parameters.
 * @returns {Promise<Object>} Parsed JSON response.
 * @throws {Error} User-friendly error message.
 */
async function fetchFromTMDB(endpoint) {
  const url = `${BASE_URL}${endpoint}`;

  // Abort slow requests instead of waiting indefinitely.
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      // TMDB returned a JSON error response.
      if (contentType?.includes("application/json")) {
        const errorData = await response.json();

        throw new Error(
          errorData.status_message || "TMDB returned an unexpected error.",
        );
      }

      // CloudFront / HTML error page.
      throw new Error(
        `TMDB server error (${response.status}). Please try again in a few moments.`,
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error(
        "The request timed out. Please check your internet connection and try again.",
      );
    }

    if (error instanceof TypeError) {
      throw new Error("Unable to connect to TMDB. Please try again later.");
    }

    throw error;
  }
}

/**
 * Fetches the current list of popular movies.
 *
 * @param {number} page - Results page.
 * @returns {Promise<Object>}
 */
export async function getPopularMovies(page = 1) {
  const params = new URLSearchParams({
    language: "en-US",
    page: String(page),
  });

  return fetchFromTMDB(`/movie/popular?${params}`);
}

/**
 * Searches movies by title.
 *
 * @param {string} query - User's search text.
 * @param {number} page - Results page.
 * @returns {Promise<Object>}
 */
export async function searchMovies(query, page = 1) {
  const params = new URLSearchParams({
    query,
    language: "en-US",
    include_adult: "false",
    page: String(page),
  });

  return fetchFromTMDB(`/search/movie?${params}`);
}

/**
 * Fetches complete details for a movie.
 *
 * @param {number|string} movieId
 * @returns {Promise<Object>}
 */
export async function getMovieDetails(movieId) {
  return fetchFromTMDB(`/movie/${movieId}`);
}

/**
 * Fetches cast and crew information for a movie.
 *
 * @param {number|string} movieId
 * @returns {Promise<Object>}
 */
export async function getMovieCredits(movieId) {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
}

/**
 * Fetches watch providers for a movie.
 *
 * @param {number|string} movieId
 * @returns {Promise<Object>}
 */
export async function getMovieProviders(movieId) {
  return fetchFromTMDB(`/movie/${movieId}/watch/providers`);
}
