import { format } from "date-fns";

/**
 * Formats runtime in minutes to "2h 28m".
 */
export function formatRuntime(minutes) {
  if (!minutes) return "N/A";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
}

/**
 * Formats release date.
 */
export function formatReleaseDate(date) {
  if (!date) return "Unknown";

  return format(new Date(date), "dd MMM yyyy");
}
