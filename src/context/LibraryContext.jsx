import { createContext, useContext } from "react";

/**
 * Global context for the user's movie library.
 * This context will eventually store the watchlist,
 * watched movies, personal ratings, and related actions.
 */
const LibraryContext = createContext(null);

/* Provider component that will wrap the application. */
function LibraryProvider({ children }) {
  return (
    <LibraryContext.Provider value={{}}>{children}</LibraryContext.Provider>
  );
}

/* Custom hook for consuming the library context. */
function useLibrary() {
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider.");
  }

  return context;
}

export { LibraryProvider, useLibrary };
