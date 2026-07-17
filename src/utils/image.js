import { TMDB_BACKDROP_BASE_URL, TMDB_IMAGE_BASE_URL } from "../constants/api";

/**
 * Builds a full TMDB poster URL.
 */
export function getPosterUrl(path) {
  return path
    ? `${TMDB_IMAGE_BASE_URL}${path}`
    : "https://placehold.co/500x750?text=No+Poster";
}

/**
 * Builds a full TMDB backdrop URL.
 */
export function getBackdropUrl(path) {
  return path
    ? `${TMDB_BACKDROP_BASE_URL}${path}`
    : "https://placehold.co/1280x720?text=No+Backdrop";
}

/**
 * Builds a cast/crew profile image URL.
 */
export function getProfileUrl(path) {
  return path
    ? `${TMDB_IMAGE_BASE_URL}${path}`
    : "https://placehold.co/300x450?text=No+Image";
}
